import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IAssignUserButton extends IPermissionButton {
    assignUser?: boolean;
}

export interface IRole1PermissionButton extends IPermissionButton {
    assignPermission?: boolean;
}
