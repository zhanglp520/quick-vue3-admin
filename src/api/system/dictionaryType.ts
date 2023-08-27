/*
 *@Description: 字典分类模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:56:16
 */
import { IDictionaryType } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { dictionaryType as api } from "./index";
/*
 *@Description: 字典管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:55:37
 */
export const getDictionaryTypeList = (): Promise<
    IQuickResponseData<Array<IDictionaryType>>
> => {
    return request<IQuickResponseData<Array<IDictionaryType>>>({
        url: api,
        method: "GET"
    });
};

export const addDictionaryType = (data: IDictionaryType) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateDictionaryType = (data: IDictionaryType) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteDictionaryType = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
