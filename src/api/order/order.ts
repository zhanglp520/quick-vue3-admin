import { IChangePassword, IUser } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { user as api } from "./index";
export { downloadFileStream } from "@/api/common";

/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */
export const exportUser = (): Promise<IQuickResponseData<any>> => {
    return request<IQuickResponseData<Array<IUser>>>({
        url: `${api}/exportUser`,
        method: "GET",
        responseType: "arraybuffer"
    });
};
export const getUserPageList = (
    params: object
): Promise<IQuickResponseData<Array<IUser>>> => {
    return request<IQuickResponseData<Array<IUser>>>({
        url: api,
        method: "GET",
        params
    });
};
export const getUserList = (): Promise<IQuickResponseData<Array<IUser>>> => {
    return request<IQuickResponseData<Array<IUser>>>({
        url: `${api}/getUserList`,
        method: "GET"
    });
};
export const getUserByUserName = (
    userName: string
): Promise<IQuickResponseData<IUser>> => {
    return request<IQuickResponseData<IUser>>({
        url: `${api}/getUserByUserName/${userName}`,
        method: "GET"
    });
};
export const addUser = (data: IUser) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateUser = (data: IUser) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteUser = (id: number) => {
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
export const batchDeleteUser = (ids: string) => {
    return request({
        url: `${api}/batchRemove/${ids}`,
        method: "DELETE"
    });
};
export const resetUserPassword = (id: number) => {
    return request({
        url: `${api}/resetPassword/${id}`,
        method: "PATCH"
    });
};
export const enableUser = (id: number) => {
    return request({
        url: `${api}/enabled/${id}`,
        method: "PATCH"
    });
};
export const disableUser = (id: number) => {
    return request({
        url: `${api}/disable/${id}`,
        method: "PATCH"
    });
};
