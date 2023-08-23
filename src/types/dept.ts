import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IDept {
    id?: number;
    deptId: string;
    deptName: string;
    pId?: number;
}
export interface IDeptTree extends IDept {
    children: IDeptTree[];
}
export interface IDeptPermissionButton extends IPermissionButton {
    import?: boolean;
    export?: boolean;
    add?: boolean;
    batchDelete?: boolean;
    print?: boolean;
    download?: boolean;
    edit?: boolean;
    delete?: boolean;
    detail?: boolean;
    enabled?: boolean;
    disabled?: boolean;
}
