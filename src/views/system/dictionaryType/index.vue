<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IActionbar,
    IToolbar,
    IFormItem
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import {
    getDictionaryTypeList,
    addDictionaryType,
    updateDictionaryType,
    deleteDictionaryType
} from "@/api/system/dictionaryType";
import { IDictionaryType, IDictionaryTypePermissionButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<IDictionaryType>>([]);
const permissionBtn = computed<IDictionaryTypePermissionButton>(() => {
    return userStore.getPermissionBtns as IDictionaryTypePermissionButton;
});

/**
 * 工具栏
 */
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
const handleDelete = (item: IDictionaryType, done: any) => {
    ElMessageBox.confirm(
        `你真的删除【${item.dicTypeName}】的字典分类吗？`,
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
        deleteDictionaryType(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "字典分类删除成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 100,
    hiddenDetailButton: true,
    hiddenEditButton: !validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn.value?.delete)
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
        prop: "dicTypeId",
        width: "200"
    },
    {
        label: "字典分类",
        prop: "dicTypeName"
    }
]);

/**
 * 加载数据
 */
const loadData = () => {
    loading.value = true;
    getDictionaryTypeList().then((res) => {
        loading.value = false;
        const { data: dictionaryTypeList } = res;
        console.log("dictionaryTypeList", dictionaryTypeList);
        dataList.length = 0;
        dataList.push(...dictionaryTypeList);
    });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "创建字典分类",
    edit: "修改字典分类",
    detail: "字典分类详情"
});
const formModel = reactive<IDictionaryType>({
    id: undefined,
    dicTypeId: "",
    dicTypeName: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "分类编号",
        labelWidth: "80px",
        vModel: "dicTypeId",
        placeholder: "请输入分类编号",
        editReadonly: true,
        prop: "dicTypeId",
        rules: [
            {
                required: true,
                message: "请输入分类编号",
                trigger: "blur"
            }
        ]
    },
    {
        label: "分类名称",
        labelWidth: "80px",
        vModel: "dicTypeName",
        placeholder: "请输入分类名称",
        prop: "dicTypeName",
        rules: [
            {
                required: true,
                message: "请输入分类名称",
                trigger: "blur"
            }
        ]
    }
]);
const handleFormSubmit = (form: IDictionaryType, done: any) => {
    const row = { ...form };
    if (row.id) {
        console.log("updateDictionaryType", row);
        updateDictionaryType(row).then(() => {
            ElMessage({
                type: "success",
                message: "字典分类修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        console.log("addDictionaryType", row);
        addDictionaryType(row).then(() => {
            ElMessage({
                type: "success",
                message: "字典分类创建成功"
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
        dialog-titles="dialogTitles"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
    ></quick-crud>
</template>
