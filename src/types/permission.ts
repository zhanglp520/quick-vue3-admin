import { PermissionButton } from "@ainiteam/quick-vue3-ui";

export interface AssignUserButton extends PermissionButton {
  assignUser?: boolean
}
export interface RolePermissionButton extends PermissionButton {
  assignPermission?: boolean
}
