/*
 *@Description: 公共api
 *@Author: 土豆哥
 *@Date: 2023-01-05 17:30:12
 */
import request, { IQuickResponseData } from "@/utils/request";
import { defaultVersion } from "./index";

export const downloadFileStream = (
    filePath: string
): Promise<IQuickResponseData<any>> => {
    return request<IQuickResponseData<Array<any>>>({
        url: `${defaultVersion}/downloads/downloadFileStream?filePath=${filePath}`,
        method: "GET"
    });
};
