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
    LeftTree
} from "@ainiteam/quick-vue3-ui";
import { selectTreeFormat, validatePermission } from "@/utils";
import { IDept, IDeptTree, IDeptPermissionButton } from "@/types/dept";
import { useUserStore } from "@/store/modules/user";
import {
    getDeptList,
    addDept,
    updateDept,
    deleteDept
} from "@/api/system/dept";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const deptDdataListTemp = reactive<Array<IDept>>([]);
const dicTypeList = reactive<Array<Options>>([]);
const dataList = reactive<Array<IDept>>([]);
const currentTreeData = ref<Tree>({
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
    form.pId = currentTreeData.value.id;
    done(form);
};
const tableToolbar = reactive<Toolbar>({
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: validatePermission(permissionBtn.value?.add)
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
const tableActionbar = reactive<Actionbar>({
    width: 300,
    hiddenDetailButton: true,
    hiddenEditButton: validatePermission(permissionBtn.value?.edit)
});
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
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
const deptTreeFormat = (data: Array<IDept>, pId = "0") => {
    const arr: Array<Tree> = [];
    const obj: Tree = {
        id: "",
        label: "",
        children: []
    };
    const parentData = data.find((x: IDept) => x.pId === pId);
    if (parentData) {
        obj.id = parentData.id!;
        obj.label = parentData.deptName;
        const parentId = parentData.id;
        const companyData = data.filter((x: IDept) => x.pId === parentId);
        companyData.forEach((item: IDept) => {
            if (companyData) {
                const companyObj: Tree = {
                    id: item.id!,
                    label: item.deptName,
                    children: []
                };
                const companyPid = item.id;
                const deptData = data.filter(
                    (x: IDept) => x.pId === companyPid
                );
                deptData.forEach((deptItem) => {
                    companyObj.children.push({
                        id: deptItem.id!,
                        label: deptItem.deptName,
                        children: []
                    });
                });
                obj.children.push(companyObj);
            }
        });
    }
    arr.push(obj);
    return arr;
};
const listToTableTree = (data: Array<IDept>, pId = "0") => {
    const arr: Array<IDeptTree> = [];
    const parentData = data.filter((x: IDept) => x.pId === pId);
    parentData.forEach((item: IDept) => {
        const obj: IDeptTree = { ...item, children: [] };
        obj.children = listToTableTree(data, item.id!);
        arr.push(obj);
    });
    return arr;
};
/**
 * 加载数据
 */
const load = () => {
    const { id } = currentTreeData.value;
    const pId = id;
    loading.value = true;
    const deptTree = listToTableTree(deptDdataListTemp, pId);
    loading.value = false;
    dataList.length = 0;
    dataList.push(...deptTree);
};

/**
 * 左树
 */

const leftTree = reactive<LeftTree>({
    treeData: [],
    treeSpan: 6
});
const treeLoad = (done: any) => {
    getDeptList().then((res) => {
        const { data: deptList } = res;
        deptDdataListTemp.length = 0;
        deptDdataListTemp.push(...deptList);
        const data = deptTreeFormat(deptList);
        leftTree.treeData.length = 0;
        leftTree.treeData.push(...data);
        const selectTreeData = selectTreeFormat(data, {
            value: "id"
        });
        dicTypeList.length = 0;
        dicTypeList.push(...selectTreeData);
        if (!currentTreeData.value.id) {
            currentTreeData.value.id = data[0].id;
        }
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
    add: "创建部门",
    edit: "修改部门",
    detail: "部门详情"
});
const formModel = reactive<IDept>({
    id: "",
    deptId: "",
    deptName: "",
    pId: "0"
});
const formItems = reactive<Array<FormItem>>([
    {
        label: "部门编号",
        labelWidth: "80px",
        vModel: "deptId",
        placeholder: "部门编号",
        editReadonly: true,
        prop: "deptId",
        rules: [
            {
                required: true,
                message: "部门编号不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "部门名称",
        labelWidth: "80px",
        vModel: "deptName",
        placeholder: "部门名称",
        prop: "deptName",
        rules: [
            {
                required: true,
                message: "部门名称不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "父级部门",
        labelWidth: "80px",
        vModel: "pId",
        placeholder: "父级部门",
        type: "tree",
        addDisabled: true,
        editDisabled: true,
        detailDisabled: true,
        options: dicTypeList,
        prop: "pId"
    }
]);
const handleFormSubmit = (form: IDept, done: any) => {
    const row = { ...form };
    if (row.id) {
        updateDept(row).then(() => {
            ElMessage({
                type: "success",
                message: "部门修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
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
