export interface Log {
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
export interface SearchLog {
	startTime?: string;
	endTime?: string;
	logTime: string;
}
export interface LogPermissionButton {
	// export interface LogPermissionButton extends PermissionButton {
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
