import { IPermissionButton } from "@ainiteam/quick-vue3-ui";
export interface IOrder {
    id?: number;
    orderId?: string;
    orderName: string;
    intro?: string;
    imgUrl?: string;
    status?: number;
    createTime?: string;
    deliveryTime?: string;
    remark?: string;
}
export interface ISearchOrder {
    keyword: string;
}
export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword?: string;
}

export interface IOrderPermissionButton extends IPermissionButton {
    resetPassword?: boolean;
}
