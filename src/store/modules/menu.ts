import { defineStore } from "pinia";
import { MenuTree } from "@/types/menu";

interface MenuState {
  activeMenuId: string
  permissionMenuTreeList: Array<MenuTree>
}
export const useMenuStore = defineStore("menuStore", {
	state: (): MenuState => {
		return {
			activeMenuId: "home",
			permissionMenuTreeList: [],
		};
	},
	getters: {
		getAciveMenuId(): string {
			return this.activeMenuId;
		},
		getPermissionMenuTreeList(): Array<MenuTree> {
			return this.permissionMenuTreeList;
		},
	},
	actions: {
		setActiveMenuId(activeMenuId: string) {
			this.activeMenuId = activeMenuId;
		},
		clear() {
			this.permissionMenuTreeList = [];
		},
	},
	persist: {
		enabled: true,
	},
});
