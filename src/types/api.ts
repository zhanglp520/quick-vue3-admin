export interface IApi {
    id: string;
    apiId: string;
    apiName: string;
    apiPath: string;
    createTime?: string;
    remark?: string;
}
export interface ISearchApi {
    keyword: string;
}

export interface IApiPermissionButton {
    // export interface IApiPermissionButton extends PermissionButton {
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
