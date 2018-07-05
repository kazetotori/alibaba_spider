import { RequestOptions } from "https";
import { DEFAULT_HEADERS } from '../config/settings';


/**
 * 设置默认的请求头的中间件
 * @param request 请求对象
 */
export function DefaultHeadersMiddlewares(request: RequestOptions): RequestOptions {
    request.headers = JSON.parse(JSON.stringify(DEFAULT_HEADERS));
    return request;
}