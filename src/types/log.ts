import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface ILog {
    id?: number;
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
export interface ILogPermissionButton extends IPermissionButton {}
