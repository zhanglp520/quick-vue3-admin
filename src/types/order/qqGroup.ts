import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IQQGroup {
    id?: number;
    orderId: string;
    keyword: string;
    content: string;
    status?: number;
    createTime?: string;
    remark: string;
}
export interface ISearchQQGroup {
    orderId: string;
    keyword: string;
    content: string;
    status: string;
}
export interface OrderStatistics {
    dayOrderNum: number;
    monthOrderNum: number;
    weekOrderNum: number;
    yesterDayOrderNum: number;
}
export interface IQQGroupPermissionButton extends IPermissionButton {
    excute?: boolean;
    batchExcute?: boolean;
}
