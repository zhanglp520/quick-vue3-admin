import { ElMessage, ElMessageBox } from "element-plus";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/modules/auth";
import { loginApi, refreshTokenApi } from "@/api/auth/";
/*
 *@Description: 请求库
 *@Author: 土豆哥
 *@Date: 2022-12-02 01:28:26
 */
export interface IQuickResponseData<T = any> {
    status: number;
    msg: string;
    data: T;
    total: number;
}
let errFlag = false;
let isRefreshing = false;
const requestList: Array<any> = [];
const baseURL = import.meta.env.VITE_APP_BASE_URL;
const quickRequest: AxiosInstance = axios.create({
    baseURL,
    timeout: 1000 * 30,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});

const isTokenExpire = () => {
    const authStore = useAuthStore();
    const expiresTime = authStore.getExpiresIn;
    const currentTime = new Date().getTime() / 1000;
    const num = Number(expiresTime) - Number(currentTime);
    // token 10分钟内即将过期，小于0时已过期
    if (num < 10 * 60) {
        return true;
    }
    return false;
};
const saveRequest = (callback: any) => {
    requestList.push(callback);
};
const handleRequest = (token: string) => {
    requestList.forEach((callback) => {
        callback(token);
    });
    requestList.length = 0;
};

// 请求拦截器
quickRequest.interceptors.request.use(
    (config: any) => {
        // 登录请求
        if (config.url === loginApi) {
            return config;
        }
        // token过期

        if (isTokenExpire() && config.url !== refreshTokenApi) {
            if (!isRefreshing) {
                isRefreshing = true;
                const authStore = useAuthStore();
                const quickRefreshToken = authStore.getRefreshToken;
                authStore
                    .refreshToken({ quickRefreshToken })
                    .then(() => {
                        const token = authStore.getAccessToken;
                        if (token) {
                            handleRequest(token);
                        }
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            }
            const retry = new Promise((resolve) => {
                saveRequest((token: string) => {
                    const cfg = config;
                    if (cfg.headers) {
                        cfg.headers.authorization = `Bearer ${token}`;
                    }
                    resolve(cfg);
                });
            });
            return retry;
        }
        const cfg = config;
        const loginStore = useAuthStore();
        const token = loginStore.getAccessToken;
        if (cfg.headers) {
            cfg.headers.authorization = `Bearer ${token}`;
        }
        console.info("request", cfg);
        return cfg;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
quickRequest.interceptors.response.use(
    (res) => {
        console.info("response", res);
        const { data: resultData } = res;
        // 导出文件
        if (res.config.responseType === ("arraybuffer" || "blob")) {
            return resultData;
        }
        const { data } = resultData as IQuickResponseData<any>;
        if (!data) {
            return Promise.resolve();
        }
        const { payload, total } = data;
        if (payload) {
            return Promise.resolve({
                data: payload,
                total
            });
        }
        return Promise.resolve({
            data
        });
    },
    (error) => {
        const { response } = error;
        const { status } = response;
        if (status === 401) {
            if (!errFlag) {
                ElMessageBox.confirm("登录过期，请重新登录", "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        errFlag = true;
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.href = "/";
                    })
                    .catch(() => {
                        errFlag = false;
                    });
            }
        } else if (status === 400) {
            const { data: resultData } = response;
            const { msg } = resultData as IQuickResponseData<any>;
            ElMessage.error(msg);
        } else {
            if (!errFlag) {
                errFlag = true;
                ElMessage.error(error);
            }
            console.error("error", error);
        }
        return Promise.reject(error);
    }
);

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
    return quickRequest.request<any, T>(config);
};
export default request;
