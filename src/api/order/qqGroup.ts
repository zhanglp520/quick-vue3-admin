import { IOrderStatistics, IQQGroup } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { qqGroup as api } from "./index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: qq群管理模块api
 *@Author: 土豆哥
 *@Date: 2023-09-01 11:57:43
 */

export const getOrderStatistics = (): Promise<
    IQuickResponseData<IOrderStatistics>
> => {
    return request<IQuickResponseData<IOrderStatistics>>({
        url: `${api}/statistics`,
        method: "GET"
    });
};

export const getQQGroupPageList = (
    params: object
): Promise<IQuickResponseData<Array<IQQGroup>>> => {
    return request<IQuickResponseData<Array<IQQGroup>>>({
        url: api,
        method: "GET",
        params
    });
};
export const getQQGroupList = (): Promise<
    IQuickResponseData<Array<IQQGroup>>
> => {
    return request<IQuickResponseData<Array<IQQGroup>>>({
        url: `${api}/getQQGroupList`,
        method: "GET"
    });
};
export const getQQGroupByQQGroupName = (
    qqGroupName: string
): Promise<IQuickResponseData<IQQGroup>> => {
    return request<IQuickResponseData<IQQGroup>>({
        url: `${api}/getQQGroupByQQGroupName/${qqGroupName}`,
        method: "GET"
    });
};
export const addQQGroup = (data: IQQGroup) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateQQGroup = (data: IQQGroup) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteQQGroup = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};

export const batchDeleteQQGroup = (ids: string) => {
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
