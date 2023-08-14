/*
 *@Description: 字典分类模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:56:16
 */
import { DictionaryType } from "@/types/dictionaryType";
import request, { QuickResponseData } from "@/utils/request";
import { dictionaryType as api } from "./index";
/*
 *@Description: 字典管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:55:37
 */
export const getDictionaryTypeList = (): Promise<
  QuickResponseData<Array<DictionaryType>>
> => {
	return request<QuickResponseData<Array<DictionaryType>>>({
		url: api,
		method: "GET",
	});
};

export const addDictionaryType = (data: DictionaryType) => {
	return request({
		url: api,
		method: "POST",
		data,
	});
};
export const updateDictionaryType = (data: DictionaryType) => {
	const { id } = data;
	return request({
		url: `${api}/${id}`,
		method: "PUT",
		data,
	});
};
export const deleteDictionaryType = (id: string) => {
	return request({
		url: `${api}/${id}`,
		method: "DELETE",
	});
};
