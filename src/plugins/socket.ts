type WebSocketCallback<T extends keyof WebSocket> = NonNullable<WebSocket[T]>;
type WebSocketParameters<T extends keyof WebSocket> = WebSocketCallback<T> extends (...reset: any) => any ? Parameters<WebSocketCallback<T>> : never;
export const enum ReadyState {
    Initial, // 连接尚未建立
    Connecting, // 连接中
    Done, // 连接已建立，可以进行通信
    Fail, // 通信发生错误，连接正在进行关闭
    Closed, // 连接已经关闭或者连接不能打开
}

export default class<T extends ArrayInnerType<WebSocketParameters<'send'>> = string/* 发送消息的类型 */, U = any/* 收到消息的类型 */> extends WebSocket {
    state: ReadyState = ReadyState.Initial; // 初始化状态
    manuallyClose = false; // 是否是手动关闭
    protected openCallbacks: WebSocketCallback<'onopen'>[]  = [];
    protected errorCallbacks: WebSocketCallback<'onerror'>[]  = [];
    protected closeCallbacks: WebSocketCallback<'onclose'>[]  = [];
    // protected messageCallbacks: WebSocketCallback<'onmessage'>[] = [];
    protected messageCallbacks: ((event: MessageEvent<U>) => any)[] = [];

    constructor(...reset: ConstructorParameters<typeof WebSocket>) {
        super(...reset); // 建立 socket 链接

        this.init(); // 初始化回调函数、状态改变等绑定
    }

    copyWithInstance(instance: typeof this) { // 拷贝当前实例的参数到新的实例（重连时保留当前实例参数时使用）
        instance.openCallbacks = this.openCallbacks;
        instance.errorCallbacks = this.errorCallbacks;
        instance.closeCallbacks = this.closeCallbacks;
        instance.messageCallbacks = this.messageCallbacks;

        instance.manuallyClose = this.manuallyClose;
        instance.state = this.state;

        return instance;
    }

    private get openCallback() { // Web Socket 已连接上需要执行的回调函数
        return (...reset: WebSocketParameters<'onopen'>) => {
            this.state = ReadyState.Done;
            this.openCallbacks.forEach((callback) => callback.apply(this, reset));
        }
 
    }

    private get errorCallback() { // Web Socket 通信发生错误需要执行的回调函数
        return (...reset: WebSocketParameters<'onerror'>) => {
            this.state = ReadyState.Fail;
            this.errorCallbacks.forEach((callback) => callback.apply(this, reset));
        }
        
    }

    private get closeCallback() { // Web Socket 已关闭需要执行的回调函数
        return (...reset: WebSocketParameters<'onclose'>) => { // TODO: 重新连接
            this.state = ReadyState.Closed;

            this.closeCallbacks.forEach((callback) => callback.apply(this, reset));
        }

    }

    private get messageCallback() { // Web Socket 收到消息需要执行的回调函数
        return (...reset: WebSocketParameters<'onmessage'>) => {
            this.state = ReadyState.Done;
            this.messageCallbacks.forEach((callback) => callback.apply(this, reset));
        }
        
    }

    registerOpenCallback(callback: ArrayInnerType<typeof this.openCallbacks>) { // 注册 onopen 回调函数
        this.openCallbacks.push(callback);
        return this;
    }

    registerErrorCallback(callback: ArrayInnerType<typeof this.openCallbacks>) { // 注册 onerror 回调函数
        this.errorCallbacks.push(callback);
        return this;
    }

    registerCloseCallback(callback: ArrayInnerType<typeof this.closeCallbacks>) { // 注册 onclose 回调函数
        this.closeCallbacks.push(callback);
        return this;
    }

    registerMessageCallback(callback: ArrayInnerType<typeof this.messageCallbacks>) { // 注册 onmessage 回调函数
        this.messageCallbacks.push(callback);
        return this;
    }

    removeOpenCallback(callback: ArrayInnerType<typeof this.openCallbacks>) { // 移除 onopen 回调函数
        this.openCallbacks = this.openCallbacks.filter(({ name }) => name !== callback.name);
        return this;
    }

    removeErrorCallback(callback: ArrayInnerType<typeof this.openCallbacks>) { // 移除 onerror 回调函数
        this.errorCallbacks = this.errorCallbacks.filter(({ name }) => name !== callback.name);
        return this;
    }

    removeCloseCallback(callback: ArrayInnerType<typeof this.closeCallbacks>) { // 移除 onclose 回调函数
        this.closeCallbacks = this.closeCallbacks.filter(({ name }) => name !== callback.name);
        return this;
    }

    removeMessageCallback(callback: ArrayInnerType<typeof this.messageCallbacks>) { // 移除 onmessage 回调函数
        this.messageCallbacks = this.messageCallbacks.filter(({ name }) => name !== callback.name);
        return this;
    }

    clearOpenCallback() { // 清空 onopen 回调函数
        this.openCallbacks.length = 0;
        return this;
    }

    clearErrorCallback() { // 清空 onerror 回调函数
        this.errorCallbacks.length = 0;
        return this;
    }

    clearCloseCallback() { // 清空 onclose 回调函数
        this.closeCallbacks.length = 0;
        return this;
    }

    clearMessageCallback() { // 清空 onmessage 回调函数
        this.messageCallbacks.length = 0;
        return this;
    }

    init() { // 初始化连接状态、回调函数注册
        this.state = ReadyState.Connecting; // Web Socket 正在链接时的状态

        this.addEventListener('open', this.openCallback); // Web Socket 已连接上
        this.addEventListener('error', this.errorCallback); // Web Socket 通信发生错误
        this.addEventListener('close', this.closeCallback); // Web Socket 已关闭
        this.addEventListener('message', this.messageCallback); // Web Socket 收到消息
    }

    close() { // 关闭 socket
        this.manuallyClose = true; // 手动关闭标识
        // 清理回调函数
        this.clearOpenCallback();
        this.clearErrorCallback();
        this.clearCloseCallback();
        this.clearMessageCallback();
        this.close(); // 关闭socket
    }

    sendMessage(message: T) { // 发送消息
        this.send(message);
        return this;
    }

}