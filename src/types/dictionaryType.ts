import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IDictionaryType {
    id?: number;
    dicTypeId: string;
    dicTypeName: string;
}
export interface IDictionaryTypePermissionButton extends IPermissionButton {}
