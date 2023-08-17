export interface IDictionary {
    id?: number;
    dicTypeId: string;
    dicId?: number;
    dicName: string;
}
export interface IDictionaryPermissionButton {
    // export interface IDictionaryPermissionButton extends PermissionButton {
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
