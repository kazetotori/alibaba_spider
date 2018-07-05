import { KaspApplication } from "./lib/kasp/decoration/KaspApplicatoin";
import * as path from 'path';
import { KaspUtils } from "./lib/kasp/KaspUtils";
import { RequestOptions } from './lib/kasp/entity/RequestOptions'
import { Kasp } from "./lib/kasp/Kasp";

// 主程序，将启动爬虫


@KaspApplication(path.join(__dirname, '/spider'))
export class Main {

    /**
     * main函数，程序入口
     */
    public static async main(argv: string[]): Promise<void> {
        Kasp.runSpider('alibaba');
    }
}