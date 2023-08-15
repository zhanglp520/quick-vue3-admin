import { defineStore } from "pinia";

interface IAppState {
    language: string;
    isCollapse: boolean;
}

export const useAppStore = defineStore("appState", {
    state: (): IAppState => {
        return {
            language: "zh",
            isCollapse: false
        };
    },
    getters: {
        getLanguage(): string {
            return this.language;
        },
        getCollapse(): boolean {
            return this.isCollapse;
        }
    },
    actions: {
        setLanguage(language: string) {
            this.language = language;
        },
        setCollapse(isCollapse: boolean) {
            this.isCollapse = isCollapse;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "test",
                storage: localStorage,
                paths: ["language"]
            }
        ]
    }
});
