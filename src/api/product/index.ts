import { defaultVersion } from "../index";
/*
 *@Description: 产品管理模块api
 *@Author: 付嘉明
 *@Date: 2023-07-04 17:54:43
 */
const parentModule = "/device";
const api = `${defaultVersion}${parentModule}`;
// export const device = `${api}/devices`;
export const product = `${api}/products`;
export const productType = `${api}/productTypes`;
export const simulator = `${api}/simulators`;
export const physicalModel = `${api}/physicalModels`;
