// import { Menu } from "@/types/menu";
import { Role } from "@/types/role";
import request, { QuickResponseData } from "@/utils/request";
import { role as api } from "./index";
/*
 *@Description: 角色管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:27
 */
export const getRoleList = (): Promise<QuickResponseData<Array<Role>>> => {
	return request<QuickResponseData<Array<Role>>>({
		url: api,
		method: "GET",
	});
};
export const addRole = (data: Role) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateRole = (data: Role) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteRole = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};
