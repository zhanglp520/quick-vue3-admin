import { PermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IAssignUserButton extends PermissionButton {
    assignUser?: boolean;
}

export interface IRolePermissionButton extends PermissionButton {
    assignPermission?: boolean;
}
