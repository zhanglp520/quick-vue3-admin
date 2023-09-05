<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IActionbar,
    IToolbar,
    IFormItem,
    IOptions,
    ITree,
    ILeftTree
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import {
    validatePermission,
    listToSelectTree,
    listToTableTree,
    listToTree
} from "@/utils";
import { useUserStore } from "@/store/modules/user";
import {
    getDeptList,
    addDept,
    updateDept,
    deleteDept
} from "@/api/system/dept";
import { IDept, IDeptPermissionButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const deptDdataListTemp = reactive<Array<IDept>>([]);
const deptTreeData = reactive<Array<IOptions>>([]);
const dataList = reactive<Array<IDept>>([]);
const currentTreeData = ref<ITree>({
    id: "",
    label: "",
    children: []
});
const permissionBtn = computed<IDeptPermissionButton>(() => {
    return userStore.getPermissionBtns as IDeptPermissionButton;
});

/**
 * 工具栏
 */
const handleAdd = (item: IDept, done: any) => {
    const form = { ...item };
    form.pId = Number(currentTreeData.value.id);
    done(form);
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
const handleDelete = (item: IDept, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.deptName}】的部门吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteDept(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "部门删除成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 300,
    hiddenDetailButton: true,
    hiddenEditButton: !validatePermission(permissionBtn.value?.edit)
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
        label: "部门编号",
        prop: "deptId",
        width: "200"
    },
    {
        label: "部门名称",
        prop: "deptName"
    }
]);

/**
 * 加载父级部门树下拉框
 */
const loadSelectTreeData = () => {
    const deptTree = listToSelectTree(deptDdataListTemp, 0, {
        value: "id",
        label: "deptName"
    });
    deptTreeData.length = 0;
    deptTreeData.push(...deptTree);
    console.log("deptTreeData", deptTreeData);
};

/**
 * 加载数据
 */
const loadData = () => {
    const { id } = currentTreeData.value;
    const pId = id;
    loading.value = true;
    const deptTree = listToTableTree(deptDdataListTemp, Number(pId));
    loading.value = false;
    dataList.length = 0;
    dataList.push(...deptTree);
};

/**
 * 左树
 */

const leftTree = reactive<ILeftTree>({
    treeData: [],
    treeSpan: 6
});
const treeLoad = (done: any) => {
    getDeptList().then((res) => {
        const { data: deptList } = res;
        console.log("deptList", deptList);

        deptDdataListTemp.length = 0;
        deptDdataListTemp.push(...deptList);

        const deptTree = listToTree(deptList, 0, {
            id: "id",
            label: "deptName"
        });
        console.log("deptTree", deptTree);
        leftTree.treeData.length = 0;
        leftTree.treeData.push(...deptTree);
        console.log("leftTree", leftTree.treeData);

        currentTreeData.value.id = deptTree && deptTree[0].id;
        done(currentTreeData.value.id);
    });
};
const handleTreeClick = (data: ITree, done: any) => {
    currentTreeData.value = data;
    loadData();
    loadSelectTreeData();
    done();
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "创建部门",
    edit: "修改部门",
    detail: "部门详情"
});
const formModel = reactive<IDept>({
    id: undefined,
    deptId: "",
    deptName: "",
    pId: undefined
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "部门编号",
        labelWidth: "80px",
        vModel: "deptId",
        placeholder: "请输入部门编号",
        editReadonly: true,
        prop: "deptId",
        rules: [
            {
                required: true,
                message: "请输入部门编号",
                trigger: "blur"
            }
        ]
    },
    {
        label: "部门名称",
        labelWidth: "80px",
        vModel: "deptName",
        placeholder: "请输入部门名称",
        prop: "deptName",
        rules: [
            {
                required: true,
                message: "请输入部门名称",
                trigger: "blur"
            }
        ]
    },
    {
        label: "父级部门",
        labelWidth: "80px",
        vModel: "pId",
        placeholder: "请选择父级部门",
        type: "tree",
        addDisabled: true,
        detailDisabled: true,
        options: deptTreeData,
        prop: "pId",
        rules: [
            {
                required: true,
                message: "请选择父级部门",
                trigger: "change"
            }
        ]
    }
]);
const handleFormSubmit = (form: IDept, done: any) => {
    const row = { ...form };
    if (row.id) {
        console.log("updateDept", row);
        updateDept(row).then(() => {
            ElMessage({
                type: "success",
                message: "部门修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        console.log("addDept", row);
        addDept(row).then(() => {
            ElMessage({
                type: "success",
                message: "部门创建成功"
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
        :left-tree="leftTree"
        :left-tree-refresh="true"
        :loading="loading"
        @on-tree-load="treeLoad"
        @on-tree-click="handleTreeClick"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
        @on-add="handleAdd"
    ></quick-crud>
</template>
