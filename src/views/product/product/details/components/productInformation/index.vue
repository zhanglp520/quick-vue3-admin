<script lang="ts" setup>
/**导入第三方库 */
import { reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import clipboard3 from "vue-clipboard3";

/**导入项目文件 */
import { IDictionary, IProduct, IProductType } from "@/types";
import {
    getDictionaryList,
    getProducDetails,
    getProductTypeList
} from "@/api/product/product";

import { dateFormat } from "@ainiteam/date-format-ts";

/**
 * 属性
 */
const props = defineProps({
    productId: String
});
const { productId } = toRefs(props);

//接入协议
const accessProtocolDic = reactive<Array<IDictionary>>([]);

//设备类型
const deviceTypeDic = reactive<Array<IDictionary>>([]);

//数据协议
const dataProtocolDic = reactive<Array<IDictionary>>([]);

//联网方式
const networkModeDic = reactive<Array<IDictionary>>([]);

//产品类型
const productTypeList = reactive<Array<IProductType>>([]);
console.log("产品类型", productTypeList);

//复制
const { toClipboard } = clipboard3();

const product = reactive<IProduct>({
    id: undefined,
    productId: "",
    productName: "",
    categoryMode: 0,
    productType: "",
    deviceType: undefined,
    accessProtocol: undefined,
    dataProtocol: undefined,
    networkMode: undefined,
    accessKey: undefined,
    productKey: undefined,
    productSecret: undefined,
    enabled: undefined,
    published: 0,
    createTime: undefined,
    updateTime: undefined,
    publishTime: undefined,
    unpublishTime: undefined,
    remark: ""
});

//复制
const handleCopy = async (value: string) => {
    try {
        await toClipboard(value);
        ElMessage({
            type: "success",
            message: "复制成功!"
        });
    } catch (err) {
        // console.error(err)
        ElMessage({
            type: "error",
            message: "复制失败"
        });
    }
};

/**
 * 数据格式化
 */

//所属品类格式化
const categoryModeFromat = () => {
    return product.categoryMode === 1 ? "自定义品类" : "标准品类";
};

//状态格式化
const enabledFromat = () => {
    return product.published === 1 ? "已禁用" : "已启用";
};

//是否启用格式化
const publishedFromat = () => {
    return product.published === 1 ? "撤销发布" : "发布";
};

/**
 * 设备类型格式化
 */
const deviceTypeFromat = () => {
    const deviceType = format(product.deviceType);
    const obj = deviceTypeDic.find((x: IDictionary) => x.id === deviceType);
    return obj && obj.dicName;
};

//数据协议格式化
const dataProtocolFromat = () => {
    const dataProtocol = format(product.dataProtocol);
    const obj = dataProtocolDic.find((x: IDictionary) => x.id === dataProtocol);
    return obj && obj.dicName;
};

/**
 * 接入协议格式化
 */
const accessProtocolFromat = () => {
    const accessProtocol = format(product.accessProtocol);
    const obj = accessProtocolDic.find(
        (x: IDictionary) => x.id === accessProtocol
    );
    return obj && obj.dicName;
};

//联网方式格式化
const networkModeFromat = () => {
    const networkMode = format(product.networkMode);
    const obj = networkModeDic.find((x: IDictionary) => x.id === networkMode);
    return obj && obj.dicName;
};

//产品类型格式化
const productTypeFormat = () => {
    const productTypeIdArr = product.productType.split(",");
    console.log("productId", productId);
    const arr: any = [];
    productTypeIdArr.forEach((productTypeId: string) => {
        console.log("producttypeId", productTypeId);
        const productTypeObj = productTypeList.find((obj: IProductType) => {
            console.log("产品分类某一个对象", obj);
            return productTypeId === obj.id?.toString();
        });
        console.log("productTypeObj", productTypeObj);
        if (productTypeObj != undefined) {
            arr.push(productTypeObj.productTypeName);
        }
    });
    console.log("arr", arr);
    return arr.join("/");
};

/**
 * 加载的数据
 */

/**
 * 加载接入协议数据
 */
const loadAccessProtocolData = () => {
    getDictionaryList("accessProtocol").then((res) => {
        const { data: accessProtocolList } = res;
        accessProtocolDic.length = 0;
        accessProtocolDic.push(...accessProtocolList);
    });
};
/**
 * 加载设备类型数据
 */
const loadDeviceListData = () => {
    getDictionaryList("deviceType").then((res) => {
        const { data: deviceTypeList } = res;
        deviceTypeDic.length = 0;
        deviceTypeDic.push(...deviceTypeList);
    });
};

/**
 * 加载数据协议下拉框
 */
const loadDataProtocolData = () => {
    getDictionaryList("dataProtocol").then((res) => {
        const { data: dataProtocolList } = res;
        dataProtocolDic.length = 0;
        dataProtocolDic.push(...dataProtocolList);
    });
};

/**
 * 加载联网方式下拉框
 */
const loadNetworkingMethodsData = () => {
    getDictionaryList("networkMode").then((res) => {
        const { data } = res;
        networkModeDic.length = 0;
        networkModeDic.push(...data);
    });
};

/**
 * 产品类型数据
 */
const loadProductTypeSelectTree = () => {
    getProductTypeList().then((res) => {
        const { data: typeList } = res;
        console.log("产品类型数据", typeList);
        productTypeList.length = 0;
        productTypeList.push(...typeList);
    });
};

/**
 * 加载详情数据
 */
const loadDetailData = () => {
    loadDeviceListData();
    loadAccessProtocolData();
    loadDataProtocolData();
    loadNetworkingMethodsData();
    loadProductTypeSelectTree();
    getProducDetails(Number(productId?.value)).then((res) => {
        console.log("产品详情数据", res);
        const { data: productDetails } = res;
        console.log(productDetails);

        product.productId = productDetails.productId;
        product.productName = productDetails.productName;
        product.categoryMode = productDetails.categoryMode;
        product.productType = productDetails.productType;
        product.deviceType = productDetails.deviceType;
        product.accessProtocol = productDetails.accessProtocol;
        product.dataProtocol = productDetails.dataProtocol;
        product.networkMode = productDetails.networkMode;
        product.accessKey = productDetails.accessKey;
        product.productKey = productDetails.productKey;
        product.productSecret = productDetails.productSecret;
        product.enabled = productDetails.enabled;
        product.published = productDetails.published;
        product.createTime = productDetails.createTime;
        product.updateTime = productDetails.updateTime;
        product.publishTime = productDetails.publishTime;
        product.unpublishTime = productDetails.unpublishTime;
        product.remark = productDetails.remark;
    });
};

//刷新
loadDetailData();
const format = (val: any) => {
    return val === undefined ? "" : val;
};
</script>
<template>
    <el-descriptions title="产品信息">
        <!-- <el-descriptions-item label="产品类型">{{
            product.productType
        }}</el-descriptions-item> -->
        <el-descriptions-item label="产品名称">{{
            format(product.productName)
        }}</el-descriptions-item>
        <el-descriptions-item label="产品ID">{{
            format(product.productId)
        }}</el-descriptions-item>
        <el-descriptions-item label="设备类型">{{
            deviceTypeFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="产品类型">{{
            productTypeFormat()
        }}</el-descriptions-item>
        <el-descriptions-item label="接入协议">{{
            accessProtocolFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="数据协议">{{
            dataProtocolFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="ProductKey">
            {{ format(product.ProductKey) }}
            <el-link
                type="primary"
                :underline="false"
                @click="handleCopy(product.productKey)"
                >复制</el-link
            >
        </el-descriptions-item>
        <el-descriptions-item label="ProductSecret">
            {{ format(product.ProductSecret) }}
            <el-link
                type="primary"
                :underline="false"
                @click="handleCopy(product.productSecret)"
                >复制</el-link
            >
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
            dateFormat(new Date(product.createTime))
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
            dateFormat(new Date(product.updateTime))
        }}</el-descriptions-item>
        <el-descriptions-item label="发布时间">{{
            dateFormat(new Date(product.publishTime))
        }}</el-descriptions-item>
        <el-descriptions-item label="撤销发布时间">{{
            dateFormat(new Date(product.unpublishTime))
        }}</el-descriptions-item>
        <el-descriptions-item label="access_key">
            {{ format(product.accessKey) }}
            <el-link
                type="primary"
                :underline="false"
                @click="handleCopy(product.accessKey)"
                >复制</el-link
            ></el-descriptions-item
        >
        <el-descriptions-item label="所属品类">{{
            categoryModeFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{
            publishedFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="是否启用">{{
            enabledFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="连网协议">{{
            networkModeFromat()
        }}</el-descriptions-item>
        <el-descriptions-item label="产品描述">{{
            format(product.remark)
        }}</el-descriptions-item>
    </el-descriptions>
</template>
