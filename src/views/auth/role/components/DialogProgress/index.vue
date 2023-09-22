<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { ElMessage, ElTree } from "element-plus";

/**导入项目文件 */
import { listToTableTree } from "@/utils";
import {
    getMenuPermission,
    getApiPermission,
    rolePermission
} from "@/api/auth";
import { getMenuList } from "@/api/system/menu";
import { getApiList } from "@/api/system/api";
import { IRole, IApi, IMenuTree } from "@/types";

const emits = defineEmits(["active"]);
const props = defineProps({
    role: {
        type: Object,
        default: () => {
            return {};
        }
    }
});

const { role } = props as {
    role: IRole;
};

const active = ref(1);

/**
 * 授权菜单
 */
const menuTreeRef = ref<InstanceType<typeof ElTree>>();
const menuTreeData = reactive<Array<IMenuTree>>([]);
const menuTreeList = reactive<Array<IMenuTree>>([]);
const menuProps = reactive({
    id: "menuId",
    label: "menuName",
    children: "children"
});

/**
 * 授权接口
 */
const apiTreeRef = ref<InstanceType<typeof ElTree>>();
const apiTreeData = reactive<Array<IApi>>([]);
const apiTreeList = reactive<Array<IApi>>([]);
const menuIds = ref("");
const apiIds = ref("");
const apiProps = reactive({
    id: "id",
    label: "apiName",
    children: "children"
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
        const menuTree = listToTableTree(menuList, 0, {
            pId: "pId"
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
        apiTreeList.length = 0;
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
        if (active.value === 2) {
            const apiIdArr = apiTreeRef.value?.getCheckedKeys(true);
            apiIds.value = apiIdArr ? apiIdArr.join(",") : "";
        } else if (active.value === 3) {
            //TODO:数据权限
        }

        active.value--;
    }
};
const next = () => {
    if (active.value < 3) {
        if (active.value === 1) {
            const menuIdArr = menuTreeRef.value?.getCheckedKeys(true);
            menuIds.value = menuIdArr ? menuIdArr?.join(",") : "";
        } else if (active.value === 2) {
            const apiIdArr = apiTreeRef.value?.getCheckedKeys(true);
            apiIds.value = apiIdArr ? apiIdArr.join(",") : "";
        }

        active.value++;
    }
};
const save = (done: any) => {
    rolePermission({
        roleId: role.id,
        menuIds: menuIds.value,
        apiIds: apiIds.value
    }).then(() => {
        ElMessage({
            type: "success",
            message: "角色授权成功"
        });
        done();
    });
};
defineExpose({
    prev,
    next,
    save
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
    <el-steps
        :active="active"
        finish-status="success"
        simple
    >
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
<style lang="scss" scoped>
.el-tree {
    height: 400px;
    overflow-y: auto;
}
</style>
