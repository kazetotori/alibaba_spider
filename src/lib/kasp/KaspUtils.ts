import { RequestOptions } from "./entity/RequestOptions";
import * as http from 'http';
import { RequestResult } from "./entity/RequestResult";

/**
 * kasp的工具类
 */
export class KaspUtils {

    /**
     * 发送http请求
     * @param requestOptions 请求参数
     */
    public static async request(requestOptions: RequestOptions): Promise<RequestResult> {
        return new Promise<RequestResult>((resolve, reject) => {

            // 定义一个返回的result对象
            let requestResult = new RequestResult();
            let data: Buffer[] = [];


            // 定义回调函数
            let req: http.ClientRequest = http.request(requestOptions, (res) => {
                requestResult.response = res;
                res.on('data', (chunk) => data.push(chunk as any));
                res.on('end', () => {
                    requestResult.responseBody = data;
                    resolve(requestResult)
                });
                res.on('error', (err) => {
                    requestResult.error = err;
                    reject(requestResult)
                });
            })
            
            requestResult.request = req;
            req.on('error', (err) => {
                requestResult.error = err;
                reject(requestResult)
            });

            // 写入requestBody，如果存在
            if (requestOptions.requestBody) {
                if (requestOptions.requestBody.pipe) {
                    req.pipe(requestOptions.requestBody);
                } else {
                    req.write(requestOptions.requestBody);
                }
            }

            // 发送请求
            req.end()
        });
    }
}