import { IRole } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { role as api } from "./index";
export { getDeptList } from "./dept";
/*
 *@Description: 角色管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:57:27
 */
export const getRoleList = (): Promise<IQuickResponseData<Array<IRole>>> => {
    return request<IQuickResponseData<Array<IRole>>>({
        url: api,
        method: "GET"
    });
};
export const addRole = (data: IRole) => {
    return request({
        url: api,
        method: "POST",
        data
    });
};
export const updateRole = (data: IRole) => {
    const { id } = data;
    return request({
        url: `${api}/${id}`,
        method: "PUT",
        data
    });
};
export const deleteRole = (id: number) => {
    return request({
        url: `${api}/${id}`,
        method: "DELETE"
    });
};
