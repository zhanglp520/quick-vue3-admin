import { Dept } from "@/types/dept";
import request, { QuickResponseData } from "@/utils/request";
import { dept as api } from "./index";
/*
 *@Description: 部门管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:55:10
 */
export const getDeptListByPId = (
	pId: number
): Promise<QuickResponseData<Array<Dept>>> => {
	return request<QuickResponseData<Array<Dept>>>({
		url: `${api}/getListByPId/${pId}`,
		method: "GET",
	});
};
export const getDeptList = (): Promise<QuickResponseData<Array<Dept>>> => {
	return request<QuickResponseData<Array<Dept>>>({
		url: api,
		method: "GET",
	});
};
export const addDept = (data: Dept) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateDept = (data: Dept) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteDept = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};
