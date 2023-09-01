import { IChangePassword, IOrder } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { order as api } from "./index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 订单管理模块api
 *@Author: 土豆哥
 *@Date: 2023-09-01 11:57:43
 */
export const exportOrder = (): Promise<IQuickResponseData<any>> => {
    return request<IQuickResponseData<Array<IOrder>>>({
        url: `${api}/exportOrder`,
        method: "GET",
        responseType: "arraybuffer"
    });
};
export const getOrderPageList = (
    params: object
): Promise<IQuickResponseData<Array<IOrder>>> => {
    return request<IQuickResponseData<Array<IOrder>>>({
        url: api,
        method: "GET",
        params
    });
};
export const getOrderList = (): Promise<IQuickResponseData<Array<IOrder>>> => {
    return request<IQuickResponseData<Array<IOrder>>>({
        url: `${api}/getOrderList`,
        method: "GET"
    });
};
export const getOrderByOrderName = (
    orderName: string
): Promise<IQuickResponseData<IOrder>> => {
    return request<IQuickResponseData<IOrder>>({
        url: `${api}/getOrderByOrderName/${orderName}`,
        method: "GET"
    });
};
export const addOrder = (data: IOrder) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateOrder = (data: IOrder) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteOrder = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
export const changePassword = (id: number, data: IChangePassword) => {
    const { oldPassword, newPassword } = data;
    return request({
        url: `${api}/changePassword/${id}`,
        method: "PATCH",
        data: {
            oldPassword,
            newPassword
        }
    });
};
export const batchDeleteOrder = (ids: string) => {
    return request({
        url: `${api}/batchRemove/${ids}`,
        method: "DELETE"
    });
};
export const resetOrderPassword = (id: number) => {
    return request({
        url: `${api}/resetPassword/${id}`,
        method: "PATCH"
    });
};
export const enableOrder = (id: number) => {
    return request({
        url: `${api}/enabled/${id}`,
        method: "PATCH"
    });
};
export const disableOrder = (id: number) => {
    return request({
        url: `${api}/disable/${id}`,
        method: "PATCH"
    });
};
