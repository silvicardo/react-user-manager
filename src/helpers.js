import axios from "axios";
import * as rax from "retry-axios";

export function getRetryableAxiosInstance(shouldRetryCallback) {
    const axiosInstance = axios.create();
    axiosInstance.defaults.raxConfig = {
        // Override the decision making process on if you should retry
        shouldRetry: (err) => {
            const cfg = rax.getConfig(err);
            return shouldRetryCallback(cfg.currentRetryAttempt, err);
        },
        retryDelay: 1000,
        instance: axiosInstance,
        backoffType: 'static',
    };

    let interceptorId = rax.attach(axiosInstance);

    return axiosInstance;
}