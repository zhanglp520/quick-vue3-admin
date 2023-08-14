// import { Menu } from "@/types/menu";
import { ChangePassword, User } from "@/types/user";
import request, { QuickResponseData } from "@/utils/request";
import { user as api } from "./index";
// import { auth as authApi } from "../auth/index";
/*
 *@Description: 用户管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */
export const exportUser = (): Promise<QuickResponseData<any>> => {
	return request<QuickResponseData<Array<User>>>({
		url: `${api}/exportUser`,
		method: "GET",
		responseType: "arraybuffer",
	});
};
export const getUserPageList = (
	params: object
): Promise<QuickResponseData<Array<User>>> => {
	return request<QuickResponseData<Array<User>>>({
		url: api,
		method: "GET",
		params,
	});
};
export const getUserList = (): Promise<QuickResponseData<Array<User>>> => {
	return request<QuickResponseData<Array<User>>>({
		url: `${api}/getUserList`,
		method: "GET",
	});
};
export const getUserByUserName = (
	userName: string
): Promise<QuickResponseData<User>> => {
	return request<QuickResponseData<User>>({
		url: `${api}/getUserByUserName/${userName}`,
		method: "GET",
	});
};
export const addUser = (data: User) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateUser = (data: User) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteUser = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};
export const changePassword = (id: string, data: ChangePassword) => {
	const { oldPassword, newPassword } = data;
	return request({
		url: `${api}/changePassword/${id}`,
		method: "PATCH",
		data: {
			oldPassword,
			newPassword,
		},
	});
};

export const batchDeleteUser = (ids: string) => {
	return request({
		url: `${api}/batchRemove/${ids}`,
		method: "DELETE",
	});
};
export const resetUserPassword = (id: string) => {
	return request({
		url: `${api}/resetPassword/${id}`,
		method: "PATCH",
	});
};
export const enableUser = (id: string) => {
	return request({
		url: `${api}/enabled/${id}`,
		method: "PATCH",
	});
};
export const disableUser = (id: string) => {
	return request({
		url: `${api}/disable/${id}`,
		method: "PATCH",
	});
};
