import { AxiosError, AxiosRequestConfig } from 'axios';

export interface AxiosTFOptions {
    /** The function that will be called to refresh the token. It should return a promise */
    refreshRequest: (error: any) => Promise<any>;
    /** List status code which u want to handle refresh. Default is [401] */
    statusCodes?: number[];
    /** Determine whether to refresh. `statusCodesToRetry` will be ignored when u use this config  */
    shouldRetry?: (error: AxiosError) => boolean;
    /** The number of times to retry the request. Default is 1 */
    retryTimes?: number;
    /** The callback function called before each `refreshRequest` */
    onRetry?: (requestConfig: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
}