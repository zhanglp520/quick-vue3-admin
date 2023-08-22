import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IMenu {
    id?: number | string;
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
export interface IMenuPermissionButton extends IPermissionButton {}
