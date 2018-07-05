
// 提供spider接口
export interface KaspSpider {

    /**
     * 获取访问的url集合
     */
    urls: string[]

    /**
     * 发送请求前钩子函数集合
     */
    beforeRequestMiddlewares: Function[]

    /**
     * 请求发送的方法，默认使用http.request，这里提供一个sender替换，可以自定义使用selenim
     */
    request: Function

    /**
     * 处理响应数据，转换成需要的数据的方法
     */
    parse: Function

    /**
     * 处理模型，即经过parse拿到model后的处理器
     */
    processModel: Function

    /**
     * 不同状态码的处理函数map集合
     */
    statusHandlers: Map<string, Function>

    /**
     * 错误处理器，优先使用statusHandler中定义的处理器
     */
    errorHandler: Function
}