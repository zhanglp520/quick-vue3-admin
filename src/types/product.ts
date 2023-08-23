export type { IDictionary } from "./dictionary";

export interface Product {
    id: string | undefined;
    productId: string;
    productName: string;
    deviceType: number;
    productType: number;
    remark?: string;
    createTime?: string;
    enabled?: number;
}
export interface SearchProduct {
    keyword: string;
    productType: string;
}
export interface Topic {
    function: string;
    topicClass: string;
    permissions: string;
    describe: string;
}
