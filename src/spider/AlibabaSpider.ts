import { Spider } from "../lib/kasp/decoration/Spider";
import { KaspSpider } from "../lib/kasp/KaspSpider";
import { RequestOptions } from "../lib/kasp/entity/RequestOptions";
import { RequestResult } from "../lib/kasp/entity/RequestResult";


@Spider('alibaba')
export class AlibabaSpider implements KaspSpider {
    constructor() {

    }

    beforeRequestMiddlewares: Function[] = [];
    request: Function;
    statusHandlers: Map<string, Function>;

    get urls(): string[] {
        return ['www.qq.com']
    }

    parse(requestResult: RequestResult) {
        let result = (requestResult.responseBody as any).toString('utf8');
        return result;
    }

    processModel(title: string) {
        console.log('标题为: ' + title)
    }

    errorHandler(requestResult: RequestResult) {
        console.log(requestResult.error)
    }
}