import { IPermissionButton } from "@ainiteam/quick-vue3-ui";
import { TableColumnCtx } from "element-plus";

export interface IProduct {
    id?: number;
    productId: string;
    productName: string;
    category?: string;
    productType?: number[] | string;
    deviceType?: number;
    accessProtocol?: number;
    dataProtocol?: number;
    networkType?: number;
    enabled?: number;
    createTime?: string;
    remark?: string;
}
export interface ISearchProduct {
    keyword: string;
    productType: string;
}

export interface IProductPermissionButton extends IPermissionButton {
    publish?: boolean;
    Unpublish?: boolean;
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
