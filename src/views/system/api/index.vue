<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IFormItem,
    IPage,
    IActionbar,
    IToolbar
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import {
    getApiPageList,
    addApi,
    updateApi,
    deleteApi,
    batchDeleteApi
} from "@/api/system/api";
import { IApi, ISearchApi, IApiPermissionButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<IApi>>([]);
const permissionBtn = computed<IApiPermissionButton>(() => {
    return userStore.getPermissionBtns as IApiPermissionButton;
});

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
const searchForm = reactive<ISearchApi>({
    keyword: ""
});
const searchFormItems = reactive<Array<IFormItem>>([
    {
        label: "",
        vModel: "keyword",
        placeholder: "接口名称|菜单名称"
    }
]);

/**
 * 工具栏
 */
const handleBatchDelete = (data: any, done: any) => {
    const { ids } = data;
    ElMessageBox.confirm("你真的删除选择的接口吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        batchDeleteApi(ids).then(() => {
            ElMessage({
                type: "success",
                message: "接口删除成功"
            });
            done();
        });
    });
};
const handlePrint = () => {
    window.print();
};
const tableToolbar = reactive<IToolbar>({
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: !validatePermission(permissionBtn.value?.add)
});

/**
 * 操作栏
 */
const handleDelete = (item: IApi, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.apiName}】的接口吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteApi(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "接口删除成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 150,
    hiddenEditButton: !validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn.value?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn.value?.detail)
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
        label: "接口编号",
        prop: "apiId",
        width: "200"
    },
    {
        label: "接口名称",
        prop: "apiName",
        width: "200"
    },
    {
        label: "接口地址",
        prop: "apiPath",
        width: "300"
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
]);

/**
 * 加载数据
 */
const loadData = (parmas: object) => {
    loading.value = true;
    getApiPageList(parmas)
        .then((res) => {
            loading.value = false;
            const { data: apiList, total } = res;
            console.log("apiList", apiList);
            if (apiList) {
                dataList.length = 0;
                dataList.push(...apiList);
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
    add: "添加接口",
    edit: "编辑接口",
    detail: "接口详情"
});
const formModel = reactive<IApi>({
    id: undefined,
    apiId: "",
    apiName: "",
    apiPath: "",
    remark: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "接口编号",
        labelWidth: "80px",
        vModel: "apiId",
        editReadonly: true,
        placeholder: "请输入接口编号",
        prop: "apiId",
        rules: [
            {
                required: true,
                message: "请输入接口编号",
                trigger: "blur"
            }
        ]
    },
    {
        label: "接口名称",
        labelWidth: "80px",
        vModel: "apiName",
        placeholder: "请输入接口名称",
        prop: "apiName",
        rules: [
            {
                required: true,
                message: "请输入接口名称",
                trigger: "blur"
            }
        ]
    },
    {
        label: "接口地址",
        labelWidth: "80px",
        vModel: "apiPath",
        placeholder: "请输入接口地址",
        prop: "apiPath",
        rules: [
            {
                required: true,
                message: "请输入接口地址",
                trigger: "blur"
            }
        ]
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
const handleFormSubmit = (form: IApi, done: any) => {
    const row = { ...form };
    if (row.id) {
        console.log("updateApi", row);
        updateApi(row).then(() => {
            ElMessage({
                type: "success",
                message: "接口修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        console.log("addApi", row);
        addApi(row).then(() => {
            ElMessage({
                type: "success",
                message: "接口创建成功"
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
        :search-form-items="searchFormItems"
        :search-form-model="searchForm"
        dialog-titles="dialogTitles"
        :page="page"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
        @on-batch-delete="handleBatchDelete"
        @on-print="handlePrint"
    ></quick-crud>
</template>
