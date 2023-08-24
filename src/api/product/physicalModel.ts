import request, { type IQuickResponseData } from "@/utils/request";
import { physicalModel as api } from "./index";
import { IAttribute, IFunc, IEvent } from "@/types/physicalModel";
export { getDictionaryList } from "@/api/system/dictionary";

//#region 属性
//获取属性列表
export const getAttributeList = (
    params: any
): Promise<IQuickResponseData<Array<IAttribute>>> => {
    const { productId } = params;
    return request<IQuickResponseData<Array<IAttribute>>>({
        url: `${api}/getAttributeList/${productId}`, //restful guifan
        method: "GET"
    });
};
// 添加属性
export const addAttribute = (productId: string, data: any) => {
    return request({
        url: `${api}/addAttribute/${productId}`,
        method: "PUT",
        data
    });
};

//删除属性
export const deleteAttribute = (productId: string, id: string) => {
    return request({
        url: `${api}/deleteAttribute/${productId}/${id}`,
        method: "DELETE"
    });
};
//#endregion

//#region 功能
//获取功能列表
export const getFuncList = (
    params: any
): Promise<IQuickResponseData<Array<IFunc>>> => {
    const { productId } = params;
    return request<IQuickResponseData<Array<IFunc>>>({
        url: `${api}/getFunctionList/${productId}`, //restful guifan
        method: "GET"
    });
};
// 添加功能
export const addFunction = (productId: string, data: any) => {
    return request({
        url: `${api}/addFunction/${productId}`,
        method: "PUT",
        data
    });
};
//删除功能
export const deleteFunc = (productId: string, id: string) => {
    return request({
        url: `${api}/deleteFunction/${productId}/${id}`,
        method: "DELETE"
    });
};
//#endregion

//#region 事件
//获取事件列表
export const getEventList = (
    params: any
): Promise<IQuickResponseData<Array<IEvent>>> => {
    const { productId } = params;
    return request<IQuickResponseData<Array<IEvent>>>({
        url: `${api}/getEventList/${productId}`, //restful guifan
        method: "GET"
    });
};
// 添加事件
export const addEvent = (productId: string, data: any) => {
    return request({
        url: `${api}/addEvent/${productId}`,
        method: "PUT",
        data
    });
};
//删除事件
export const deleteEvent = (productId: string, id: string) => {
    return request({
        url: `${api}/deleteEvent/${productId}/${id}`,
        method: "DELETE"
    });
};
//#endregion
