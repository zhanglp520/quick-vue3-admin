import { defaultVersion } from "../index";
/*
 *@Description: 订单管理模块api
 *@Author: 土豆哥
 *@Date: 2023-09-01 11:57:43
 */
const parentModule = "/order";
const apiUrl = `${defaultVersion}${parentModule}`;
export const qqGroup = `${apiUrl}/qqGroups`;
export const qqFrend = `${apiUrl}/qqFrends`;
