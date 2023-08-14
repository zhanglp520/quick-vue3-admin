export interface DictionaryType {
	id?: string;
	dicTypeId: string;
	dicTypeName: string;
}
export interface DictionaryTypePermissionButton {
	// export interface DictionaryTypePermissionButton extends PermissionButton {
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
