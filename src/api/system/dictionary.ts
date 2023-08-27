import { IDictionary } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { dictionary as api } from "./index";
export { getDictionaryTypeList } from "@/api/system/dictionaryType";

/*
 *@Description: 字典管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:55:37
 */
export const getDictionaryList = (
    typeId: string
): Promise<IQuickResponseData<Array<IDictionary>>> => {
    return request<IQuickResponseData<Array<IDictionary>>>({
        url: api,
        method: "GET",
        params: {
            typeId
        }
    });
};
export const addDictionary = (data: IDictionary) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateDictionary = (data: IDictionary) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteDictionary = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
