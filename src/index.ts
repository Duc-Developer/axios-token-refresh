import { AxiosInstance } from 'axios';
import { AxiosTFOptions } from './models';

const registerAxiosTokenRefresh = (instance: Omit<AxiosInstance, 'create'> & { create?: AxiosInstance['create'] }, options: AxiosTFOptions) => {
    const { refreshRequest, onRetry, statusCodes = [401], shouldRetry, retryTimes = 1 } = options ?? {};

    if (!refreshRequest || typeof refreshRequest !== 'function') {
        throw new Error('axios-token-refresh requires `refreshRequest` to be a function that returns a promise.');
    }

    const retryQueue: Promise<any>[] = [];

    return instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { config: originalRequest, response } = error;

            const shouldRetryRequest = shouldRetry ? shouldRetry(error) : statusCodes.includes(response?.status);
            if (shouldRetryRequest && !(originalRequest as any)?.__isRetryRequest) {
                (originalRequest as any).__isRetryRequest = true;

                let retryCount = 0;

                const retryLogic = async (): Promise<any> => {
                    if (retryCount >= retryTimes) {
                        throw new Error(error);
                    }
                    retryCount++;

                    try {
                        const newConfig = (await onRetry?.(originalRequest)) ?? originalRequest;
                        const newResponse = await refreshRequest(newConfig);
                        return newResponse;
                    } catch (refreshError) {
                        if (retryCount < retryTimes) {
                            return retryLogic();
                        }
                        throw refreshError;
                    }
                };

                const retryPromise = retryLogic();
                retryQueue.push(retryPromise);

                try {
                    const result = await retryPromise;
                    return result;
                } finally {
                    retryQueue.splice(retryQueue.indexOf(retryPromise), 1); // Remove from queue
                }
            }
            return Promise.reject(error);
        },
    );
};

export default registerAxiosTokenRefresh;
