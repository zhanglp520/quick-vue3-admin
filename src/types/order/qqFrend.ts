import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IQQFrend {
    id?: number;
    orderId: string;
    keyword: string;
    content: string;
    status?: number;
    createTime?: string;
    remark: string;
}
export interface ISearchQQFrend {
    orderId: string;
    keyword: string;
    content: string;
    status: string;
}
export interface IOrderStatistics {
    dayOrderNum: number;
    monthOrderNum: number;
    weekOrderNum: number;
    yesterDayOrderNum: number;
    dayData: [];
}
export interface IQQFrendPermissionButton extends IPermissionButton {
    excute?: boolean;
    batchExcute?: boolean;
}
