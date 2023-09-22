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
import { listToSelectTree, validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import {
    getRoleList,
    addRole,
    updateRole,
    deleteRole,
    getDeptList
} from "@/api/system/role";
import { IRole, IRolePermissionButton, IDept } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const tableDataList = reactive<Array<IRole>>([]);
const deptTreeData = reactive<Array<ISelectTreeOptions>>([]);
const deptDataList = ref<Array<IDept>>();
const permissionBtn = computed<IRolePermissionButton>(() => {
    return userStore.getPermissionBtns as IRolePermissionButton;
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
        width: "200",
        label: "角色编号",
        prop: "roleId"
    },
    {
        width: "200",
        label: "角色名称",
        prop: "roleName"
    },
    {
        width: "200",
        label: "所属部门",
        prop: "deptId",
        format(row: IRole) {
            const dept = deptDataList.value?.find(
                (x: IDept) => x.id === row.deptId
            );
            return dept ? dept.deptName : "";
        }
    },
    {
        width: "200",
        label: "创建时间",
        prop: "createTime"
    },
    {
        label: "备注",
        prop: "remark"
    }
]);
const handleDelete = (item: IRole, done: any) => {
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
 * 加载部门下拉框数据
 */
const loadDeptSelectData = () => {
    getDeptList().then((res) => {
        const { data: deptList } = res;
        deptDataList.value = deptList;
        const deptTree = listToSelectTree(deptList, 0, {
            value: "id",
            label: "deptName"
        });
        deptTreeData.length = 0;
        deptTreeData.push(...deptTree);
    });
};

/**
 * 加载数据
 */
const loadData = () => {
    loading.value = true;
    loadDeptSelectData();
    getRoleList().then((res) => {
        loading.value = false;
        const { data: roleList } = res;
        console.log("roleList", roleList);
        tableDataList.length = 0;
        tableDataList.push(...roleList);
    });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "新增角色",
    edit: "编辑角色",
    detail: "角色详情"
});
const formModel = reactive<IRole>({
    id: undefined,
    roleId: "",
    roleName: "",
    deptId: undefined
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "角色编号",
        labelWidth: "80px",
        vModel: "roleId",
        placeholder: "请输入角色编号",
        editReadonly: true,
        prop: "roleId",
        rules: [
            {
                required: true,
                message: "请输入角色编号",
                trigger: "blur"
            }
        ]
    },
    {
        label: "角色名称",
        labelWidth: "80px",
        vModel: "roleName",
        placeholder: "请输入角色名称",
        prop: "roleName",
        rules: [
            {
                required: true,
                message: "请输入角色名称",
                trigger: "blur"
            }
        ]
    },
    {
        label: "所属部门",
        labelWidth: "80px",
        vModel: "deptId",
        placeholder: "请选择所属部门",
        type: "tree",
        prop: "deptId",
        options: deptTreeData,
        rules: [
            {
                required: true,
                message: "请选择所属部门",
                trigger: "change"
            }
        ]
    }
]);
const handleFormSubmit = (form: IRole, done: any) => {
    const row = { ...form };
    row.deptId = form.deptId ? form.deptId : 0;
    if (row.id) {
        console.log("updateRole", row);
        updateRole(row).then(() => {
            ElMessage({
                type: "success",
                message: "角色修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        console.log("addRole", row);
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
