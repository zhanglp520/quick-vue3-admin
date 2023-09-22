import { ILoginData, ILoginParams, IToken, IMenu } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { defaultVersion } from "../index";
/*
 *@Description:权限管理api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:51:50
 */
export const auth = `${defaultVersion}/auths`;
const api = auth;
export const loginApi = `${api}/login`;
export const refreshTokenApi = `${api}/refreshToken`;
export const userLogin = (
    data: ILoginParams
): Promise<IQuickResponseData<ILoginData>> => {
    console.log("data", data);

    return request<IQuickResponseData<ILoginData>>({
        url: loginApi,
        method: "POST",
        data
    });
};
export const userLogout = (data: ILoginParams) => {
    return request({
        url: `${api}/logout`,
        method: "POST",
        data
    });
};
export const refreshToken = (
    data: IToken
): Promise<IQuickResponseData<ILoginData>> => {
    return request<IQuickResponseData<ILoginData>>({
        url: refreshTokenApi,
        method: "POST",
        data
    });
};
export const getPermission = (
    userId: string
): Promise<IQuickResponseData<Array<IMenu>>> => {
    return request({
        url: `${api}/getMenuListByUserId/${userId}`,
        method: "GET"
    });
};
export const getMenuPermission = (
    roleId: string
): Promise<IQuickResponseData<Array<number>>> => {
    return request<IQuickResponseData<Array<number>>>({
        url: `${api}/getMenuListByRoleId/${roleId}`,
        method: "GET"
    });
};
export const getUserPermission = (
    roleId: string
): Promise<IQuickResponseData<Array<number>>> => {
    return request<IQuickResponseData<Array<number>>>({
        url: `${api}/getUserListByRoleId/${roleId}`,
        method: "GET"
    });
};
export const assignPermission = (data: any) => {
    return request({
        url: `${api}/assignPermission`,
        method: "POST",
        data
    });
};
export const assignUser = (data: any) => {
    return request({
        url: `${api}/assignUser`,
        method: "POST",
        data
    });
};

export const getApiPermission = (
    roleId: string
): Promise<IQuickResponseData<Array<string>>> => {
    return request<IQuickResponseData<Array<string>>>({
        url: `${api}/getApiListByRoleId/${roleId}`,
        method: "GET"
    });
};
export const rolePermission = (data: any) => {
    return request({
        url: `${api}/assignPermission`,
        method: "POST",
        data
    });
};
