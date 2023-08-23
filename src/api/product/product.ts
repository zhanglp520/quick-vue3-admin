import request, { type IQuickResponseData } from "@/utils/request";
import { product as api } from "./index";
import { type Product } from "@/types/product";
export { getDictionaryList } from "@/api/system/dictionary";

//删除
export const deleteProduct = (id: string) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
//获取产品分页列表
export const getProductPageList = (
    params: object
): Promise<IQuickResponseData<Array<Product>>> => {
    return request<IQuickResponseData<Array<Product>>>({
        url: api,
        method: "GET",
        params
    });
};
//获取产品列表
export const getProductList = (): Promise<
    IQuickResponseData<Array<Product>>
> => {
    return request<IQuickResponseData<Array<Product>>>({
        url: `${api}/getProductList`,
        method: "GET"
    });
};
//新增
export const addProduct = (data: Product) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
//修改
export const updateProduct = (data: Product) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
//启用产品
export const enableProduct = (id: string) => {
    return request({
        url: `${api}/enabled/${id}`,
        method: "PATCH"
    });
};
//禁用产品
export const disableProduct = (id: string) => {
    return request({
        url: `${api}/disable/${id}`,
        method: "PATCH"
    });
};
