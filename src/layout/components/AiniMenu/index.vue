<script lang="ts" setup name="AiniMenu">
import { computed, watch, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { useMenuStore } from "@/store/modules/menu";
import { useTabStore } from "@/store/modules/tab";
import { IMenubar } from "@/types/menu";
import { ITab } from "@/types/tab";
import AiniMenuItem from "@/layout/components/AiniMenuItem/index.vue";

const appStore = useAppStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const tabStore = useTabStore();

const isCollapse = computed(() => appStore.getCollapse);

const defaultActive = ref("home");
const activeMenuId = computed(() => menuStore.getAciveMenuId);
const menuList = computed(() => userStore.getMenuList);
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const menuClick = (menu: IMenubar) => {
    const { id, menuName, path } = menu;
    const tab: ITab = {
        id,
        name: menuName,
        path,
    };
    tabStore.setActiveTab(tab);
};
const homeMenuClick = () => {
    const menu: IMenubar = {
        id: "home",
        menuId: "home",
        menuName: "首页",
        icon: "",
        sort: 0,
        pId: "0",
        link: 0,
        path: "/home",
        viewPath: "",
        children: [],
    };
    menuClick(menu);
};
watch(activeMenuId, (val: string) => {
    defaultActive.value = val;
});
</script>
<template>
  <!-- :router="true" -->
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :collapse="isCollapse"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/home" :router="true" @click="homeMenuClick">
      <el-icon>
        <component :is="'home-filled'" />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <aini-menu-item :menu-list="menuList"></aini-menu-item>
  </el-menu>
</template>
