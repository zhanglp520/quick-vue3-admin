<script lang="ts" setup>
/**导入第三方库 */
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { ElTree, ElMessage, ElMessageBox } from "element-plus";
import { IToolbar, ITree } from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { listToTableTree, treeFormat, validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import { getMenuPermission, assignPermission } from "@/api/auth";
import { getRoleList } from "@/api/system/role";
import { getMenuList } from "@/api/system/menu";
import { IMenuTree, IRole1PermissionButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const menuTreeRef = ref<InstanceType<typeof ElTree>>();
const menuProps = reactive({
    id: "menuId",
    label: "menuName",
    children: "children"
});
const menuTreeData = reactive<Array<IMenuTree>>([]);
const menuTreeList = reactive<Array<IMenuTree>>([]);
const roleTreeRef = ref<InstanceType<typeof ElTree>>();
const roleProps = reactive({
    id: "id",
    label: "label",
    children: "children"
});
const roleTreeData = reactive<Array<ITree>>([]);
const currentTreeData = ref<ITree>({
    id: "",
    label: "",
    children: []
});
const permissionBtn = computed<IRole1PermissionButton>(() => {
    return userStore.getPermissionBtns as IRole1PermissionButton;
});

/**
 * 工具栏
 */
const handleGrant = () => {
    const { id, label } = currentTreeData.value;
    if (!id) {
        ElMessage({
            type: "warning",
            message: "请选择一个角色"
        });
        return;
    }
    ElMessageBox.confirm(`你真的要给【${label}】角色分配权限吗？`, {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
    })
        .then(() => {
            if (!menuTreeRef.value) {
                return;
            }
            const menuIdArr = menuTreeRef.value.getCheckedKeys(true);
            const menuIds = menuIdArr.join(",");
            assignPermission({
                roleId: id,
                menuIds
            }).then(() => {
                ElMessage({
                    type: "success",
                    message: "分配权限成功"
                });
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "您已取消分配权限"
            });
        });
};
/**
 * 操作栏
 */
const tableToolbar = reactive<IToolbar>({
    btns: [
        {
            name: "分配权限",
            position: "left",
            type: "primary",
            size: "small",
            hidden: !validatePermission(permissionBtn.value?.assignPermission),
            click() {
                handleGrant();
            }
        }
    ]
});
/**
 * 加载数据
 */
const menuLoad = () => {
    getMenuList().then((res) => {
        const { data: menuList } = res;
        const menuTree = listToTableTree(menuList, 0, {
            pId: "pId"
        });
        menuTreeList.length = 0;
        menuTreeList.push(...menuTree);
    });
};
const handleNodeClick = (data: any) => {
    currentTreeData.value = data;
    const { id } = currentTreeData.value;
    getMenuPermission(id).then((res) => {
        const { data: keys } = res;
        menuTreeData.length = 0;
        menuTreeData.push(...menuTreeList);
        nextTick(() => {
            if (menuTreeRef.value) {
                menuTreeRef.value.setCheckedKeys(keys, false);
            }
        });
    });
};
const roleTreeLoad = () => {
    getRoleList().then((res) => {
        const { data: roleList } = res;
        const roleTree = treeFormat(roleList, {
            label: "roleName"
        });
        roleTreeData.length = 0;
        roleTreeData.push(...roleTree);
        nextTick(() => {
            const key = roleTree[0].id;
            roleTreeRef.value?.setCurrentKey(key);
            const node = roleTreeRef.value?.getCurrentNode() as ITree;
            handleNodeClick(node);
        });
    });
};
onMounted(() => {
    roleTreeLoad();
    menuLoad();
});
</script>
<template>
    <div clas="content">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card shadow="never">
                    <el-tree
                        ref="roleTreeRef"
                        :data="roleTreeData"
                        :props="roleProps"
                        node-key="id"
                        :highlight-current="true"
                        @node-click="handleNodeClick"
                    />
                </el-card>
            </el-col>
            <el-col :span="20">
                <el-card shadow="never">
                    <quick-toolbar
                        :table-toolbar="tableToolbar"
                        :hidden-add-button="true"
                        :hidden-batch-delete-button="true"
                        :hidden-import-button="true"
                        :hidden-export-button="true"
                        :hidden-print-button="true"
                        :hidden-refresh-button="true"
                    ></quick-toolbar>
                    <el-tree
                        ref="menuTreeRef"
                        :data="menuTreeData"
                        :props="menuProps"
                        show-checkbox
                        node-key="id"
                        highlight-current
                    />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss" scoped>
.content {
    .el-card {
        height: 575px;
        overflow-y: auto;
    }
}
</style>
