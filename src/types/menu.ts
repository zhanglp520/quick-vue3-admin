export interface Menu {
	id?: string;
	menuId: string;
	menuName: string;
	path: string;
	viewPath?: string;
	menuType: number;
	icon?: string;
	sort?: number;
	pId: string;
	link?: number;
	linkUrl?: string;
	enabled?: boolean;
	status?: boolean;
}
export interface MenuTree extends Menu {
	children: MenuTree[];
}
export interface Menubar extends Menu {
	children: Menubar[];
}
export interface MenuPermissionButton {
	// export interface MenuPermissionButton extends PermissionButton {
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
