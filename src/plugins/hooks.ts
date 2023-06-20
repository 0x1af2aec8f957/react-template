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

        setStatus(Status.Pending);
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

/// 跟usePromiseFx具备一样的功能，但是会自动请求给定的 Promise 方法并返回结果
export function usePromiseValueFx<T> (_callback: Callback<Promise<T>>, dependencies: any[] = []) {
    const [value, setValue] = useState<T>();
    const fetchFx = usePromiseFx((...reset: Parameters<typeof _callback>) => _callback(...reset).then(setValue));

    useEffect(() => {
        if (typeof fetchFx !== 'function' || fetchFx?.length !== 0) return; // Promise 函数定义入参时，不自动执行
        fetchFx(); // Promise 函数没有定义入参时，自动执行
    }, dependencies);

    return [
        value,
        fetchFx,
    ] as const;
}

/// 创建 socket 链接，并支持断线重连
export function useSocket<T extends Parameter<NonNullable<WebSocket['send']>>/* 发送消息类型 */, U = string/* 接收消息类型 */>(url: ConstructorParameters<typeof SocketClient>[0], protocols?: ConstructorParameters<typeof SocketClient>[1], options?: {
    // isAutoConnect: boolean, // 是否自动重连
}) {
    const [socket] = useState(new SocketClient<T, U>(url, protocols)); // socket 实例
    const [readyState, setReadyState] = useState(ReadyState.Initial); // socket 连接状态
    const [message, setMessage] = useState<MessageEvent>(Object.create(null)); // socket 消息

    const handleRegisterCallback = () => { // 注册 socket 回调事件

        socket // 首次连接，需要注册回调事件
                .registerOpenCallback(() => {
                    setReadyState(socket.state);
                })
                .registerErrorCallback(() => {
                    setReadyState(socket.state);
                })
                .registerCloseCallback(() => {
                    setReadyState(socket.state);
                })
                .registerMessageCallback((event) => {
                    setReadyState(socket.state);
                    setMessage(event as MessageEvent);
                });
    }

    useEffect(() => { // 注册回调
        handleRegisterCallback();

        return socket.close;
    }, []);

    return [
        message,
        {
            ...socket,
            readyState,
            connecting: readyState === ReadyState.Connecting,
        }
    ] as const;
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

/// DOM元素全屏
export function useFullScreen (element: HTMLElement | (() => HTMLElement)) {
    const [isFullScreen, toggleIsFullScreen] = useBoolean();

    const requestFullscreenFx = () => toggleIsFullScreen(true); // 开启全屏
    const exitFullscreenFx = () => toggleIsFullScreen(false); // 退出全屏

    useEffect(() => {
        const _element = typeof element === 'function' ? element() : element;

        if (!_element || !document.fullscreenEnabled) return; // element 不存在或者 不支持全屏的情况不执行
        if (!isFullScreen) { // 退出全屏
            if (document.fullscreenElement) document.exitFullscreen();
            return;
        }

        // 全屏
        if (!document.fullscreenElement) _element.requestFullscreen();

        return () => {
            if (document.fullscreenElement) document.exitFullscreen();
        }
    }, [isFullScreen]);
    
    return [
        Object.assign(requestFullscreenFx, {
            isFullScreen
        }),
        exitFullscreenFx
    ] as const;
}

/// 网络变化
export function useNetWorkOnline() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    // @ts-ignore
    const [networkInformation, setNetworkInformation] = useState(navigator.connection);

    const handleOpenNetwork = () => setIsOnline(true);
    const handleCloseNetwork = () => setIsOnline(false);

    // @ts-ignore
    const handleSetNetworkInformation = () => setNetworkInformation(navigator.connection);
    useEffect(() => {
        window.addEventListener('online', handleOpenNetwork);
        window.addEventListener('offline', handleCloseNetwork);
        // @ts-ignore
        navigator.connection?.addEventListener('change', handleSetNetworkInformation);

        return () => {
            window.removeEventListener('online', handleOpenNetwork);
            window.removeEventListener('offline', handleCloseNetwork);
            // @ts-ignore
            navigator.connection?.removeEventListener('change', handleSetNetworkInformation);
        }
    }, []);

    return [
        isOnline,
        networkInformation
    ] as const;
}
