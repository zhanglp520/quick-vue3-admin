// import { Menu } from "@/types/menu";
import { Api } from "@/types/api";
import request, { QuickResponseData } from "@/utils/request";
import { api } from "./index";
// import { auth as authApi } from "../auth/index";

/*
 *@Description: 接口管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */
export const getApiPageList = (
	params: object
): Promise<QuickResponseData<Array<Api>>> => {
	return request<QuickResponseData<Array<Api>>>({
		url: api,
		method: "GET",
		params,
	});
};
export const getApiList = (): Promise<QuickResponseData<Array<Api>>> => {
	return request<QuickResponseData<Array<Api>>>({
		url: `${api}/getApiList`,
		method: "GET",
	});
};
export const getApiByApiName = (
	upiName: string
): Promise<QuickResponseData<Api>> => {
	return request<QuickResponseData<Api>>({
		url: `${api}/getApiByApiName/${upiName}`,
		method: "GET",
	});
};
export const addApi = (data: Api) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateApi = (data: Api) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteApi = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};

export const batchDeleteApi = (ids: string) => {
	return request({
		url: `${api}/batchRemove/${ids}`,
		method: "DELETE",
	});
};
