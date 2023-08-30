<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { IFormItem, IOptions, IPage, ITree } from "@ainiteam/quick-vue3-ui";

import { IDictionary, IProduct, IProductPermissionButton } from "@/types";
import {
    getDictionaryList,
    getProductPageList,
    deleteProduct,
    enableProduct,
    disableProduct,
    publishProduct,
    UnpublishProduct,
    getProductTypeList
} from "@/api/product/product";
import { ElMessage, ElMessageBox } from "element-plus";
import { router } from "@/router";
import {
    listToSelectTree,
    selectTreeFormat,
    validatePermission
} from "@/utils";
import { useUserStore } from "@/store/modules/user";
/**
 * 属性
 */
const userStore = useUserStore();
const permissionBtn = computed<IProductPermissionButton>(() => {
    return userStore.getPermissionBtns as IProductPermissionButton;
});

const loading = ref(false);
const cardDataList = reactive<Array<IProduct>>([]);
// const deviceTypeDic = reactive<Array<IDictionary>>([]);

//设备类型
const deviceTypeDic = reactive<Array<IDictionary>>([]);
const deviceTypeSelectData = reactive<Array<IOptions>>([]);

//产品类型
// const productTypeList = reactive<Array<IDictionary>>([]);
const productTypeCascaderData = reactive<Array<ITree>>([]);

//接入协议
const accessProtocolDic = reactive<Array<IDictionary>>([]);
const accessProtocolSelectData = reactive<Array<IOptions>>([]);

//数据协议
const dataProtocolDic = reactive<Array<IDictionary>>([]);
const dataProtocolSelectData = reactive<Array<IOptions>>([]);

//联网方式
const networkTypeDic = reactive<Array<IDictionary>>([]);
const networkTypeSelectData = reactive<Array<IOptions>>([]);

//弹窗显隐
const dialogFormVisible = ref(false);

// const currentPage4 = ref(5);
// const pageSize4 = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
    page.size = val;
    refresh();
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    page.current = val;
    refresh();
};

const cardOption = reactive<any>({
    infoRow: 3,
    column: 3,
    actionbar: true,
    addBtn: validatePermission(permissionBtn.value?.add),
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

/**
 * 表单
 */

const form = reactive<IProduct>({
    id: undefined,
    productId: "",
    productName: "",
    category: "0",
    productType: [],
    deviceType: undefined,
    accessProtocol: undefined,
    dataProtocol: undefined,
    networkType: undefined,
    remark: ""
});

const formItems = reactive<Array<IFormItem>>([
    {
        label: "产品编号",
        labelWidth: "80px",
        vModel: "productId",
        placeholder: "请输入产品编号",
        prop: "productId",
        rules: [
            {
                required: true,
                message: "请输入产品编号",
                trigger: "blur"
            }
        ]
    },
    {
        label: "产品名称",
        labelWidth: "80px",
        vModel: "productName",
        placeholder: "请输入产品名称",
        prop: "productName",
        rules: [
            {
                required: true,
                message: "请输入产品名称",
                trigger: "blur"
            }
        ]
    },
    {
        label: "设备类型",
        labelWidth: "80px",
        vModel: "deviceType",
        type: "select",
        placeholder: "请选择设备类型",
        prop: "deviceType",
        options: deviceTypeSelectData,
        rules: [
            {
                required: true,
                message: "请选择设备类型",
                trigger: "change"
            }
        ]
    },
    {
        label: "品类方式",
        labelWidth: "80px",
        vModel: "category",
        placeholder: "请选择品类方式",
        prop: "category",
        type: "select",
        width: "400px",
        options: [
            {
                label: "标准品类",
                value: "0"
            },
            {
                label: "自定义品类",
                value: "1"
            }
        ],
        rules: [
            {
                required: true,
                message: "请选择品类方式",
                trigger: "blur"
            }
        ]
    },
    {
        label: "产品分类",
        labelWidth: "80px",
        vModel: "productType",
        placeholder: "请选择设备类型",
        prop: "productType",
        type: "cascader",
        width: "400px",
        treeOptions: productTypeCascaderData,
        rules: [
            {
                required: true,
                message: "请选择产品分类",
                trigger: "blur"
            }
        ]
    },
    {
        label: "接入协议",
        labelWidth: "80px",
        vModel: "accessProtocol",
        placeholder: "请选择接入协议",
        prop: "accessProtocol",
        type: "select",
        width: "400px",
        options: accessProtocolSelectData,
        rules: [
            {
                required: true,
                message: "请选择接入协议",
                trigger: "blur"
            }
        ]
    },
    {
        label: "数据协议",
        labelWidth: "80px",
        vModel: "dataProtocol",
        placeholder: "请选择数据协议",
        prop: "dataProtocol",
        type: "select",
        width: "400px",
        options: dataProtocolSelectData,
        rules: [
            {
                required: true,
                message: "请选择数据协议",
                trigger: "blur"
            }
        ]
    },
    {
        label: "联网方式",
        labelWidth: "80px",
        vModel: "networkType",
        placeholder: "请选择联网方式",
        prop: "networkType",
        type: "select",
        width: "400px",
        options: networkTypeSelectData
        // rules: [
        //     {
        //         required: true,
        //         message: "请选择联网方式",
        //         trigger: "blur"
        //     }
        // ]
    },
    {
        label: "描述",
        labelWidth: "80px",
        vModel: "remark",
        placeholder: "请输入描述",
        type: "textarea",
        prop: "remark"
    }
]);
//表单确定按钮
const handleSubmit = () => {
    console.log("handleSubmit", form);

    // dialogFormVisible.value = false;
    ElMessage({
        type: "success",
        message: "产品添加成功"
    });
    // console.log("handleSubmit", form);
};

//表单取消按钮
const handleCancellation = () => {
    dialogFormVisible.value = false;
};

/**
 * 设备类型格式化
 * @param deviceType 设备类型
 */
const deviceTypeFormat = (deviceType: number) => {
    const obj = deviceTypeDic.find(
        (x: any) => x.dicId === deviceType?.toString()
    );
    return obj && obj.dicName;
};

//卡片新增按钮
const handleAdd = () => {
    dialogFormVisible.value = true;
};

const handleDetail = (item: any) => {
    ElMessage({
        message: JSON.stringify(item),
        type: "success"
    });
    console.log("handleDetail", item);
};

/**
 * 操作栏
 */
//卡片启用按钮
const handleEnabled = (item: IProduct) => {
    ElMessageBox.confirm(
        `你真的启用【${item.productName}】的产品吗？`,
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        if (!item.id) {
            return;
        }
        enableProduct(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "产品启用成功"
            });
            refresh();
        });
    });
    // ElMessage({
    //     message: JSON.stringify(item),
    //     type: "success"
    // });
    // console.log("handleEnabled", item);
};

//卡片禁用按钮
const handleDisabled = (item: IProduct) => {
    ElMessageBox.confirm(
        `你真的禁用【${item.productName}】的产品吗？`,
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        if (!item.id) {
            return;
        }
        disableProduct(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "产品禁用成功"
            });
            refresh();
        });
    });
    // ElMessage({
    //     message: JSON.stringify(item),
    //     type: "success"
    // });
    // console.log("handleDisabled", item);
};
const handleCommand = (data: any) => {
    /* eslint-disable indent */
    const { cmd, item } = data;
    switch (cmd) {
        case "edit":
            handleEdit(item);
            break;
        case "delete":
            handleDelete(item);
            break;
        case "deviceType":
            handleDevice(item);
            break;
        case "publish":
            handlePublish(item);
            break;
        case "Unpublish":
            handleUnpublish(item);
            break;
        default:
            break;
    }
};
//卡片编辑按钮
const handleEdit = (item: any) => {
    debugger;
    console.log("点编辑按钮拿到的数据", item);
    dialogFormVisible.value = true;
    form.id = item.id;
    form.productId = item.productId;
    form.productName = item.productName;
    form.category = item.category;
    form.productType = item.productType;
    form.deviceType = deviceTypeFormat(item.deviceType);
    form.accessProtocol = item.accessProtocol;
    form.dataProtocol = item.dataProtocol;
    form.networkType = item.networkType;
    form.remark = item.remark;
    // ElMessage({
    //     message: JSON.stringify(item),
    //     type: "success"
    // });
    // console.log("handleCmd1", item);
};
//卡片删除按钮
const handleDelete = (item: IProduct) => {
    ElMessageBox.confirm(
        `你真的删除【${item.productName}】的产品吗？`,
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        if (!item.id) {
            return;
        }
        deleteProduct(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "产品删除成功"
            });
            refresh();
        });
    });
};
//卡片设备管理按钮
const handleDevice = (item: any) => {
    router.push({
        path: "/device/device",
        query: { productId: item.id }
    });
    // ElMessage({
    //     message: JSON.stringify(item),
    //     type: "success"
    // });
    // console.log("handleCmd3", item);
};
//卡片发布按钮
const handlePublish = (item: any) => {
    ElMessageBox.confirm(
        `你真的发布【${item.productName}】的产品吗？`,
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        if (!item.id) {
            return;
        }
        publishProduct(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "产品发布成功"
            });
            refresh();
        });
    });
    // ElMessage({
    //     message: JSON.stringify(item),
    //     type: "success"
    // });
    // console.log("handleCmd3", item);
};
//卡片撤销发布按钮
const handleUnpublish = (item: any) => {
    ElMessageBox.confirm(
        `你真的撤销发布【${item.productName}】的产品吗？`,
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        if (!item.id) {
            return;
        }
        UnpublishProduct(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "产品撤销发布成功"
            });
            refresh();
        });
    });
    // ElMessage({
    //     message: JSON.stringify(item),
    //     type: "success"
    // });
    // console.log("handleCmd3", item);
};
const beforeHandleCommand = (cmd: string, item: any) => {
    return {
        cmd,
        item
    };
};

/**
 * 加载设备类型下拉框
 */
const loadDeviceListSelect = () => {
    getDictionaryList("deviceType").then((res: any) => {
        const { data: deviceTypeList } = res;
        deviceTypeDic.length = 0;
        deviceTypeDic.push(...deviceTypeList);
        const data1 = selectTreeFormat(deviceTypeList, {
            value: "dicId",
            label: "dicName"
        });
        deviceTypeSelectData.length = 0;
        deviceTypeSelectData.push(...data1);
    });
};

/**
 * 加载产品类型下拉框树
 */
const loadProductTypeSelectTree = () => {
    getProductTypeList().then((res: any) => {
        const { data: productTypeList } = res;
        // productTypeList.length = 0;
        // productTypeList.push(...data);
        const productTypeTree = listToSelectTree(productTypeList, 0, {
            value: "id",
            label: "productTypeName"
        });
        productTypeCascaderData.length = 0;
        productTypeCascaderData.push(...productTypeTree);
    });
};

/**
 * 加载接入协议下拉框
 */
const loadAccessProtocolSelect = () => {
    getDictionaryList("accessProtocol").then((res: any) => {
        const { data: accessProtocolList } = res;
        accessProtocolDic.length = 0;
        accessProtocolDic.push(...accessProtocolList);
        const data1 = selectTreeFormat(accessProtocolList, {
            value: "dicId",
            label: "dicName"
        });
        accessProtocolSelectData.length = 0;
        accessProtocolSelectData.push(...data1);
    });
};

/**
 * 加载数据协议下拉框
 */
const loadDataProtocolSelect = () => {
    getDictionaryList("dataProtocol").then((res: any) => {
        const { data: dataProtocolList } = res;
        dataProtocolDic.length = 0;
        dataProtocolDic.push(...dataProtocolList);
        const data1 = selectTreeFormat(dataProtocolList, {
            value: "dicId",
            label: "dicName"
        });
        dataProtocolSelectData.length = 0;
        dataProtocolSelectData.push(...data1);
    });
};

/**
 * 加载联网方式下拉框
 */
const loadNetworkingMethodsSelect = () => {
    getDictionaryList("networkType").then((res: any) => {
        const { data } = res;
        networkTypeDic.length = 0;
        networkTypeDic.push(...data);
        const data1 = selectTreeFormat(data, {
            value: "dicId",
            label: "dicName"
        });
        networkTypeSelectData.length = 0;
        networkTypeSelectData.push(...data1);
    });
};

/**
 * 加载数据
 * @param parmas
 */
const loadData = (parmas: object) => {
    loading.value = true;
    loadDeviceListSelect();
    loadProductTypeSelectTree();
    loadAccessProtocolSelect();
    loadDataProtocolSelect();
    loadNetworkingMethodsSelect();
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

//刷新
const refresh = () => {
    loadData({
        current: page.current,
        size: page.size
    });
};
refresh();
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
        @detail="handleDetail"
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
            </el-descriptions>
        </template>
        <template #actionbar="{ item }">
            <!-- <el-link
                :underline="false"
                class="button"
                @click="handleEnabled(item)"
                >查看</el-link
            > -->
            <el-link
                :underline="false"
                class="button"
                @click="handleDevice(item)"
                >设备管理</el-link
            >
            <el-link
                :underline="false"
                class="button"
                @click="handleEnabled(item)"
                v-if="item.enabled === 0"
                >启用</el-link
            >
            <el-link
                :underline="false"
                class="button"
                @click="handleDisabled(item)"
                v-else
                >禁用</el-link
            >
            <el-link
                :underline="false"
                class="button"
                @click="handlePublish(item)"
                v-if="item.enabled === 0"
                >发布</el-link
            >
            <el-link
                :underline="false"
                class="button"
                @click="handleUnpublish(item)"
                v-else
                >撤销发布</el-link
            >
            <el-dropdown @command="handleCommand">
                <el-link
                    :underline="false"
                    class="button"
                    >...</el-link
                >
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            :command="beforeHandleCommand('edit', item)"
                            >编辑</el-dropdown-item
                        >
                        <el-dropdown-item
                            :command="beforeHandleCommand('delete', item)"
                            >删除</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
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
    <el-dialog
        v-model="dialogFormVisible"
        title="添加"
    >
        <el-row :guster="20">
            <el-col>
                <quick-form
                    :model="form"
                    :form-items="formItems"
                    :show-action="true"
                    :action-slot="true"
                    @submit="handleSubmit"
                    @clear="handleCancellation"
                >
                    <template #action>
                        <el-button
                            type="primary"
                            @click="handleSubmit"
                            >确定</el-button
                        >
                        <el-button @click="handleCancellation">取消</el-button>
                    </template>
                </quick-form>
            </el-col>
        </el-row>
        <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button
                    type="primary"
                    @click="dialogFormVisible = false"
                >
                    Confirm
                </el-button>
            </span>
        </template> -->
    </el-dialog>
</template>
<style>
.el-descriptions {
    height: 100px;
}
</style>
