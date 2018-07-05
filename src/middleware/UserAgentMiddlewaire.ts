import { USER_AGENTS } from '../config/settings';
import { RequestOptions } from 'https';
import { OutgoingHttpHeaders } from 'http';



/**
 * 设置随机请求头中间件
 */
export function UserAgentMiddleware(request: RequestOptions): RequestOptions {
    request.headers = request.headers || {} as OutgoingHttpHeaders;
    request.headers['user-agent'] = randUserAgents();
    return request;
}


/**
 * 获取随机请求头
 * @return 请求头文本
 */
function randUserAgents(): string {
    let len = USER_AGENTS.length;
    let idx = Math.floor(Math.random() * len)
    return USER_AGENTS[idx]
}