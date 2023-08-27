import { defineStore } from "pinia";
import { ITab } from "@/types";

interface ITabState {
    activeTab: ITab;
    tabList: Array<ITab>;
}
export const useTabStore = defineStore("tabStore", {
    state: (): ITabState => {
        return {
            activeTab: {
                id: "home",
                name: "首页",
                path: "/home"
            },
            tabList: [
                {
                    id: "home",
                    name: "首页",
                    path: "/home"
                }
            ]
        };
    },
    getters: {
        getActiveTab(): ITab {
            return this.activeTab;
        },
        getTabList(): Array<ITab> {
            return this.tabList;
        }
    },
    actions: {
        setActiveTab(tab: ITab) {
            this.activeTab = tab;
        },
        addTab(tab: ITab) {
            const index = this.tabList.findIndex((x) => x.id === tab.id);
            if (index === -1) {
                this.tabList.push(tab);
            }
            this.setActiveTab(tab);
        },
        deleteTab(id: string) {
            if (id !== "home") {
                const index = this.tabList.findIndex((x) => x.id === id);
                const activeTab =
                    this.tabList[index + 1] || this.tabList[index - 1];
                this.setActiveTab(activeTab);
                this.tabList = this.tabList.filter((x) => x.id !== id);
            }
        },
        clear() {
            this.tabList = this.tabList.filter((x) => x.id === "home");
        }
    },
    persist: {
        enabled: true
    }
});
