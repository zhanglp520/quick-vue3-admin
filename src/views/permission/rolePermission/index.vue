<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { ElTree, ElMessage, ElMessageBox } from "element-plus";
import { Toolbar, Tree } from "@ainiteam/quick-vue3-ui";
import { listToTree, treeFormat, validatePermission } from "@/utils";
import { IMenuTree } from "@/types/menu";
import { IRolePermissionButton } from "@/types/permission";
import { useUserStore } from "@/store/modules/user";
import { getMenuPermission, assignPermission } from "@/api/auth";
import { getRoleList } from "@/api/system/role";
import { getMenuList } from "@/api/system/menu";

/**
 * 属性
 */
const userStore = useUserStore();
const menuTreeRef = ref<InstanceType<typeof ElTree>>();
const menuProps = reactive({
  id: "menuId",
  label: "menuName",
  children: "children",
});
const menuTreeData = reactive<Array<IMenuTree>>([]);
const menuTreeList = reactive<Array<IMenuTree>>([]);
const roleTreeRef = ref<InstanceType<typeof ElTree>>();
const roleProps = reactive({
  id: "id",
  label: "label",
  children: "children",
});
const roleTreeData = reactive<Array<Tree>>([]);
const currentTreeData = ref<Tree>({
  id: "",
  label: "",
  children: [],
});
const permissionBtn = computed<IRolePermissionButton>(() => {
  return userStore.getPermissionBtns as IRolePermissionButton;
});

/**
 * 工具栏
 */
const handleGrant = () => {
  const { id, label } = currentTreeData.value;
  if (!id) {
    ElMessage({
      type: "warning",
      message: "请选择一个角色",
    });
    return;
  }
  ElMessageBox.confirm(`你真的要给【${label}】角色分配权限吗？`, {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      if (!menuTreeRef.value) {
        return;
      }
      const menuIdArr = menuTreeRef.value.getCheckedKeys(true);
      const menuIds = menuIdArr.join(",");
      assignPermission({
        roleId: id,
        menuIds,
      }).then(() => {
        ElMessage({
          type: "success",
          message: "分配权限成功",
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "您已取消分配权限",
      });
    });
};
/**
 * 操作栏
 */
const tableToolbar = reactive<Toolbar>({
  btns: [
    {
      name: "分配权限",
      position: "left",
      type: "primary",
      size: "small",
      hidden: validatePermission(permissionBtn.value?.assignPermission),
      click() {
        handleGrant();
      },
    },
  ],
});
/**
 * 加载数据
 */
const menuLoad = () => {
  getMenuList().then((res) => {
    const { data: menuList } = res;
    const menuTree = listToTree(menuList, 0, {
      pId: "pId",
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
      id: "id",
      label: "roleName",
      children: "children",
    });
    roleTreeData.length = 0;
    roleTreeData.push(...roleTree);
    nextTick(() => {
      const key = roleTree[0].id;
      roleTreeRef.value?.setCurrentKey(key);
      const node = roleTreeRef.value?.getCurrentNode() as Tree;
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
	}
}
</style>
