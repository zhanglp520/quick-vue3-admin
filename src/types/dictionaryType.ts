export interface IDictionaryType {
    id?: number;
    dicTypeId: string;
    dicTypeName: string;
}
export interface IDictionaryTypePermissionButton {
    // export interface IDictionaryTypePermissionButton extends PermissionButton {
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
