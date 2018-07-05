import { KaspSpider } from "./KaspSpider";
import { RequestOptions } from './entity/RequestOptions';
import { RequestResult } from './entity/RequestResult';

/**
 * 核心对象，提供注册、获取、执行spider的方法
 */
export class Kasp {


    /**
     * 存储spider的map集合
     */
    private static readonly spiders: Map<string, KaspSpider> = new Map();


    /**
     * 获取spider的方法
     * @param name spider的名称
     * @return spider
     */
    public static getSpider(name: string): KaspSpider {
        return Kasp.spiders.get(name);
    }


    /**
     * 设置一个spider
     * @param name spider的名称
     * @param spider spider
     */
    public static setSpider(name: string, spider: KaspSpider) {
        Kasp.spiders.set(name, spider);
    }


    /**
     * 运行爬虫
     * @param name spider的名称
     */
    public static async runSpider(spider: string | KaspSpider) {
        // 获取spider实例
        spider = spider['charAt'] ? Kasp.getSpider(spider as string) : spider;
        spider = spider as KaspSpider;

        // 获取url集合
        let urls = spider.urls;

        // 向url发送请求
        for (let url of urls) {
            let requestOptions: RequestOptions = {} as RequestOptions;
            requestOptions.hostname = url;

            // 经过中间件处理请求参数
            let beforeRequestMiddlewares = spider.beforeRequestMiddlewares;
            for (let mw of beforeRequestMiddlewares) {
                // 处理请求参数
                requestOptions = mw(requestOptions);
            }

            // 处理结束，调用request方法进行请求
            try {
                let requestResult: RequestResult = await spider.request(requestOptions);
                // 正常请求，调用parse处理响应到的数据，首先判断是否有对应的响应码处理器
                let handler = null;
                if (requestResult != null
                    && requestResult.response != null
                    && requestResult.response.statusCode != null
                    && (handler = spider.statusHandlers.get(requestResult.response.statusCode.toString()) != null)) {
                } else {
                    handler = spider.parse;
                }

                // 处理原来的数据,获取到数据模型
                let model = handler(requestResult);

                // 处理数据模型
                spider.processModel(model);

            } catch (requestResult) {
                let handler = null;
                // 如果请求异常，则首先尝试调用对应的响应码处理器
                if (requestResult != null
                    && requestResult.response != null
                    && requestResult.response.statusCode != null
                    && (handler = spider.statusHandlers.get(requestResult.response.statusCode.toString()) != null)) {
                    handler(requestResult);
                } else {
                    spider.errorHandler(requestResult);
                }
            }

        }
    }
}



