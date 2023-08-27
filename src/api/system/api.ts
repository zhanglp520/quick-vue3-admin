import { IApi } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { api } from "./index";
// import { auth as authApi } from "../auth/index";

/*
 *@Description: 接口管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */
export const getApiPageList = (
    params: object
): Promise<IQuickResponseData<Array<IApi>>> => {
    return request<IQuickResponseData<Array<IApi>>>({
        url: api,
        method: "GET",
        params
    });
};
export const getApiList = (): Promise<IQuickResponseData<Array<IApi>>> => {
    return request<IQuickResponseData<Array<IApi>>>({
        url: `${api}/getApiList`,
        method: "GET"
    });
};
export const getApiByApiName = (
    upiName: string
): Promise<IQuickResponseData<IApi>> => {
    return request<IQuickResponseData<IApi>>({
        url: `${api}/getApiByApiName/${upiName}`,
        method: "GET"
    });
};
export const addApi = (data: IApi) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateApi = (data: IApi) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteApi = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};

export const batchDeleteApi = (ids: string) => {
    return request({
        url: `${api}/batchRemove/${ids}`,
        method: "DELETE"
    });
};
