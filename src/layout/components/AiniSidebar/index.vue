<script lang="ts" setup name="AiniSidebar">
import { computed, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useTabStore } from "@/store/modules/tab";
import { ITab } from "@/types/tab";
import { IMenubar } from "@/types/menu";
import AiniMenu from "@/layout/components/AiniMenu/index.vue";

const title = ref("quick-admin");
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
    pId: "0",
    link: 0,
    path: "/home",
    viewPath: "",
    children: [],
  };
  const { id, menuName, path } = menu;
  const tab: ITab = {
    id,
    name: menuName,
    path,
  };
  tabStore.setActiveTab(tab);
};
</script>

<template>
	<div class="aini-sidebar">
		<div class="aini-title" @click="goHome">
			<img src="@/assets/logo.png" />
			<h5 v-if="!isCollapse">{{ title }}</h5>
		</div>
		<el-scrollbar style="100%">
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
		padding-left: 7px;
		cursor: pointer;
		transition: all 0.2s ease;
		background-color: #545c64;
		height: 48px px;
		padding: 10px 4px 10px 10px;
		img {
			width: 32px;
			height: 32px;
		}
		h5 {
			text-align: center;
			color: #fff;
			font-weight: 700;
			font-size: 14px;
			margin: 0;
			padding: 0 10px;
			text-overflow: ellipsis;
			overflow: hidden;
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
