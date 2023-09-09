import { IPermissionButton } from "@ainiteam/quick-vue3-ui";
import { TableColumnCtx } from "element-plus";

export interface IProduct {
    id?: number;
    productId: string;
    productName: string;
    categoryMode?: number;
    productType?: number[] | string;
    deviceType?: number;
    accessProtocol?: number;
    dataProtocol?: number;
    networkMode?: number;
    accessKey?: number;
    productKey?: number;
    productSecret?: number;
    enabled?: boolean;
    published?: number;
    createTime?: string;
    updateTime?: Date;
    publishTime?: Date;
    unpublishTime?: Date;
    remark?: string;
}
export interface ISearchProduct {
    keyword: string;
    productType: number[];
}

export interface IProductPermissionButton extends IPermissionButton {
    publish?: boolean;
    unpublish?: boolean;
    device?: boolean;
}
export interface ITopic {
    function: string;
    topicClass: string;
    permissions: string;
    describe: string;
}
export interface ISpanMethodProps {
    row: ITopic;
    column: TableColumnCtx<ITopic>;
    rowIndex: number;
    columnIndex: number;
}

export interface ITopicPermissionButton extends IPermissionButton {}

export interface ICommand {
    cmd: string;
    item: IProduct;
}
