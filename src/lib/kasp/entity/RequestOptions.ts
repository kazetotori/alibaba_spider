import * as https from 'https';


export type RequestOptions = https.RequestOptions & {
    requestBody: any
}