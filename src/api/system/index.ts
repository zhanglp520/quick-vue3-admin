import { defaultVersion } from "../index";
/*
 *@Description: 系统管理模块api
 *@Author: 土豆哥
 *@Date: 2022-11-28 11:54:32
 */
const parentModule = "/system";
const apiUrl = `${defaultVersion}${parentModule}`;
export const user = `${apiUrl}/users`;
export const role = `${apiUrl}/roles`;
export const dept = `${apiUrl}/depts`;
export const menu = `${apiUrl}/menus`;
export const dictionary = `${apiUrl}/dictionaries`;
export const dictionaryType = `${apiUrl}/dictionaryTypes`;
export const log = `${apiUrl}/logs`;
export const api = `${apiUrl}/apis`;
