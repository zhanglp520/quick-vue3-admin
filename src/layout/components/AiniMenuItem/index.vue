<script lang="ts" setup>
import { Ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useTabStore } from "@/store/modules/tab";
import { IMenubar } from "@/types/menu";
import { ITab } from "@/types/tab";

// eslint-disable-next-line no-undef
defineOptions({
    name: "AiniMenuItem"
});

const tabStore = useTabStore();
/**
 * props
 */
const props = defineProps({
    menuList: {
        type: Array<IMenubar>,
        default: () => {
            return [];
        }
    }
});
/**
 * props toRefs
 */
const { menuList } = toRefs(props) as {
    menuList: Ref<Array<IMenubar>>;
};
const menuClick = (item: IMenubar) => {
    const { id, menuName, path, link, linkUrl } = item;
    if (link) {
        window.open(linkUrl);
    } else {
        const routerPath = path;
        const tab: ITab = {
            id,
            name: menuName,
            path: routerPath
        };
        const tabList = tabStore.getTabList;
        if (tabList.length >= 15) {
            ElMessage({
                type: "warning",
                message: "选项卡最多15个，请关闭部分再试"
            });
            return;
        }
        tabStore.addTab(tab);
    }
};
</script>
<template>
    <template
        v-for="item in menuList"
        :key="item.id"
    >
        <template v-if="item.children && item.children.length > 0">
            <el-sub-menu :index="item.id!">
                <template #title>
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.menuName }}</span>
                </template>
                <aini-menu-item :menu-list="item.children"></aini-menu-item>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item
                :index="item.id"
                @click="menuClick(item)"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.menuName }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>
