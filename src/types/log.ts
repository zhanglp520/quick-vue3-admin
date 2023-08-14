export interface ILog {
	id?: string;
	type: number;
	ip: string;
	request: string;
	response: string;
	execution?: string;
	duration: number;
	operateId: string;
	createTime: string;
}
export interface ISearchLog {
	startTime?: string;
	endTime?: string;
	logTime: string;
}
export interface ILogPermissionButton {
	// export interface ILogPermissionButton extends PermissionButton {
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
