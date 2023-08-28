<script lang="ts" setup>
import { reactive, ref } from "vue";
import { IFormItem, IPage } from "@ainiteam/quick-vue3-ui";

import { IDictionary, IProduct } from "@/types";
import { getDictionaryList, getProductPageList } from "@/api/product/product";
import { ElMessage } from "element-plus";

const loading = ref(false);
const cardDataList = reactive<Array<IProduct>>([]);
const deviceTypeDic = reactive<Array<IDictionary>>([]);

// const currentPage4 = ref(5);
// const pageSize4 = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
    page.size = val;
    loadData({
        current: page.current,
        size: page.size
    });
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    page.current = val;
    loadData({
        current: page.current,
        size: page.size
    });
};

const cardOption = reactive<any>({
    infoRow: 3,
    column: 3,
    actionbar: true,
    addBtn: true,
    height: 240,
    props: {
        icon: "url",
        title: "productName",
        info: "remark"
    }
});

/**
 * 搜索栏
 */
const searchForm = reactive<any>({
    keyword: ""
});
const searchFormItems = reactive<Array<IFormItem>>([
    {
        label: "",
        vModel: "keyword",
        placeholder: "产品编号|产品名称"
    }
]);
const handleSearch = () => {
    console.log("handleSearch", searchForm);
    loadData({
        current: page.current,
        size: page.size,
        ...searchForm
    });
};
const handleClear = () => {
    searchForm.userName = "";
    console.log("handleClear", searchForm);
};

/**
 * 分页
 */
const page = reactive<IPage>({
    current: 1,
    size: 5,
    sizes: [5, 8, 11, 14, 17],
    total: 0
});

const deviceTypeFormat = (deviceType: number) => {
    const obj = deviceTypeDic.find(
        (x: any) => x.dicId === deviceType?.toString()
    );
    return obj && obj.dicName;
};

//卡片新增按钮
const handleAdd = () => {
    ElMessage({
        message: "添加卡片按钮函数",
        type: "success"
    });
    console.log("handleAdd");
};

const handledDetail = (item: any) => {
    ElMessage({
        message: JSON.stringify(item),
        type: "success"
    });
    console.log("handledDetail", item);
};

//卡片启用按钮
const handleEnabled = (item: any) => {
    ElMessage({
        message: JSON.stringify(item),
        type: "success"
    });
    console.log("handleEnabled", item);
};

//卡片禁用按钮
const handleDisabled = (item: any) => {
    ElMessage({
        message: JSON.stringify(item),
        type: "success"
    });
    console.log("handleDisabled", item);
};
/**
 * 加载设备类型下拉框
 */
const loadDeviceListSelect = () => {
    getDictionaryList("deviceType").then((res: any) => {
        const { data: deviceTypeList } = res;
        deviceTypeDic.length = 0;
        deviceTypeDic.push(...deviceTypeList);
        // const data1 = selectTreeFormat(deviceTypeList, {
        //     value: "dicId",
        //     label: "dicName"
        // });
        // deviceTypeSelectData.length = 0;
        // deviceTypeSelectData.push(...data1);
    });
};

const loadData = (parmas: object) => {
    loading.value = true;
    loadDeviceListSelect();
    getProductPageList(parmas)
        .then((res) => {
            loading.value = false;
            const { data: productList, total } = res;
            console.log("productList", productList);
            if (productList) {
                cardDataList.length = 0;
                cardDataList.push(...productList);
            }
            page.total = total;
        })
        .catch(() => {
            loading.value = false;
        });
};
loadData({
    current: page.current,
    size: page.size
});
</script>
<template>
    <quick-search
        :model="searchForm"
        :items="searchFormItems"
        @on-search="handleSearch"
        @on-clear="handleClear"
    >
    </quick-search>
    <quick-card-list
        :data="cardDataList"
        :option="cardOption"
        @add="handleAdd"
        @detail="handledDetail"
    >
        <template #extra="{ item }">
            <el-descriptions
                :border="true"
                size="small"
                direction="vertical"
            >
                <el-descriptions-item label="品类方式">{{
                    item.category
                }}</el-descriptions-item>
                <el-descriptions-item label="设备类型">{{
                    deviceTypeFormat(item.deviceType)
                }}</el-descriptions-item>
                <el-descriptions-item label="设备数量">2</el-descriptions-item>
                <!-- <el-descriptions-item label="Remarks">
                    <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Address"
                    >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
                    Province</el-descriptions-item
                > -->
            </el-descriptions>
        </template>
        <template #actionbar="{ item }">
            <el-link
                :underline="false"
                class="button"
                @click="handleEnabled(item)"
                >启用</el-link
            >
            <el-link
                :underline="false"
                class="button"
                @click="handleDisabled(item)"
                >禁用</el-link
            >
        </template>
    </quick-card-list>
    <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="page.current"
            v-model:page-size="page.size"
            :page-sizes="page.sizes"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
<style>
.el-descriptions {
    height: 100px;
}
</style>
