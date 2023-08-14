<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { getMenuList } from "@/api/system/menu";
import { getApiList } from "@/api/system/api";
import { listToTree } from "@/utils";
import { MenuTree } from "@/types/menu";
import {
	getMenuPermission,
	getApiPermission,
	rolePermission,
} from "@/api/auth";
import { ElTree } from "element-plus";
import { Role } from "@/types/role";
import { Api } from "@/types/api";

const emits = defineEmits(["active"]);

const props = defineProps({
	role: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

const { role } = props as {
	role: Role;
};

const active = ref(1);

/**
 * 授权菜单
 */
const menuTreeRef = ref<InstanceType<typeof ElTree>>();
const menuTreeData = reactive<Array<MenuTree>>([]);
const menuTreeList = reactive<Array<MenuTree>>([]);
const menuProps = reactive({
	id: "menuId",
	label: "menuName",
	children: "children",
});

/**
 * 授权接口
 */
const apiTreeRef = ref<InstanceType<typeof ElTree>>();
const apiTreeData = reactive<Array<Api>>([]);
const apiTreeList = reactive<Array<Api>>([]);
const apiProps = reactive({
	id: "id",
	label: "apiName",
	children: "children",
});
/**
 * TODO:授权数据
 */

/**
 * 加载菜单数据
 */
const menuLoad = () => {
	getMenuList().then((res) => {
		const { data: menuList } = res;
		const menuTree = listToTree(menuList, 0, {
			pId: "pId",
		});
		menuTreeList.length = 0;
		menuTreeList.push(...menuTree);
		getMenuPermission1(role.id!.toString());
	});
};
const getMenuPermission1 = (id: string) => {
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
/**
 * 加载接口数据
 */
const apiLoad = () => {
	getApiList().then((res) => {
		const { data: apiList } = res;
		apiTreeList.push(...apiList);
		getApiPermission1(role.id!.toString());
	});
};

const getApiPermission1 = (id: string) => {
	getApiPermission(id).then((res) => {
		const { data: keys } = res;
		apiTreeData.length = 0;
		apiTreeData.push(...apiTreeList);
		nextTick(() => {
			if (apiTreeRef.value) {
				apiTreeRef.value.setCheckedKeys(keys, false);
			}
		});
	});
};

const prev = () => {
	if (active.value > 1) {
		active.value--;
	}
};
const next = () => {
	if (active.value < 3) {
		active.value++;
	}
};
const save = (callback: any) => {
	if (!menuTreeRef.value) {
		return;
	}
	const menuIdArr = menuTreeRef.value.getCheckedKeys(true);
	const menuIds = menuIdArr.join(",");
	if (!apiTreeRef.value) {
		return;
	}
	const apiIdArr = apiTreeRef.value.getCheckedKeys(true);
	const apiIds = apiIdArr.join(",");
	const data = {
		roleId: "",
		menuIds,
		apiIds,
	};
	rolePermission(data).then(() => {
		callback();
	});
};
defineExpose({
	prev,
	next,
	save,
});
watch(
	() => active.value,
	(val) => {
		console.log("newVal", val);
		if (val === 1) {
			menuLoad();
		} else if (val === 2) {
			apiLoad();
		}
		emits("active", val);
	}
);
onMounted(() => {
	menuLoad();
});
</script>
<template>
	<el-steps :active="active" finish-status="success" simple>
		<el-step title="菜单权限"></el-step>
		<el-step title="接口权限"></el-step>
		<el-step title="数据权限"></el-step>
	</el-steps>
	<template v-if="active === 1">
		<el-tree
			ref="menuTreeRef"
			:data="menuTreeData"
			:props="menuProps"
			show-checkbox
			node-key="id"
			highlight-current
		/>
	</template>
	<template v-if="active === 2">
		<el-tree
			ref="apiTreeRef"
			:data="apiTreeData"
			:props="apiProps"
			show-checkbox
			node-key="id"
			highlight-current
		/>
	</template>
	<template v-if="active === 3"> 待开发 </template>
</template>
<style lang="scss" scoped></style>
