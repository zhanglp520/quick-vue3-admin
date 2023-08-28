<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IActionbar,
    IToolbar,
    IFormItem
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { listToTableTree } from "@/utils";
import { ProductType } from "@/types";
import { deleteRole } from "@/api/system/role";

import { getProductTypeList } from "@/api/product/productType";
/**
 * 属性
 */
const loading = ref(false);
const tableDataList = reactive<Array<ProductType>>([]);
/**
 * 工具栏
 */
const tableToolbar = reactive<IToolbar>({
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: false
});

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "创建产品分类",
    edit: "修改产品分类",
    detail: "产品分类详情"
});
const formModel = reactive<ProductType>({
    id: "",
    productTypeId: "",
    productTypeName: "",
    pId: "",
    remark: "",
    productType: 0,
    roleName: undefined
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "分类编号",
        labelWidth: "100px",
        vModel: "productTypeId",
        placeholder: "产品分类编号",
        editReadonly: true,
        prop: "productTypeId",
        width: "400px",
        rules: [
            {
                required: true,
                message: "产品分类编号不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "分类名称",
        labelWidth: "100px",
        vModel: "productTypeName",
        placeholder: "产品分类名称",
        prop: "productTypeName",
        width: "400px",
        rules: [
            {
                required: true,
                message: "产品名称不能为空",
                trigger: "blur"
            }
        ]
    },

    {
        label: "父级分类",
        labelWidth: "100px",
        vModel: "pId",
        placeholder: "父级产品分类",
        type: "tree",
        // options: parentTreeList,
        width: "400px",
        prop: "pId"
    },
    {
        label: "描述",
        labelWidth: "80px",
        vModel: "remark",
        placeholder: "描述",
        type: "textarea",
        prop: "remark"
    }
]);
/**
 * 操作栏
 */
const tableActionbar = reactive<IActionbar>({
    width: 150,
    hiddenEditButton: false,
    hiddenDeleteButton: false,
    hiddenDetailButton: false
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
        label: "分类编号",
        prop: "productTypeId",
        width: "200"
    },
    {
        label: "分类名称",
        prop: "productTypeName",
        width: "200"
    },
    {
        label: "描述",
        prop: "remark"
    }
]);
const handleDelete = (item: ProductType, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.roleName}】的角色吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteRole(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "角色删除成功"
            });
            done();
        });
    });
};

/**
 * 加载数据
 */
const load = () => {
    loading.value = true;
    getProductTypeList().then((res: any) => {
        loading.value = false;
        const { data: productTypeList } = res;
        const productTypeTree = listToTableTree(productTypeList, 0, {
            pId: "pId"
        });
        tableDataList.length = 0;
        tableDataList.push(...productTypeTree);
    });
};
</script>
<template>
    <quick-crud
        :form-items="formItems"
        :form-model="formModel"
        :dialog-title="dialogTitle"
        :table-data="tableDataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        :loading="loading"
        @on-load="load"
        @on-delete="handleDelete"
    ></quick-crud>
</template>
