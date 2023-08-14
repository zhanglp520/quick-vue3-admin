import { LoginData, LoginParams, Token } from "@/types/auth";
import { Menu } from "@/types/menu";
import request, { QuickResponseData } from "@/utils/request";
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
	data: LoginParams
): Promise<QuickResponseData<LoginData>> => {
	console.log("data", data);

	return request<QuickResponseData<LoginData>>({
		url: loginApi,
		method: "POST",
		data,
	});
};
export const userLogout = (data: LoginParams) => {
	return request({
		url: `${api}/logout`,
		method: "POST",
		data,
	});
};
export const refreshToken = (
	data: Token
): Promise<QuickResponseData<LoginData>> => {
	return request<QuickResponseData<LoginData>>({
		url: refreshTokenApi,
		method: "POST",
		data,
	});
};
export const getPermission = (
	userId: string
): Promise<QuickResponseData<Array<Menu>>> => {
	return request({
		url: `${api}/getMenuListByUserId/${userId}`,
		method: "GET",
	});
};
export const getMenuPermission = (
	roleId: string
): Promise<QuickResponseData<Array<number>>> => {
	return request<QuickResponseData<Array<number>>>({
		url: `${api}/getMenuListByRoleId/${roleId}`,
		method: "GET",
	});
};
export const getUserPermission = (
	roleId: string
): Promise<QuickResponseData<Array<string>>> => {
	return request<QuickResponseData<Array<string>>>({
		url: `${api}/getUserListByRoleId/${roleId}`,
		method: "GET",
	});
};
export const assignPermission = (data: any) => {
	return request({
		url: `${api}/assignPermission`,
		method: "POST",
		data,
	});
};
export const assignUser = (data: any) => {
	return request({
		url: `${api}/assignUser`,
		method: "POST",
		data,
	});
};

export const getApiPermission = (
	roleId: string
): Promise<QuickResponseData<Array<string>>> => {
	return request<QuickResponseData<Array<string>>>({
		url: `${api}/getApiListByRoleId/${roleId}`,
		method: "GET",
	});
};
export const rolePermission = (data: any) => {
	return request({
		url: `${api}/assignPermission`,
		method: "POST",
		data,
	});
};
