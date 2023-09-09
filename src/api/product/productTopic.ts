import { IProduct } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { product as api } from "./index";
export { getDictionaryList } from "@/api/system/dictionary";
export { getProductTypeList } from "@/api/product/productType";
/*
 *@Description: 主题管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:43
 */

/**
 * 获取主题分页列表
 * @param params 参数
 * @returns
 */
// export const getProductPageList = (
//     params: object
// ): Promise<IQuickResponseData<Array<IProduct>>> => {
//     return request<IQuickResponseData<Array<IProduct>>>({
//         url: api,
//         method: "GET",
//         params
//     });
// };
/**
 * 获取主题列表
 * @returns
 */
export const getTopicList = (): Promise<
    IQuickResponseData<Array<IProduct>>
> => {
    return request<IQuickResponseData<Array<IProduct>>>({
        url: `${api}/getProductList`,
        method: "GET"
    });
};

/**
 * 获取主题详情
 */
// export const getProducDetails = (
//     id: number
// ): Promise<IQuickResponseData<IProduct>> => {
//     return request<IQuickResponseData<IProduct>>({
//         url: `${api}/${id}`,
//         method: "GET"
//     });
// };

/**
 * 新增主题
 * @param data 数据
 * @returns
 */
export const addTopic = (data: IProduct) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
/**
 * 修改主题
 * @param data 数据
 * @returns
 */
export const updateTopic = (data: IProduct) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
/**
 * 删除主题
 * @param id 主题编号
 * @returns
 */
export const deleteTopic = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
