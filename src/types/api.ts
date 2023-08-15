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
