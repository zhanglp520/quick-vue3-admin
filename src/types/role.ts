import { IPermissionButton } from "@ainiteam/quick-vue3-ui";
export type { IDept } from "./dept";

export interface IRole {
    id?: number;
    roleId: string;
    roleName: string;
    deptId?: number;
}
export interface IRolePermissionButton extends IPermissionButton {}
