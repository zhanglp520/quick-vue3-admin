<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IActionbar,
    IToolbar,
    IColumn,
    IFormItem,
    ILeftTree,
    ITree
} from "@ainiteam/quick-vue3-ui";

import { IFunc } from "@/types/physicalModel";
import {
    getFuncList,
    addFunction,
    deleteFunc
} from "@/api/product/physicalModel";

const props = defineProps({
    productId: {
        type: String,
        default: ""
    }
});
const { productId } = toRefs(props);

const dataList = reactive<Array<IFunc>>([]);
const loading = ref(false);

const treeDataList = reactive<Array<ITree>>([]);
const leftTree = reactive<ILeftTree>({
    treeData: []
});
leftTree.treeData.length = 0;
leftTree.treeData.push(...treeDataList);

/**
 * 表单
 */
const formModel = reactive<IFunc>({
    identifying: "",
    name: "",
    isAsync: 0,
    outputParams: "",
    inputParams: "",
    remark: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "标识",
        labelWidth: "80px",
        vModel: "identifying",
        placeholder: "标识",
        prop: "identifying",
        rules: [
            {
                required: true,
                message: "标识不能为空",
                trigger: "blur"
            }
        ]
    },

    {
        label: "名称",
        labelWidth: "80px",
        vModel: "name",
        type: "name",
        placeholder: "名称",
        rules: [
            {
                required: true,
                message: "名称不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "是否同步",
        labelWidth: "80px",
        vModel: "isAsync",
        type: "select",
        placeholder: "是否同步",
        prop: "isAsync",
        rules: [
            {
                required: true,
                message: "是否同步不能为空",
                trigger: "blur"
            }
        ],
        options: [
            {
                label: "否",
                value: 0
            },
            {
                label: "是",
                value: 1
            }
        ]
    },
    {
        label: "输入参数",
        labelWidth: "80px",
        vModel: "inputParams",
        type: "textarea",
        placeholder: "输入参数",
        prop: "inputParams"
    },
    {
        label: "输出参数",
        labelWidth: "80px",
        vModel: "outputParams",
        type: "textarea",
        placeholder: "输出参数",
        prop: "outputParams"
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
const handleFormSubmit = (form: IFunc, done: any) => {
    const row = { ...form };
    addFunction(productId.value, row).then(() => {
        ElMessage({
            type: "success",
            message: "功能创建成功"
        });
        done();
    });
};

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
        label: "标识",
        prop: "identifying",
        width: "100"
    },
    {
        label: "名称",
        prop: "name",
        width: "100"
    },
    {
        label: "是否同步",
        prop: "isAsync",
        width: "100",
        format: (row: IFunc) => {
            if (row.isAsync === 0) {
                return "否";
            }
            if (row.isAsync === 1) {
                return "是";
            }
            return "";
        }
    },
    {
        label: "描述",
        prop: "remark"
    }
]);

/**
 * 工具栏
 */
const tableToolbar = reactive<IToolbar>({
    addButtonName: "添加",
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: false
});

/**
 * 操作栏
 * @param item
 * @param done
 */
const handleDelete = (item: IFunc, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.name}】的功能吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.identifying) {
            return;
        }
        deleteFunc(productId.value, item.identifying).then(() => {
            ElMessage({
                type: "success",
                message: "功能删除成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 200,
    hiddenEditButton: true
});

/**
 * 加载的数据
 */
const loadData = () => {
    loading.value = true;
    getFuncList({
        productId: productId.value
    })
        .then((res: any) => {
            loading.value = false;
            const { data: funcList } = res;
            if (funcList) {
                dataList.length = 0;
                dataList.push(...funcList);
            }
        })
        .catch(() => {
            loading.value = false;
        });
};
</script>
<template>
    <quick-crud
        :form-model="formModel"
        :form-items="formItems"
        :table-data="dataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        @on-form-submit="handleFormSubmit"
        :loading="loading"
        @on-load="loadData"
        @on-delete="handleDelete"
    ></quick-crud>
</template>
