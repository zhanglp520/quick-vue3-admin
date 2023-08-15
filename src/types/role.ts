export interface IRole {
    id?: string;
    roleId: string;
    roleName: string;
}
export interface IRolePermissionButton {
    // export interface IRolePermissionButton extends PermissionButton {
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
