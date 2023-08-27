<script lang="ts" setup name="AiniSidebar">
/**导入第三方库 */
import { computed, ref } from "vue";

/**导入项目文件 */
import { useAppStore } from "@/store/modules/app";
import { useTabStore } from "@/store/modules/tab";
import { ITab, IMenubar } from "@/types";
import AiniMenu from "@/layout/components/AiniMenu/index.vue";

const title = ref("quick-vue3-admin");
const tabStore = useTabStore();
const appStore = useAppStore();
const isCollapse = computed(() => appStore.getCollapse);
const goHome = () => {
    const menu: IMenubar = {
        id: "home",
        menuId: "home",
        menuName: "首页",
        icon: "",
        sort: 0,
        pId: 0,
        link: 0,
        path: "/home",
        viewPath: "",
        cache: false,
        children: []
    };
    const { id, menuName, path } = menu;
    const tab: ITab = {
        id: id?.toString(),
        name: menuName,
        path
    };
    tabStore.setActiveTab(tab);
};
</script>

<template>
    <div class="aini-sidebar">
        <div
            class="aini-title"
            @click="goHome"
        >
            <img src="@/assets/logo.png" />
            <h5 v-if="!isCollapse">{{ title }}</h5>
        </div>
        <el-scrollbar style="height: 100%">
            <aini-menu></aini-menu>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.aini-sidebar {
    height: calc(100% - 52px);

    .aini-title {
        display: flex;
        align-items: center;
        height: 48px px;
        padding: 10px 4px 10px 10px;
        padding-left: 7px;
        cursor: pointer;
        background-color: #545c64;
        transition: all 0.2s ease;

        img {
            width: 32px;
            height: 32px;
        }

        h5 {
            padding: 0 10px;
            margin: 0;
            overflow: hidden;
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            text-align: center;
            text-overflow: ellipsis;
            // white-space: nowrap;
        }
    }
}
</style>
<style>
.el-menu {
    border-right: solid 0;
}
</style>
