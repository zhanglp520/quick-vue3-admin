import { defineStore } from "pinia";
import { IMenuTree } from "@/types";

interface IMenuState {
    activeMenuId: string;
    permissionMenuTreeList: Array<IMenuTree>;
}
export const useMenuStore = defineStore("menuStore", {
    state: (): IMenuState => {
        return {
            activeMenuId: "home",
            permissionMenuTreeList: []
        };
    },
    getters: {
        getAciveMenuId(): string {
            return this.activeMenuId;
        },
        getPermissionMenuTreeList(): Array<IMenuTree> {
            return this.permissionMenuTreeList;
        }
    },
    actions: {
        setActiveMenuId(activeMenuId: string) {
            this.activeMenuId = activeMenuId;
        },
        clear() {
            this.permissionMenuTreeList = [];
        }
    },
    persist: {
        enabled: true
    }
});
