import { ILog } from "@/types";
import request, { IQuickResponseData } from "@/utils/request";
import { log as api } from "./index";
/*
 *@Description: 日志管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:56:42
 */
export const getLogPageList = (
    params: any
): Promise<IQuickResponseData<Array<ILog>>> => {
    return request<IQuickResponseData<Array<ILog>>>({
        url: api,
        method: "GET",
        params
    });
};
