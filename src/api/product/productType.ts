import { IProductType } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { productType as api } from "./index";
/*
 *@Description: 菜单管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:03
 */
export const getProductTypeList = (): Promise<
    IQuickResponseData<Array<IProductType>>
> => {
    return request<IQuickResponseData<Array<IProductType>>>({
        url: api,
        method: "GET"
    });
};
export const addProductType = (data: IProductType) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateMenu = (data: IProductType) => {
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