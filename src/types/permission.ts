import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IAssignUserButton extends IPermissionButton {
    assignUser?: boolean;
}

export interface IRolePermissionButton extends IPermissionButton {
    assignPermission?: boolean;
}
