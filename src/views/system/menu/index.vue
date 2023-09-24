<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IActionbar,
    IToolbar,
    IFormItem,
    IOptions
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import {
    listToSelectTree,
    listToTableTree,
    validatePermission
} from "@/utils/index";
import "@/assets/iconfont/quickIconFont.js";
import quickIconFont from "@/config/quickIconFont.json";
import { useUserStore } from "@/store/modules/user";
import {
    getMenuList,
    addMenu,
    updateMenu,
    deleteMenu
} from "@/api/system/menu";
import { IMenu, IMenuPermissionButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const tableDataList = reactive<Array<IMenu>>([]);
const parentTreeData = reactive<Array<IOptions>>([]);
const permissionBtn = computed<IMenuPermissionButton>(() => {
    return userStore.getPermissionBtns as IMenuPermissionButton;
});

/**
 * 工具栏
 */
const handleEdit = (item: IMenu, done: any) => {
    const form = { ...item };
    if (item.pId === 0) {
        form.pId = undefined;
    }
    done(form);
};
const handleDetail = (item: IMenu, done: any) => {
    const form = { ...item };
    if (item.pId === 0) {
        form.pId = undefined;
    }
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
const handleDelete = (item: IMenu, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.menuName}】的菜单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        deleteMenu(Number(item.id)).then(() => {
            ElMessage({
                type: "success",
                message: "菜单删除成功"
            });
            done();
        });
    });
};
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
        label: "菜单编号",
        prop: "menuId",
        width: "200"
    },
    {
        label: "菜单名称",
        prop: "menuName",
        width: "200",
        fixed: true
    },
    {
        label: "路由地址",
        prop: "path",
        width: "200"
    },
    {
        label: "视图路径",
        prop: "viewPath",
        width: "200"
    },
    {
        label: "菜单类型",
        prop: "menuType",
        width: "200",
        format: (row: IMenu) => {
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
        }
    },
    {
        label: "菜单图标",
        prop: "icon",
        width: "200"
    },
    {
        label: "菜单排序",
        prop: "sort",
        width: "200"
    },
    {
        label: "缓存",
        prop: "cache",
        width: "200",
        format: (row: IMenu) => {
            return row.cache ? "缓存" : "不缓存";
        }
    },
    {
        label: "显示",
        prop: "status",
        width: "200",
        format: (row: IMenu) => {
            return row.status ? "显示" : "不显示";
        }
    },
    {
        label: "启用",
        prop: "enabled",
        width: "200",
        format: (row: IMenu) => {
            return !row.enabled ? "启用" : "禁用";
        }
    },
    {
        label: "是否外链",
        prop: "link",
        width: "200",
        format: (row: IMenu) => {
            return row.link === 1 ? "外链" : "非外链";
        }
    }
]);

/**
 * 加载父级菜单下拉框
 * @param data 菜单数据
 */
const loadParentMenuData = (data: IMenu[]) => {
    const parentMenuList = data.filter((x: IMenu) => x.menuType !== 2);
    const parentTree = listToSelectTree(parentMenuList, 0, {
        value: "id",
        label: "menuName"
    });
    parentTreeData.length = 0;
    parentTreeData.push(...parentTree);
};

/**
 * 加载数据
 */
const loadData = () => {
    loading.value = true;
    getMenuList().then((res) => {
        loading.value = false;
        const { data: menuList } = res;
        console.log("menuList", menuList);
        loadParentMenuData(menuList);
        const menuTree = listToTableTree(menuList, 0, {
            pId: "pId"
        });
        tableDataList.length = 0;
        tableDataList.push(...menuTree);
    });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "创建菜单",
    edit: "修改菜单",
    detail: "菜单详情"
});
const formModel = reactive<IMenu>({
    id: undefined,
    menuId: "",
    menuName: "",
    path: "",
    viewPath: "",
    menuType: 0,
    icon: "",
    sort: 0,
    pId: undefined,
    link: 0,
    linkUrl: "",
    enabled: true,
    status: true,
    cache: true
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "菜单编号",
        labelWidth: "80px",
        vModel: "menuId",
        placeholder: "请输入菜单编号",
        editReadonly: true,
        prop: "menuId",
        width: "400px",
        rules: [
            {
                required: true,
                message: "请输入菜单编号",
                trigger: "blur"
            }
        ]
    },
    {
        label: "菜单名称",
        labelWidth: "80px",
        vModel: "menuName",
        placeholder: "请输入菜单名称",
        prop: "menuName",
        width: "400px",
        rules: [
            {
                required: true,
                message: "请输入菜单名称",
                trigger: "blur"
            }
        ]
    },
    {
        label: "菜单类型",
        labelWidth: "80px",
        vModel: "menuType",
        placeholder: "请选择菜单类型",
        prop: "menuType",
        type: "select",
        width: "400px",
        options: [
            {
                label: "目录",
                value: 0
            },
            {
                label: "菜单",
                value: 1
            },
            {
                label: "按钮",
                value: 2
            }
        ],
        rules: [
            {
                required: true,
                message: "请选择菜单类型",
                trigger: "change"
            }
        ]
    },
    {
        label: "菜单图标",
        labelWidth: "80px",
        vModel: "icon",
        placeholder: "请选择菜单图标",
        prop: "icon",
        type: "icon",
        iconOptions: [
            {
                label: "quick官网",
                data: quickIconFont
            }
        ],
        width: "400px",
        select: (val) => {
            formModel.icon = val;
        }
    },
    {
        label: "路由地址",
        labelWidth: "80px",
        vModel: "path",
        placeholder: "请输入路由地址",
        width: "400px",
        prop: "path"
    },
    {
        label: "视图路径",
        labelWidth: "80px",
        vModel: "viewPath",
        placeholder: "请输入视图路径",
        width: "400px",
        prop: "viewPath"
    },
    {
        label: "排序",
        labelWidth: "80px",
        vModel: "sort",
        placeholder: "请输入排序",
        prop: "sort",
        width: "400px"
    },
    {
        label: "父级菜单",
        labelWidth: "80px",
        vModel: "pId",
        placeholder: "请选择父级菜单",
        type: "tree",
        options: parentTreeData,
        width: "400px",
        prop: "pId"
    },
    {
        label: "缓存",
        labelWidth: "80px",
        vModel: "cache",
        prop: "cache",
        type: "switch",
        width: "400px"
    },
    {
        label: "启用",
        labelWidth: "80px",
        vModel: "enabled",
        prop: "enabled",
        type: "switch",
        width: "400px"
    },
    {
        label: "显示",
        labelWidth: "80px",
        vModel: "status",
        prop: "status",
        type: "switch",
        width: "400px"
    },
    {
        label: "外链",
        labelWidth: "80px",
        vModel: "link",
        placeholder: "外链",
        prop: "link",
        type: "switch",
        width: "400px"
    },
    {
        label: "链接地址",
        labelWidth: "80px",
        vModel: "linkUrl",
        placeholder: "链接地址",
        width: "400px",
        prop: "linkUrl"
    }
]);
const handleFormSubmit = (form: IMenu, done: any) => {
    const row = { ...form };
    row.pId = form.pId ? form.pId : 0;
    if (row.id) {
        console.log("updateMenu", row);
        updateMenu(row).then(() => {
            ElMessage({
                type: "success",
                message: "菜单修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        console.log("addMenu", row);
        addMenu(row).then(() => {
            ElMessage({
                type: "success",
                message: "菜单创建成功"
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
        :table-data="tableDataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        dialog-titles="dialogTitles"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
        @on-edit="handleEdit"
        @on-detail="handleDetail"
    ></quick-crud>
</template>
