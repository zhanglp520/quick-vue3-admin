<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IFormItem,
    IPage,
    IActionbar,
    IToolbar,
    IOptions,
    ITree
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import {
    IProduct,
    ISearchProduct,
    IProductPermissionButton,
    IDictionary
} from "@/types";
import { useUserStore } from "@/store/modules/user";
import {
    getProductPageList,
    addProduct,
    updateProduct,
    deleteProduct,
    enableProduct,
    disableProduct,
    getProductTypeList,
    getDictionaryList,
    publishProduct,
    UnpublishProduct
} from "@/api/product/product";
import { router } from "@/router";
import { listToSelectTree, selectTreeFormat } from "@/utils";

/**
 * 属性
 */
const userStore = useUserStore();
const permissionBtn = computed<IProductPermissionButton>(() => {
    return userStore.getPermissionBtns as IProductPermissionButton;
});

const loading = ref(false);
const tableDataList = reactive<Array<IProduct>>([]);

//产品类型
// const productTypeList = reactive<Array<IDictionary>>([]);
const productTypeCascaderData = reactive<Array<ITree>>([]);

//设备类型
const deviceTypeDic = reactive<Array<IDictionary>>([]);
const deviceTypeSelectData = reactive<Array<IOptions>>([]);

//接入协议
const accessProtocolDic = reactive<Array<IDictionary>>([]);
const accessProtocolSelectData = reactive<Array<IOptions>>([]);

//数据协议
const dataProtocolDic = reactive<Array<IDictionary>>([]);
const dataProtocolSelectData = reactive<Array<IOptions>>([]);

//联网方式
const networkTypeDic = reactive<Array<IDictionary>>([]);
const networkTypeSelectData = reactive<Array<IOptions>>([]);

/**
 * 分页
 */
const page = reactive<IPage>({
    current: 1,
    size: 10,
    sizes: [10, 20, 30, 40, 50],
    total: 0
});

/**
 * 搜索
 */
const searchForm = reactive<ISearchProduct>({
    keyword: "",
    productType: ""
});
const searchFormItems = reactive<Array<IFormItem>>([
    {
        label: "产品分类",
        labelWidth: "80px",
        vModel: "productType",
        placeholder: "产品分类",
        prop: "productType",
        type: "cascader",
        width: "400px",
        treeOptions: productTypeCascaderData
    },
    {
        label: "",
        vModel: "keyword",
        placeholder: "产品编号|产品名称"
    }
]);

/**
 * 工具栏
 */
const handlePrint = () => {
    window.print();
};
const tableToolbar = reactive<IToolbar>({
    hiddenAddButton: validatePermission(permissionBtn.value?.add),
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenBatchDeleteButton: true,
    hiddenPrintButton: true,
    position: "right"
});

/**
 * 操作栏
 */
const handleDelete = (item: IProduct, done: any) => {
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
            done();
        });
    });
};
const handleEnable = (item: IProduct, done: any) => {
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
            done();
        });
    });
};
const handleDisable = (item: IProduct, done: any) => {
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
            done();
        });
    });
};
const handlePublish = (item: IProduct, done: any) => {
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
            done();
        });
    });
};
const handleUnpublish = (item: IProduct, done: any) => {
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
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 350,
    hiddenEditButton: validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: validatePermission(permissionBtn.value?.delete),
    hiddenDetailButton: true,
    btns: [
        {
            name: "查看",
            hidden: validatePermission(permissionBtn.value?.detail),
            click(item: IProduct) {
                router.push({
                    path: "/product/product1/detail",
                    query: { id: item.id }
                });
            }
        },
        {
            name: "设备管理",
            hidden: validatePermission(permissionBtn.value?.device),
            click(item: IProduct) {
                router.push({
                    path: "/device/device",
                    query: { productId: item.id }
                });
            }
        },
        {
            name: "启用",
            hidden: validatePermission(permissionBtn.value?.enabled),
            click(item: IProduct, done: any) {
                handleEnable(item, done);
            },
            render(row: IProduct) {
                return row.enabled === 0;
            }
        },
        {
            name: "禁用",
            hidden: validatePermission(permissionBtn.value?.disabled),
            click(item: IProduct, done: any) {
                handleDisable(item, done);
            },
            render(row: IProduct) {
                return row.enabled !== 0;
            }
        },
        {
            name: "发布",
            hidden: validatePermission(permissionBtn.value?.publish),
            click(item: IProduct, done: any) {
                handlePublish(item, done);
            },
            render(row: IProduct) {
                return row.enabled === 0;
            }
        },
        {
            name: "撤销发布",
            hidden: validatePermission(permissionBtn.value?.Unpublish),
            click(item: IProduct, done: any) {
                handleUnpublish(item, done);
            },
            render(row: IProduct) {
                return row.enabled !== 0;
            }
        }
    ]
});

/**
 * 表格
 */
const tableColumns = reactive<Array<IColumn>>([
    {
        width: "50",
        type: "selection"
    },
    {
        width: "60",
        type: "index",
        label: "序号"
    },

    {
        label: "产品编号",
        prop: "productId",
        width: "100"
    },
    {
        label: "产品名称",
        prop: "productName",
        width: "100"
    },
    {
        label: "品类方式",
        prop: "category",
        width: "100",
        format: (row: IProduct) => {
            return row.category === "1" ? "自定义品类" : "标准品类";
        }
    },
    // {
    //     label: "产品分类",
    //     prop: "productType",
    //     width: "100",
    //     format: (row: IProduct) => {
    //         const obj = productTypeList.find(
    //             (x: any) => x.id === row.productType
    //         );
    //         // if (obj) {
    //         //     const productTypeName = obj.productTypeName
    //         //     return productTypeName
    //         // } else {
    //         //     return ''
    //         // }
    //         return obj && obj.productType;
    //         // .toString()
    //     }
    // },
    {
        label: "设备类型",
        prop: "deviceType",
        width: "100",
        format: (row: IProduct) => {
            const obj = deviceTypeDic.find(
                (x: any) => x.dicId === row.deviceType?.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "接入协议",
        prop: "accessProtocol",
        width: "100",
        format: (row: IProduct) => {
            const obj = accessProtocolDic.find(
                (x: any) => x.dicId === row.accessProtocol?.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "数据协议",
        prop: "dataProtocol",
        width: "100",
        format: (row: IProduct) => {
            const obj = dataProtocolDic.find(
                (x: any) => x.dicId === row.dataProtocol?.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "联网方式",
        prop: "networkType",
        width: "100",
        format: (row: IProduct) => {
            const obj = networkTypeDic.find(
                (x: any) => x.dicId === row.networkType?.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "设备数量",
        prop: "quantity",
        width: "100",
        format: (row: IProduct) => {
            console.log("row", row);
            return "2";
        }
    },

    {
        label: "是否启用",
        prop: "enabled",
        width: "100",
        format: (row: IProduct) => {
            return row.enabled === 1 ? "启用" : "禁用";
        }
    },

    {
        label: "创建时间",
        prop: "createTime",
        width: "200"
    },
    {
        label: "描述",
        prop: "remark"
    }
]);

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
 */
const loadData = (parmas: object) => {
    loading.value = true;
    loadProductTypeSelectTree();
    loadDeviceListSelect();
    loadAccessProtocolSelect();
    loadDataProtocolSelect();
    loadNetworkingMethodsSelect();
    getProductPageList(parmas)
        .then((res) => {
            loading.value = false;
            const { data: productList, total } = res;
            console.log("productList", productList);
            if (productList) {
                tableDataList.length = 0;
                tableDataList.push(...productList);
            }
            page.total = total;
        })
        .catch(() => {
            loading.value = false;
        });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "添加产品",
    edit: "编辑产品",
    detail: "产品详情"
});
const formModel = reactive<IProduct>({
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
        options: networkTypeSelectData,
        rules: [
            {
                required: true,
                message: "请选择联网方式",
                trigger: "blur"
            }
        ]
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
const handleFormSubmit = (form: IProduct, done: any) => {
    const row = { ...form };
    const productType = row.productType as Array<number>;
    row.productType = productType.join();
    if (row.id) {
        updateProduct(row).then(() => {
            ElMessage({
                type: "success",
                message: "产品修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        addProduct(row).then(() => {
            ElMessage({
                type: "success",
                message: "产品创建成功"
            });
            done();
        });
    }
};
</script>
<template>
    <quick-crud
        :dialog-title="dialogTitle"
        :form-model="formModel"
        :form-items="formItems"
        :table-data="tableDataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        :search-form-items="searchFormItems"
        :search-form-model="searchForm"
        :page="page"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
        @on-print="handlePrint"
    ></quick-crud>
</template>
