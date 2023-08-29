import { IMenu } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { menu as api } from "./index";
/*
 *@Description: 菜单管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:03
 */
export const getMenuList = (): Promise<IQuickResponseData<Array<IMenu>>> => {
    return request<IQuickResponseData<Array<IMenu>>>({
        url: api,
        method: "GET"
    });
};
export const addMenu = (data: IMenu) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateMenu = (data: IMenu) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteMenu = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
