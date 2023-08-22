import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IUser {
    id?: number;
    userId: string;
    userName: string;
    password?: string;
    deleted?: number;
    enabled?: number;
    createTime?: string;
    avatar?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    address?: string;
    remark?: string;
}
export interface ISearchUser {
    keyword: string;
}
export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword?: string;
}

export interface IUserPermissionButton extends IPermissionButton {
    resetPassword?: boolean;
}
