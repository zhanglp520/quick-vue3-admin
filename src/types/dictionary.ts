export interface Dictionary {
	id?: string;
	dicTypeId: string;
	dicId: string;
	dicName: string;
}
export interface DictionaryPermissionButton {
	// export interface DictionaryPermissionButton extends PermissionButton {
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
