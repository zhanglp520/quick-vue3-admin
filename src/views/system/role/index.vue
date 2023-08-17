<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Column, Actionbar, Toolbar, FormItem } from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { IRole, IRolePermissionButton } from "@/types/role";
import { useUserStore } from "@/store/modules/user";
import {
    getRoleList,
    addRole,
    updateRole,
    deleteRole
} from "@/api/system/role";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<IRole>>([]);
const permissionBtn = computed<IRolePermissionButton>(() => {
    return userStore.getPermissionBtns as IRolePermissionButton;
});

/**
 * 工具栏
 */
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
const tableActionbar = reactive<Actionbar>({
    width: 150,
    hiddenEditButton: validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: validatePermission(permissionBtn.value?.delete),
    hiddenDetailButton: validatePermission(permissionBtn.value?.detail)
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
        width: "60",
        type: "index",
        label: "序号"
    },
    {
        label: "角色编号",
        prop: "roleId",
        width: "200"
    },
    {
        label: "角色名称",
        prop: "roleName"
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
 * 加载数据
 */
const load = () => {
    loading.value = true;
    getRoleList().then((res) => {
        loading.value = false;
        const { data: roleList } = res;
        dataList.length = 0;
        dataList.push(...roleList);
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
    roleName: ""
});
const formItems = reactive<Array<FormItem>>([
    {
        label: "角色编号",
        labelWidth: "80px",
        vModel: "roleId",
        placeholder: "角色编号",
        editReadonly: true,
        prop: "roleId",
        rules: [
            {
                required: true,
                message: "角色编号不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "角色名称",
        labelWidth: "80px",
        vModel: "roleName",
        placeholder: "角色名称",
        prop: "roleName",
        rules: [
            {
                required: true,
                message: "角色名称不能为空",
                trigger: "blur"
            }
        ]
    }
]);
const handleFormSubmit = (form: IRole, done: any) => {
    const row = { ...form };
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
        dialog-titles="dialogTitles"
        :loading="loading"
        @on-load="load"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
    ></quick-crud>
</template>
