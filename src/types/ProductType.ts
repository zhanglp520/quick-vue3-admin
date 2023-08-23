export interface ProductType {
    productType: number;
    id: string | undefined | number;
    productTypeId: string;
    productTypeName: string;
    pId: string | number;
    remark: string;
}
export interface ProductTypeTree extends ProductType {
    children: ProductTypeTree[];
}
export interface ProductTypebar extends ProductType {
    children: ProductTypebar[];
}
