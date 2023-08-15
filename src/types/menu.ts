export interface IMenu {
    id?: string;
    menuId: string;
    menuName: string;
    path: string;
    viewPath?: string;
    menuType?: number;
    icon?: string;
    sort?: number;
    pId: string;
    link?: number;
    linkUrl?: string;
    enabled?: boolean;
    status?: boolean;
}
export interface IMenuTree extends IMenu {
    children: IMenuTree[];
}
export interface IMenubar extends IMenu {
    children: IMenubar[];
}
export interface IMenuPermissionButton {
    // export interface IMenuPermissionButton extends PermissionButton {
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
