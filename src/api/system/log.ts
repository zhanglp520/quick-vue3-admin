import { Log } from "@/types/log";
import request, { QuickResponseData } from "@/utils/request";
import { log as api } from "./index";
/*
 *@Description: 日志管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:56:42
 */
export const getLogPageList = (
	params: any
): Promise<QuickResponseData<Array<Log>>> => {
	return request<QuickResponseData<Array<Log>>>({
		url: api,
		method: "GET",
		params,
	});
};
