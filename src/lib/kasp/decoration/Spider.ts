import { KaspSpider } from "../KaspSpider";
import { Kasp } from "../Kasp";
import { KaspUtils } from "../KaspUtils";


/**
 * 装饰器，用于装饰spider，将会注册一个spider单例对象，并初始化参数
 */
export function Spider(name?) {

    return function (target) {

        // 创建spider对象
        let spider = new target() as KaspSpider

        // 设置名称
        name = name || spider.constructor.name;

        // todo: 初始化
        if (!spider.urls) {
            spider.urls = [];
        }

        spider.beforeRequestMiddlewares = spider.beforeRequestMiddlewares || [];
        spider.request = spider.request || KaspUtils.request;

        // 注册到Kasp
        Kasp.setSpider(name, spider);

        return target;
    }
}


