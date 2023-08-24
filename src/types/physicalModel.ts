export type { IDictionary } from "@/types/dictionary";

export interface IAttribute {
    identifying: string;
    name: string;
    unit: string;
    read: number;
    dataType: string;
    json: string;
    remark: string;
}
export interface IFunc {
    identifying: string;
    name: string;
    isAsync: number;
    inputParams: string;
    outputParams: string;
    remark: string;
}
export interface IEvent {
    identifying: string;
    name: string;
    outputParams: string;
    level: string;
    remark: string;
}
