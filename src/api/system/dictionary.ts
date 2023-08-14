import { Dictionary } from "@/types/dictionary";
import request, { QuickResponseData } from "@/utils/request";
import { dictionary as api } from "./index";
/*
 *@Description: 字典管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:55:37
 */
export const getDictionaryList = (
	typeId: string
): Promise<QuickResponseData<Array<Dictionary>>> => {
	return request<QuickResponseData<Array<Dictionary>>>({
		url: api,
		method: "GET",
		params: {
			typeId,
		},
	});
};
export const addDictionary = (data: Dictionary) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateDictionary = (data: Dictionary) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteDictionary = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};
