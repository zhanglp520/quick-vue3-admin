export interface IMenu {
    id?: number;
    menuId: string;
    menuName: string;
    path: string;
    viewPath?: string;
    menuType?: number;
    icon?: string;
    sort?: number;
    pId?: number;
    link?: number;
    linkUrl?: string;
    enabled?: boolean;
    status?: boolean;
    cache: boolean;
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
