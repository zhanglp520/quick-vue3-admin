import { IOrderStatistics, IQQFrend } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { qqFrend as api } from "./index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: qq群管理模块api
 *@Author: 土豆哥
 *@Date: 2023-09-01 11:57:43
 */

export const getQQFrendOrderStatistics = (): Promise<
    IQuickResponseData<IOrderStatistics>
> => {
    return request<IQuickResponseData<IOrderStatistics>>({
        url: `${api}/statistics`,
        method: "GET"
    });
};

export const getQQFrendPageList = (
    params: object
): Promise<IQuickResponseData<Array<IQQFrend>>> => {
    return request<IQuickResponseData<Array<IQQFrend>>>({
        url: api,
        method: "GET",
        params
    });
};
export const getQQFrendList = (): Promise<
    IQuickResponseData<Array<IQQFrend>>
> => {
    return request<IQuickResponseData<Array<IQQFrend>>>({
        url: `${api}/getQQFrendList`,
        method: "GET"
    });
};
export const getQQFrendByQQFrendName = (
    qqFrendName: string
): Promise<IQuickResponseData<IQQFrend>> => {
    return request<IQuickResponseData<IQQFrend>>({
        url: `${api}/getQQFrendByQQFrendName/${qqFrendName}`,
        method: "GET"
    });
};
export const addQQFrend = (data: IQQFrend) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateQQFrend = (data: IQQFrend) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteQQFrend = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};

export const batchDeleteQQFrend = (ids: string) => {
    return request({
        url: `${api}/batchRemove/${ids}`,
        method: "DELETE"
    });
};
export const excuteOrder = (id: number) => {
    return request({
        url: `${api}/excute/${id}`,
        method: "PATCH"
    });
};
export const batchExcuteOrder = (ids: string) => {
    return request({
        url: `${api}/batchExcute/${ids}`,
        method: "PATCH"
    });
};
