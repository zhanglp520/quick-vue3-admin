<script lang="ts" setup>
/**导入第三方库 */
import { computed, reactive, ref } from "vue";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import { IColumn, IToolbar, ITree, ILeftTree } from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { treeFormat, validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import { getUserPermission, assignUser } from "@/api/auth";
import { getRoleList } from "@/api/system/role";
import { getUserList } from "@/api/system/user";
import { IUser, IAssignUserButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<IUser>>([]);
const userList = reactive<Array<IUser>>([]);
const checkDataList = ref<Array<IUser>>([]);
const currentTreeData = ref<ITree>({
    id: "",
    label: "",
    children: []
});
const permissionBtn = computed<IAssignUserButton>(() => {
    return userStore.getPermissionBtns as IAssignUserButton;
});

/**
 * 工具栏
 */
const handleAssign = () => {
    const { id, label } = currentTreeData.value;
    if (!id) {
        ElMessage({
            type: "warning",
            message: "请选择一个角色"
        });
        return;
    }
    ElMessageBox.confirm(`你真的要给【${label}】角色分配用户吗？`, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
    })
        .then(() => {
            const userIds = checkDataList.value
                .map((x) => {
                    return x.id;
                })
                .join(",");
            assignUser({
                roleId: id,
                userIds
            }).then(() => {
                ElMessage({
                    type: "success",
                    message: "分配用户成功"
                });
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "您已取消分配用户"
            });
        });
};
const tableToolbar = reactive<IToolbar>({
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: true,
    hiddenRefreshButton: true,
    btns: [
        {
            name: "分配用户",
            position: "left",
            type: "primary",
            hidden: !validatePermission(permissionBtn.value?.assignUser),
            click() {
                handleAssign();
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
        label: "用户编号",
        prop: "userId",
        width: "200"
    },
    {
        label: "用户名",
        prop: "userName"
    },
    {
        label: "姓名",
        prop: "fullName"
    },
    {
        label: "手机号",
        prop: "phone"
    },
    {
        label: "邮箱",
        prop: "email",
        width: "200"
    }
]);
/**
 * 加载数据
 */
const load = () => {
    loading.value = true;
    getUserList().then((res) => {
        loading.value = false;
        const { data: userDataList } = res;
        userList.length = 0;
        userList.push(...userDataList);
    });
};
const handleSelectionChange = (selectDataList: Array<IUser>) => {
    checkDataList.value = selectDataList;
};
const tabRef = ref<InstanceType<typeof ElTable>>();
const hanleTableRef = (instance: any) => {
    tabRef.value = instance.value;
};
const toggleRowSelection = (rows: Array<IUser>) => {
    rows.forEach((row) => {
        if (tabRef.value) {
            tabRef.value.toggleRowSelection(row, true);
        }
    });
};
const clearSelection = () => {
    if (tabRef.value) {
        tabRef.value.clearSelection();
    }
};
const getRows = (data: number[]) => {
    const arr: IUser[] = [];
    data.forEach((element: number) => {
        const user = userList.find((x) => x.id === element);
        if (user) {
            arr.push(user);
        }
    });
    return arr;
};
/**
 * 左树
 */
const treeDataList = reactive<Array<ITree>>([]);
const leftTree = reactive<ILeftTree>({
    treeData: [],
    treeSpan: 6
});
const treeLoad = (done: any) => {
    getRoleList().then((res) => {
        const { data: roleList } = res;
        const data = treeFormat(roleList, {
            label: "roleName"
        });
        treeDataList.length = 0;
        treeDataList.push(...data);
        leftTree.treeData.length = 0;
        leftTree.treeData.push(...treeDataList);
        currentTreeData.value.id = treeDataList[0].id;
        done(currentTreeData.value.id);
    });
};
const handleTreeClick = (data: ITree, done: any) => {
    clearSelection();
    currentTreeData.value = data;
    const { id } = currentTreeData.value;
    const roleId = id;
    getUserPermission(roleId).then((res) => {
        const { data: userPermissionList } = res;
        dataList.length = 0;
        dataList.push(...userList);
        const rows = getRows(userPermissionList);
        toggleRowSelection(rows);
    });
    done();
};
</script>
<template>
    <quick-crud
        :table-data="dataList"
        :table-columns="tableColumns"
        :table-toolbar="tableToolbar"
        dialog-titles="dialogTitles"
        :left-tree="leftTree"
        :loading="loading"
        @on-selection-change="handleSelectionChange"
        @on-load="load"
        @on-tree-load="treeLoad"
        @on-tree-click="handleTreeClick"
        @on-table-ref="hanleTableRef"
    ></quick-crud>
</template>
