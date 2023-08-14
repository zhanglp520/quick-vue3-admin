export interface Role {
	id?: string;
	roleId: string;
	roleName: string;
}
export interface RolePermissionButton {
	// export interface RolePermissionButton extends PermissionButton {
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
