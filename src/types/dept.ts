export interface Dept {
	id?: string;
	deptId: string;
	deptName: string;
	pId: string;
}
export interface DeptTree extends Dept {
	children: DeptTree[];
}
export interface DeptPermissionButton {
	// export interface DeptPermissionButton extends PermissionButton {
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
	resetPassword?: boolean;
}
