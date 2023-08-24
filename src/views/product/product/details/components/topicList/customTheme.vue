<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IActionbar,
    IToolbar,
    IFormItem,
    ISelectTreeOptions
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { ITopic, ITopicPermissionButton } from "@/types/product";
import { useUserStore } from "@/store/modules/user";
import {
    getTopicList,
    addTopic,
    updateTopic,
    deleteTopic
} from "@/api/system/topic";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const tableDataList = reactive<Array<ITopic>>([]);
const deptTreeData = reactive<Array<ISelectTreeOptions>>([]);
const permissionBtn = computed<ITopicPermissionButton>(() => {
    return userStore.getPermissionBtns as ITopicPermissionButton;
});

/**
 * 工具栏
 */
const tableToolbar = reactive<IToolbar>({
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: validatePermission(permissionBtn.value?.add)
});

/**
 * 操作栏
 */
const tableActionbar = reactive<IActionbar>({
    width: 150,
    hiddenEditButton: validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: validatePermission(permissionBtn.value?.delete),
    hiddenDetailButton: validatePermission(permissionBtn.value?.detail)
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
        label: "功能",
        prop: "function",
        width: "120"
    },
    {
        label: "Topic类",
        prop: "topicClass",
        width: "600"
    },
    {
        label: "操作权限",
        prop: "permissions",
        width: "100",
        format: (row: ITopic) => {
            return row.permissions === "1" ? "订阅" : "发布";
        }
    },
    {
        label: "描述",
        prop: "describe"
    }
]);
const handleDelete = (item: ITopic, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.function}】的主题吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteTopic(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "主题删除成功"
            });
            done();
        });
    });
};

/**
 * 加载数据
 */
const loadData = () => {
    loading.value = true;
    getTopicList().then((res) => {
        loading.value = false;
        const { data: topicList } = res;
        console.log("topicList", topicList);
        tableDataList.length = 0;
        tableDataList.push(...topicList);
    });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "新增主题",
    edit: "编辑主题",
    detail: "主题详情"
});
const formModel = reactive<ITopic>({
    id: undefined,
    function: "",
    topicClass: "",
    permissions: "",
    describe: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "功能",
        labelWidth: "80px",
        vModel: "function",
        placeholder: "请输入功能",
        editReadonly: true,
        prop: "function",
        rules: [
            {
                required: true,
                message: "请输入功能",
                trigger: "blur"
            }
        ]
    },
    {
        label: "主题类",
        labelWidth: "80px",
        vModel: "topicClass",
        placeholder: "请输入主题类",
        prop: "topicClass",
        rules: [
            {
                required: true,
                message: "请输入主题类",
                trigger: "blur"
            }
        ]
    },
    {
        label: "操作权限",
        labelWidth: "80px",
        vModel: "permissions",
        placeholder: "请选择操作权限",
        type: "select",
        prop: "permissions",
        options: deptTreeData,
        rules: [
            {
                required: true,
                message: "请选择操作权限",
                trigger: "change"
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
const handleFormSubmit = (form: ITopic, done: any) => {
    const row = { ...form };
    row.deptId = form.deptId ? form.deptId : 0;
    if (row.id) {
        updateTopic(row).then(() => {
            ElMessage({
                type: "success",
                message: "主题修改成功"
            });
            done();
        });
    } else {
        addTopic(row).then(() => {
            ElMessage({
                type: "success",
                message: "主题创建成功"
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
        dialog-titles="dialogTitles"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
    ></quick-crud>
</template>
