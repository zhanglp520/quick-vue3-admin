/*
 *@Description: 公共api
 *@Author: 土豆哥
 *@Date: 2023-01-05 17:30:12
 */
import request, { QuickResponseData } from "@/utils/request";
import { defaultVersion } from "./index";

export const downloadFileStream = (
	filePath: string
): Promise<QuickResponseData<any>> => {
	return request<QuickResponseData<Array<any>>>({
		url: `${defaultVersion}/downloads/downloadFileStream?filePath=${filePath}`,
		method: "GET",
	});
};
