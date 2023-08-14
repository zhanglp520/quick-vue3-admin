// import { PermissionButton } from "@ainiteam/quick-vue3-ui";

export interface User {
	id?: string;
	userId: string;
	userName: string;
	password?: string;
	deleted?: number;
	enabled?: number;
	createTime?: string;
	avatar?: string;
	fullName?: string;
	phone?: string;
	email?: string;
	address?: string;
	remark?: string;
}
export interface SearchUser {
	keyword: string;
}
export interface ChangePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword?: string;
}

export interface UserPermissionButton {
	// export interface UserPermissionButton extends PermissionButton {
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
