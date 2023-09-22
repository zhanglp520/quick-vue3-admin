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
    getRoleList,
    addRole,
    updateRole,
    deleteRole
} from "@/api/system/role";
import { IRole, IRolePermissionButton, IDialogProgress } from "@/types";
import DialogProgress from "./components/DialogProgress/index.vue";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<IRole>>([]);
const role = ref({});
const permissionBtn = computed<IRolePermissionButton>(() => {
    return userStore.getPermissionBtns as IRolePermissionButton;
});

const dialogVisible = ref(false);
const handleAuth = (item: IRole) => {
    dialogVisible.value = true;
    role.value = item;
};

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
    hiddenDetailButton: !validatePermission(permissionBtn.value?.detail),
    btns: [
        {
            name: "配置权限",
            click(item: IRole) {
                handleAuth(item);
            }
        }
    ]
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
const formItems = reactive<Array<IFormItem>>([
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
const active = ref(1);
const dialogProgressRef = ref<IDialogProgress>();
const prev = () => {
    dialogProgressRef.value?.prev();
};
const next = () => {
    dialogProgressRef.value?.next();
};
const save = () => {
    dialogProgressRef.value?.save(() => {
        dialogVisible.value = false;
    });
};
const handleActive = (status: number) => {
    active.value = status;
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
    <el-dialog
        title="角色授权"
        append-to-body
        v-model="dialogVisible"
        width="30%"
    >
        <div style="height: 400px">
            <dialog-progress
                ref="dialogProgressRef"
                v-if="dialogVisible"
                :role="role"
                @active="handleActive"
            ></dialog-progress>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button
                    :type="active != 1 ? 'primary' : 'default'"
                    :disabled="active == 1"
                    @click="prev"
                    >上一步</el-button
                >
                <el-button
                    :type="active != 3 ? 'primary' : 'default'"
                    :disabled="active == 3"
                    @click="next"
                    >下一步</el-button
                >
                <el-button
                    type="primary"
                    :disabled="active < 3"
                    @click="save"
                    >保存</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>
