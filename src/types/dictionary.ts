import { IPermissionButton } from "@ainiteam/quick-vue3-ui";
export type { IDictionaryType } from "@/types/dictionaryType";

export interface IDictionary {
    id?: number;
    dicTypeId?: number;
    dicId: string;
    dicName: string;
}
export interface IDictionaryPermissionButton extends IPermissionButton {}
