<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
	Column,
	Actionbar,
	Toolbar,
	FormItem,
	Options,
} from "@ainiteam/quick-vue3-ui";
import {
	selectTreeFormat,
	listToTree,
	validatePermission,
} from "@/utils/index";
import { Menu, MenuPermissionButton } from "@/types/menu";
import "@/assets/iconfont/quickIconFont.js";
import quickIconFont from "@/config/quickIconFont.json";
import { useUserStore } from "@/store/modules/user";
import {
	getMenuList,
	addMenu,
	updateMenu,
	deleteMenu,
} from "@/api/system/menu";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<Menu>>([]);
const parentTreeList = reactive<Array<Options>>([]);
const permissionBtn = computed<MenuPermissionButton>(() => {
	return userStore.getPermissionBtns as MenuPermissionButton;
});
/**
 * 工具栏
 */
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
const handleDelete = (item: Menu, done: any) => {
	ElMessageBox.confirm(`你真的删除【${item.menuName}】的菜单吗？`, "警告", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	}).then(() => {
		deleteMenu(item.id?.toString()).then(() => {
			ElMessage({
				type: "success",
				message: "菜单删除成功",
			});
			done();
		});
	});
};
const tableActionbar = reactive<Actionbar>({
	width: 150,
	hiddenEditButton: validatePermission(permissionBtn.value?.edit),
	hiddenDeleteButton: validatePermission(permissionBtn.value?.delete),
	hiddenDetailButton: validatePermission(permissionBtn.value?.detail),
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
		label: "菜单编号",
		prop: "menuId",
		width: "200",
	},
	{
		label: "菜单名称",
		prop: "menuName",
		width: "200",
		fixed: true,
	},
	{
		label: "路由",
		prop: "path",
		width: "200",
	},
	{
		label: "视图",
		prop: "viewPath",
		width: "200",
	},
	{
		label: "菜单类型",
		prop: "menuType",
		width: "200",
		format: (row: Menu) => {
			if (row.menuType === 0) {
				return "目录";
			}
			if (row.menuType === 1) {
				return "菜单";
			}
			if (row.menuType === 2) {
				return "按钮";
			}
			return "";
		},
	},
	{
		label: "菜单图标",
		prop: "icon",
		width: "200",
	},
	{
		label: "菜单排序",
		prop: "sort",
		width: "200",
	},
	{
		label: "是否外链",
		prop: "link",
		width: "200",
		format: (row: Menu) => {
			return row.link === 1 ? "外链" : "非外链";
		},
	},
	{
		label: "是否启用",
		prop: "enabled",
		width: "200",
		format: (row: Menu) => {
			return !row.enabled ? "启用" : "禁用";
		},
	},
	{
		label: "是否显示",
		prop: "status",
		width: "200",
		format: (row: Menu) => {
			return row.status ? "显示" : "不显示";
		},
	},
]);
/**
 * 加载数据
 */
const load = () => {
	loading.value = true;
	getMenuList().then((res) => {
		loading.value = false;
		const { data: menuList } = res;
		const menuTree = listToTree(menuList, 0, {
			pId: "pId",
		});
		dataList.length = 0;
		dataList.push(...menuTree);

		const parentMenuList = menuList.filter((x) => x.menuType !== 2);
		const parentTree = listToTree(parentMenuList, 0, {
			pId: "pId",
		});
		const selectTreeData = selectTreeFormat(parentTree, {
			value: "id",
			label: "menuName",
		});
		parentTreeList.length = 0;
		parentTreeList.push(...selectTreeData);
	});
};
/**
 * 表单
 */
const dialogTitle = reactive({
	add: "创建菜单",
	edit: "修改菜单",
	detail: "菜单详情",
});
const formModel = reactive<Menu>({
	id: "",
	menuId: "",
	menuName: "",
	path: "",
	viewPath: "",
	menuType: 0,
	icon: "",
	sort: 0,
	pId: "0",
	link: 0,
	linkUrl: "",
	enabled: true,
	status: true,
});
const formItems = reactive<Array<FormItem>>([
	{
		label: "菜单编号",
		labelWidth: "80px",
		vModel: "menuId",
		placeholder: "菜单编号",
		editReadonly: true,
		prop: "menuId",
		width: "400px",
		rules: [
			{
				required: true,
				message: "菜单编号不能为空",
				trigger: "blur",
			},
		],
	},
	{
		label: "菜单名称",
		labelWidth: "80px",
		vModel: "menuName",
		placeholder: "菜单名称",
		prop: "menuName",
		width: "400px",
		rules: [
			{
				required: true,
				message: "菜单名称不能为空",
				trigger: "blur",
			},
		],
	},
	{
		label: "菜单类型",
		labelWidth: "80px",
		vModel: "menuType",
		placeholder: "菜单类型",
		prop: "menuType",
		type: "select",
		width: "400px",
		options: [
			{
				label: "目录",
				value: 0,
			},
			{
				label: "菜单",
				value: 1,
			},
			{
				label: "按钮",
				value: 2,
			},
		],
		rules: [
			{
				required: true,
				message: "菜单类型不能为空",
				trigger: "blur",
			},
		],
	},
	{
		label: "菜单图标",
		labelWidth: "80px",
		vModel: "icon",
		placeholder: "菜单图标",
		prop: "icon",
		type: "icon",
		iconOptions: [
			{
				label: "quick官网",
				data: quickIconFont,
			},
		],
		width: "400px",
		select: (val) => {
			formModel.icon = val;
		},
	},
	{
		label: "路由",
		labelWidth: "80px",
		vModel: "path",
		placeholder: "路由",
		width: "400px",
		prop: "path",
	},
	{
		label: "视图",
		labelWidth: "80px",
		vModel: "viewPath",
		placeholder: "视图",
		width: "400px",
		prop: "viewPath",
	},
	{
		label: "排序",
		labelWidth: "80px",
		vModel: "sort",
		placeholder: "排序",
		prop: "sort",
		width: "400px",
	},
	{
		label: "父级菜单",
		labelWidth: "80px",
		vModel: "pId",
		placeholder: "父级菜单",
		type: "tree",
		options: parentTreeList,
		width: "400px",
		prop: "pId",
	},
	{
		label: "是否启用",
		labelWidth: "80px",
		vModel: "enabled",
		placeholder: "是否启用",
		prop: "enabled",
		type: "switch",
		width: "400px",
	},
	{
		label: "是否显示",
		labelWidth: "80px",
		vModel: "status",
		placeholder: "是否显示",
		prop: "status",
		type: "switch",
		width: "400px",
	},
	{
		label: "外链",
		labelWidth: "80px",
		vModel: "link",
		placeholder: "外链",
		prop: "link",
		type: "switch",
		width: "400px",
	},
	{
		label: "链接地址",
		labelWidth: "80px",
		vModel: "linkUrl",
		placeholder: "链接地址",
		width: "400px",
		prop: "linkUrl",
	},
]);
const handleFormSubmit = (form: Menu, done: any) => {
	const row = { ...form };
	if (!row.pId) {
		row.pId = "0";
	}
	if (row.id) {
		updateMenu(row).then(() => {
			ElMessage({
				type: "success",
				message: "菜单修改成功",
			});
			done();
		});
	} else {
		row.id = undefined;
		addMenu(row).then(() => {
			ElMessage({
				type: "success",
				message: "菜单创建成功",
			});
			done();
		});
	}
};
</script>
<template>
	<quick-crud
		:form-inline="true"
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
