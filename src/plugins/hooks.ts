import { useCallback, useEffect, useMemo, useState } from 'react';

import SocketClient, { ReadyState } from './socket';

type CallBack<T = any> = (...reset: any[]) => T;

 /// 延迟执行，具备防抖功能
export function useDelayFx<T> (callback: CallBack<T>, duration: number = 0) {
    let timer: ReturnType<typeof setTimeout>;

    const promiseFx = (...reset: Parameters<typeof callback>) => new Promise<ReturnType<typeof callback>>((resolve, reject) => {
        cancel(); // 在尚未完成上次执行情况下再次调用，将会放弃上次请求
        timer = setTimeout(() => {
            try {
                resolve(callback(...reset));   
            } catch (error) {
                reject(error);
            }

            clearTimeout(timer);
        }, duration);
    });

    const cancel = () => {
        if (typeof timer !== 'undefined') clearTimeout(timer);
    }

    useEffect(() => { // 组件销毁时，清理timer
        return cancel;
    }, []);

    return [
        promiseFx,
        cancel,
    ] as [CallBack<Promise<T>>, () => void];
}

 /// 获取 ReturnType<promise<any>> 的状态，返回的函数具备截流功能
export function usePromiseFx<T> (_callback: CallBack<Promise<T>>, duration: Parameters<typeof useDelayFx>[1] = 0) {
    const enum Status {
        Initial, // 初始化
        Pending, // 请求中
        Done, // 请求完成（成功）
        Fail, // 失败
    };

    const [status, setStatus] = useState<Status>(Status.Initial);
    const [callback] = duration !== 0 ? useDelayFx(_callback) : [_callback]; // 添加防抖功能
    
    const pending = useMemo(() => status === Status.Pending, [status]);
    const done = useMemo(() => status === Status.Done, [status]);
    const fail = useMemo(() => status === Status.Fail, [status]);

    return Object.assign((...reset: Parameters<typeof _callback>) => {
        if (status === Status.Pending) return Promise.reject(new Error('上次请求尚未完成，拒绝再次执行')); // 请求中不允许再次请求

        return callback(...reset)
            .then((result) => {
                setStatus(Status.Done);
                return Promise.resolve(result);
            })
            .catch(() => {
                setStatus(Status.Fail);
                return Promise.reject(error);
            });
    }, { // 附加状态
        pending,
        done,
        fail,
    });
}

 /// 创建 socket 链接，并支持断线重连
export function useSocket<T extends Parameter<NonNullable<WebSocket['send']>>/* 发送消息类型 */, U/* 接收消息类型 */>(url: ConstructorParameters<typeof SocketClient>[0], protocols?: ConstructorParameters<typeof SocketClient>[1], options?: {
    isAutoConnect: boolean, // 是否自动重连
}) {
    const [socket, setSocket] = useState<SocketClient<T, U>>(); // socket 实例
    const [readyState, setReadyState] = useState(ReadyState.Initial); // socket 连接状态
    const [message, setMessage] = useState<Parameter<Parameter<SocketClient['registerMessageCallback']>>>(Object.create(null)); // socket 消息

    const handleConnect = () => { // 创建 socket
        if (typeof socket !== 'undefined' && [ReadyState.Connecting, ReadyState.Done].includes(socket.readyState)) return; // 正在连接（socket实例已经创建的情况下），并且连接已经成功的状态下不允许再次连接

        setSocket(() => {
            const instance = new SocketClient<T, U>(url, protocols); // 创建 socket 实例
            if (typeof socket !== 'undefined') return socket.copyWithInstance(instance); // 重连

            return instance // 首次连接，需要注册回调事件
                        .registerOpenCallback(() => {
                            setReadyState(instance.readyState);
                        })
                        .registerErrorCallback(() => {
                            setReadyState(instance.readyState);
                        })
                        .registerCloseCallback(() => {
                            setReadyState(instance.readyState);
                        })
                        .registerMessageCallback((event) => {
                            setReadyState(instance.readyState);
                            setMessage(event);
                        });
        });

        
    }

    useEffect(() => { // 自动重连
        if (!options?.isAutoConnect) return; // 未配置自动重连
        if (socket?.manuallyClose) return; // 手动关闭的状态下不在执行重连

        handleConnect();
    }, [readyState, options, socket]);

    return [
        message,
        {
            ...socket,
            readyState,
            connecting: readyState === ReadyState.Connecting,
        }
    ] as [typeof message, Prettify<typeof socket & Record<'connecting', boolean>>];
}

 /// 布尔
export function useBoolean () {
    const [state, setState] = useState(false);
    const toggleState = useCallback(() => setState(!state), [state]);

    return [
        state,
        toggleState,
    ]
}
