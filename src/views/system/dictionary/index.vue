<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    Column,
    Actionbar,
    Toolbar,
    FormItem,
    Options,
    Tree,
    LeftTree,
} from "@ainiteam/quick-vue3-ui";
import { dicFormat, treeFormat, validatePermission } from "@/utils";
import { IDictionary, IDictionaryPermissionButton } from "@/types/dictionary";
import { useUserStore } from "@/store/modules/user";
import { getDictionaryTypeList } from "@/api/system/dictionaryType";
import {
    getDictionaryList,
    addDictionary,
    updateDictionary,
    deleteDictionary,
} from "@/api/system/dictionary";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dicTypeList = reactive<Array<Options>>([]);
const treeDataList = reactive<Array<Tree>>([]);
const dataList = reactive<Array<IDictionary>>([]);
const currentTreeData = ref<Tree>({
    id: "",
    label: "",
    children: [],
});
const permissionBtn = computed<IDictionaryPermissionButton>(() => {
    return userStore.getPermissionBtns as IDictionaryPermissionButton;
});
/**
 * 工具栏
 */
const handleAdd = (item: IDictionary, done: any) => {
    const form = { ...item };
    form.dicTypeId = currentTreeData.value.id;
    done(form);
};
const tableToolbar = reactive<Toolbar>({
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: validatePermission(permissionBtn.value?.add),
});
/**
 * 操作栏
 */
const handleDelete = (item: IDictionary, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.dicName}】的字典吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteDictionary(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "字典删除成功",
            });
            done();
        });
    });
};
const tableActionbar = reactive<Actionbar>({
    width: 300,
    hiddenDetailButton: true,
    hiddenEditButton: validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: validatePermission(permissionBtn.value?.delete),
});
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
    {
        width: "50",
        type: "selection",
    },
    {
        label: "字典编号",
        prop: "dicId",
        width: "200",
    },
    {
        label: "字典名称",
        prop: "dicName",
    },
]);
/**
 * 加载数据
 */
const load = () => {
    const { id } = currentTreeData.value;
    loading.value = true;
    getDictionaryList(id).then(res => {
        loading.value = false;
        const { data: dictionaryList } = res;
        dataList.length = 0;
        dataList.push(...dictionaryList);
    });
};
/**
 * 左树
 */
const leftTree = reactive<LeftTree>({
    treeData: [],
});
const treeLoad = (done: any) => {
    getDictionaryTypeList().then(res => {
        const { data: dictionaryTypeList } = res;
        const data = treeFormat(dictionaryTypeList, {
            id: "dicTypeId",
            label: "dicTypeName",
            children: "children",
        });
        treeDataList.length = 0;
        treeDataList.push(...data);
        leftTree.treeData.length = 0;
        leftTree.treeData.push(...treeDataList);
        const data1 = dicFormat(dictionaryTypeList, {
            value: "dicTypeId",
            label: "dicTypeName",
        });
        dicTypeList.length = 0;
        dicTypeList.push(...data1);

        currentTreeData.value.id = treeDataList[0].id;
        done(currentTreeData.value.id);
    });
};
const handleTreeClick = (data: Tree, done: any) => {
    currentTreeData.value = data;
    load();
    done();
};
/**
 * 表单
 */
const dialogTitle = reactive({
    add: "创建字典",
    edit: "修改字典",
    detail: "字典详情",
});
const formModel = reactive<IDictionary>({
    id: "",
    dicTypeId: "",
    dicId: "",
    dicName: "",
});
const formItems = reactive<Array<FormItem>>([
    {
        label: "字典编号",
        labelWidth: "80px",
        vModel: "dicId",
        placeholder: "字典编号",
        editReadonly: true,
        prop: "dicId",
        rules: [
            {
                required: true,
                message: "字典编号不能为空",
                trigger: "blur",
            },
        ],
    },
    {
        label: "字典名称",
        labelWidth: "80px",
        vModel: "dicName",
        placeholder: "字典名称",
        prop: "dicName",
        rules: [
            {
                required: true,
                message: "字典名称不能为空",
                trigger: "blur",
            },
        ],
    },
    {
        label: "字典类型",
        labelWidth: "80px",
        vModel: "dicTypeId",
        placeholder: "字典类型",
        type: "select",
        addDisabled: true,
        editDisabled: true,
        detailDisabled: true,
        options: dicTypeList,
        prop: "dicTypeId",
    },
]);
const handleFormSubmit = (form: IDictionary, done: any) => {
    const row = { ...form };
    if (row.id) {
        updateDictionary(row).then(() => {
            ElMessage({
                type: "success",
                message: "字典修改成功",
            });
            done();
        });
    } else {
        row.id = undefined;
        addDictionary(row).then(() => {
            ElMessage({
                type: "success",
                message: "字典创建成功",
            });
            done();
        });
    }
};
</script>
<template>
    <quick-crud :dialog-title="dialogTitle" :form-model="formModel" :form-items="formItems" :table-data="dataList"
        :table-columns="tableColumns" :table-actionbar="tableActionbar" :table-toolbar="tableToolbar"
        dialog-titles="dialogTitles" :left-tree="leftTree" :loading="loading" @on-tree-load="treeLoad"
        @on-tree-click="handleTreeClick" @on-form-submit="handleFormSubmit" @on-delete="handleDelete"
        @on-add="handleAdd"></quick-crud>
</template>
