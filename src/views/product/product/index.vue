<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    Column,
    Actionbar,
    Toolbar,
    FormItem,
    Options
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission, selectTreeFormat, listToTree } from "@/utils";
import { Product, IRolePermissionButton } from "@/types/role";
import { useUserStore } from "@/store/modules/user";
import {
    // getRoleList,
    addRole,
    updateRole
} from "@/api/system/role";
// import { IDept } from "@/types/dept";

import { SearchProduct, Product, IDictionary } from "@/types/product";
import {
    getProductList,
    enableProduct,
    disableProduct,
    deleteProduct,
    getDictionaryList
} from "@/api/product/product";
import { router } from "@/router";

import { getProductTypeList } from "@/api/product/productType";
/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
// const tableDataList = reactive<Array<Product>>([]);
// const deptTreeData = reactive<Array<SelectTreeOptions>>([]);
// const deptDataList = ref<Array<IDept>>();
const permissionBtn = computed<IRolePermissionButton>(() => {
    return userStore.getPermissionBtns as IRolePermissionButton;
});
const dataList = reactive<Array<Product>>([]);
const deviceTypeDicList = reactive<Array<IDictionary>>([]);
const deviceTypeList = reactive<Array<Options>>([]);
const productTypeNameList = reactive<Array<IDictionary>>([]);
const productTypeList = reactive<Array<Options>>([]);
/**
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
    addButtonName: "新增",
    hiddenBatchDeleteButton: true,
    hiddenPrintButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true
});
/**
 * 搜索
 */
const searchForm = reactive<SearchProduct>({
    keyword: "",
    productType: ""
});
const searchFormItems = reactive<Array<FormItem>>([
    {
        label: "产品分类",
        labelWidth: "80px",
        vModel: "productType",
        placeholder: "产品分类",
        prop: "productType",
        type: "tree",
        width: "400px"
    },
    {
        label: "",
        vModel: "keyword",
        placeholder: "产品编号|产品名称"
    }
]);
/**
 * 操作栏
 */
const tableActionbar = reactive<Actionbar>({
    width: 200,
    // detailButtonName: '查看',
    hiddenDetailButton: true,
    btns: [
        {
            name: "查看",
            hidden: validatePermission(permissionBtn.value?.enabled),
            click(item: Product) {
                router.push({
                    path: "/product/product1/detail",
                    query: { id: item.id }
                });
                // router.push({ name: 'guest', params: { id: 1 } });
            }
            // render(row: Product) {
            //     return row.enabled === 0
            // },
        },
        {
            name: "启用",
            hidden: validatePermission(permissionBtn.value?.enabled),
            click(item: Product, done: any) {
                handleEnable(item, done);
            },
            render(row: Product) {
                return row.enabled === 0;
            }
        },
        {
            name: "禁用",
            hidden: validatePermission(permissionBtn.value?.disabled),
            click(item: Product, done: any) {
                handleDisable(item, done);
            },
            render(row: Product) {
                return row.enabled !== 0;
            }
        }
    ]
});
const handleEnable = (item: Product, done: any) => {
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
const handleDisable = (item: Product, done: any) => {
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
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
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
        width: "200"
    },
    {
        label: "产品名称",
        prop: "productName",
        width: "200"
    },
    {
        label: "产品分类",
        prop: "productType",
        width: "200",
        format: (row: Product) => {
            const obj = productTypeNameList.find(
                (x: any) => x.id === row.productType
            );
            // if (obj) {
            //     const productTypeName = obj.productTypeName
            //     return productTypeName
            // } else {
            //     return ''
            // }
            return obj && obj.productTypeName;
            // .toString()
        }
    },
    {
        label: "设备数量",
        prop: "quantity",
        width: "200",
        format: (row: Product) => {
            console.log("row", row);
            return "2";
        }
    },
    {
        label: "设备类型",
        prop: "deviceType",
        width: "200",
        format: (row: Product) => {
            const obj = deviceTypeDicList.find(
                (x: any) => x.dicId === row.deviceType.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "是否启用",
        prop: "enabled",
        width: "200",
        format: (row: Product) => {
            return row.enabled === 1 ? "启用" : "禁用";
        }
    },
    {
        label: "创建时间",
        prop: "createTime",
        width: "200"
    },
    {
        label: "备注",
        prop: "remark"
    }
    // {
    //     label: "所属部门",
    //     prop: "deptId",
    //     format(row: Product) {
    //         const dept = deptDataList.value?.find(
    //             (x: IDept) => x.id === row.deptId
    //         );
    //         return dept ? dept.deptName : "";
    //     }
    // }
]);
// const handleDelete = (item: Product, done: any) => {
//     ElMessageBox.confirm(`你真的删除【${item.roleName}】的角色吗？`, "警告", {
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         type: "warning"
//     }).then(() => {
//         if (!item.id) {
//             return;
//         }
//         deleteRole(item.id).then(() => {
//             ElMessage({
//                 type: "success",
//                 message: "角色删除成功"
//             });
//             done();
//         });
//     });
// };
const handleDelete = (item: Product, done: any) => {
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
/**
 * 加载部门下拉框数据
 */
// const loadDeptSelectData = () => {
//     getDeptList().then((res) => {
//         const { data: deptList } = res;
//         deptDataList.value = deptList;
//         const deptTree = listToSelectTree(deptList, 0, {
//             value: "id",
//             label: "deptName"
//         });
//         deptTreeData.length = 0;
//         deptTreeData.push(...deptTree);
//     });
// };

const loadProductTypeSelect = () => {
    getProductTypeList().then((res: any) => {
        const { data } = res;
        productTypeNameList.length = 0;
        productTypeNameList.push(...data);
        //列表转树模式
        const ProductTypeTree = listToTree(data, 0, {
            pId: "pId"
        });
        // 树结构映射
        const data1 = selectTreeFormat(ProductTypeTree, {
            value: "id",
            label: "productTypeName"
        });
        productTypeList.length = 0;
        productTypeList.push(...data1);
    });
};
/**
 * 加载数据
 */
const loadData = () => {
    loading.value = true;
    loadProductTypeSelect();
    // loadDeptSelectData();
    // getRoleList().then((res) => {
    //     loading.value = false;
    //     const { data: roleList } = res;
    //     console.log("roleList", roleList);
    //     tableDataList.length = 0;
    //     tableDataList.push(...roleList);
    // });
    getProductList().then((res: any) => {
        loading.value = false;
        const { data: productList } = res;
        dataList.length = 0;
        dataList.push(...productList);
    });
    getDictionaryList("deviceType").then((res: any) => {
        const { data } = res;
        deviceTypeDicList.length = 0;
        deviceTypeDicList.push(...data);
        const data1 = selectTreeFormat(data, {
            value: "dicId",
            label: "dicName"
        });
        deviceTypeList.length = 0;
        deviceTypeList.push(...data1);
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
const formModel = reactive<Product>({
    id: "",
    productName: "",
    quantity: "",
    deviceType: "",
    productId: "",
    productType: ""
});
const formItems = reactive<Array<FormItem>>([
    {
        label: "产品编号",
        labelWidth: "80px",
        vModel: "productId",
        placeholder: "产品编号",
        prop: "productId",
        rules: [
            {
                required: true,
                message: "产品编号不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "产品名称",
        labelWidth: "80px",
        vModel: "productName",
        placeholder: "产品名称",
        prop: "productName",
        rules: [
            {
                required: true,
                message: "产品名称不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "设备类型",
        labelWidth: "80px",
        vModel: "deviceType",
        type: "select",
        placeholder: "设备类型",
        prop: "deviceType"
    },
    {
        label: "产品分类",
        labelWidth: "80px",
        vModel: "productType",
        placeholder: "产品分类",
        prop: "productType",
        type: "tree",
        width: "400px"
    },
    {
        label: "备注",
        labelWidth: "80px",
        vModel: "remark",
        placeholder: "备注",
        type: "textarea",
        prop: "remark"
    }
]);
const handleFormSubmit = (form: Product, done: any) => {
    const row = { ...form };
    row.deptId = form.deptId ? form.deptId : 0;
    if (row.id) {
        updateRole(row).then(() => {
            ElMessage({
                type: "success",
                message: "角色修改成功"
            });
            done();
        });
    } else {
        addRole(row).then(() => {
            ElMessage({
                type: "success",
                message: "角色创建成功"
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
        :table-data="dataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
        :search-form-model="searchForm"
        :search-form-items="searchFormItems"
    ></quick-crud>
</template>
