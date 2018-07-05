import { readdirSync } from 'fs';
import * as path from 'path';

/**
 * 装饰器，启用一个kasp实例，并扫描对应的spider实例
 * @param spiderLocations 要扫描的包
 */
export function KaspApplication(spiderLocations: string | string[]) {

    if (!spiderLocations) {
        return;
    }

    // 处理spiderLocations，如果是字符串就转换为数组
    if (spiderLocations['charAt']) {
        spiderLocations = [spiderLocations] as string[]
    }

    return function (target) {
        for (let location of spiderLocations) {
            // 读取包下所有脚本
            let scripts = readdirSync(location);
            for (let script of scripts) {
                let scriptPath = path.join(location, '/', scripts[0])
                require(scriptPath)
            }
        }

        return target;
    }

}