import { IDept } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { dept as api } from "./index";
/*
 *@Description: 部门管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:55:10
 */
export const getDeptListByPId = (
    pId: number
): Promise<IQuickResponseData<Array<IDept>>> => {
    return request<IQuickResponseData<Array<IDept>>>({
        url: `${api}/getListByPId/${pId}`,
        method: "GET"
    });
};
export const getDeptList = (): Promise<IQuickResponseData<Array<IDept>>> => {
    return request<IQuickResponseData<Array<IDept>>>({
        url: api,
        method: "GET"
    });
};
export const addDept = (data: IDept) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateDept = (data: IDept) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteDept = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
