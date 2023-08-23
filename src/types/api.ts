import { IPermissionButton } from "@ainiteam/quick-vue3-ui";

export interface IApi {
    id?: number;
    apiId: string;
    apiName: string;
    apiPath: string;
    createTime?: string;
    remark?: string;
}
export interface ISearchApi {
    keyword: string;
}

export interface IApiPermissionButton extends IPermissionButton {
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
}
