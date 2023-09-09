import { IProduct } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { product as api } from "./index";
export { getDictionaryList } from "@/api/system/dictionary";
export { getProductTypeList } from "@/api/product/productType";
/*
 *@Description: 产品管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

/**
 * 获取产品分页列表
 * @param params 参数
 * @returns
 */
export const getProductPageList = (
    params: object
): Promise<IQuickResponseData<Array<IProduct>>> => {
    return request<IQuickResponseData<Array<IProduct>>>({
        url: api,
        method: "GET",
        params
    });
};
/**
 * 获取产品列表
 * @returns
 */
export const getProductList = (): Promise<
    IQuickResponseData<Array<IProduct>>
> => {
    return request<IQuickResponseData<Array<IProduct>>>({
        url: `${api}/getProductList`,
        method: "GET"
    });
};

/**
 * 获取产品详情
 */
export const getProducDetails = (
    id: number
): Promise<IQuickResponseData<IProduct>> => {
    return request<IQuickResponseData<IProduct>>({
        url: `${api}/${id}`,
        method: "GET"
    });
};

/**
 * 新增产品
 * @param data 数据
 * @returns
 */
export const addProduct = (data: IProduct) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
/**
 * 修改产品
 * @param data 数据
 * @returns
 */
export const updateProduct = (data: IProduct) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
/**
 * 删除产品
 * @param id 产品编号
 * @returns
 */
export const deleteProduct = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};

/**
 * 启用产品
 * @param id 产品编号
 * @returns
 */
export const enableProduct = (id: number) => {
    return request({
        url: `${api}/enabled/${id}`,
        method: "PATCH"
    });
};
/**
 * 禁用产品
 * @param id 产品编号
 * @returns
 */
export const disableProduct = (id: number) => {
    return request({
        url: `${api}/disable/${id}`,
        method: "PATCH"
    });
};
/**
 * 发布产品
 * @param id 产品编号
 * @returns
 */
export const publishProduct = (id: number) => {
    return request({
        url: `${api}/publish/${id}`,
        method: "PATCH"
    });
};
/**
 * 撤销发布产品
 * @param id 产品编号
 * @returns
 */
export const UnpublishProduct = (id: number) => {
    return request({
        url: `${api}/unpublish/${id}`,
        method: "PATCH"
    });
};
