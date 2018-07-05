import { ClientRequest, ClientResponse } from 'http';
/**
 * 请求结果
 */
export class RequestResult {

    // 请求过程中发生的错误
    error: Error

    // request
    request: ClientRequest

    // response
    response: ClientResponse

    // responseBody
    responseBody: Buffer[]
}