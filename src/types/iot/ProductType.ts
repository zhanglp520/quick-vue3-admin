export interface IProductType {
    roleName: any;
    productType: number;
    id?: number;
    productTypeId: string;
    productTypeName: string;
    pId: string | number;
    remark: string;
}
export interface IProductTypeTree extends IProductType {
    children: IProductTypeTree[];
}
export interface IProductTypebar extends IProductType {
    children: IProductTypebar[];
}
