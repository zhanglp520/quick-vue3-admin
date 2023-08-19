export interface IRole {
    id?: number;
    roleId: string;
    roleName: string;
    deptId?: number;
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
