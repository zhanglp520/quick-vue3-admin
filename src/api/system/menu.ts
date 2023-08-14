import { Menu } from "@/types/menu";
import request, { QuickResponseData } from "@/utils/request";
import { menu as api } from "./index";
/*
 *@Description: 菜单管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:03
 */
export const getMenuList = (): Promise<QuickResponseData<Array<Menu>>> => {
	return request<QuickResponseData<Array<Menu>>>({
		url: api,
		method: "GET",
	});
};
export const addMenu = (data: Menu) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateMenu = (data: Menu) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteMenu = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};
