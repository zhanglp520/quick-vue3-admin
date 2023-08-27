<script setup lang="ts">
/**导入第三方库 */
import { computed, watch, ref } from "vue";
import { TabPaneName } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

/**导入项目文件 */
import { useAppStore } from "@/store/modules/app";
import { useMenuStore } from "@/store/modules/menu";
import { useTabStore } from "@/store/modules/tab";
import { ITab } from "@/types";
import config from "@/config/index";
import AiniTop from "./components/AiniTop/index.vue";
import AiniSidebar from "./components/AiniSidebar/index.vue";

const router = useRouter();
const appStore = useAppStore();
const menuStore = useMenuStore();

/**
 * 国际化
 */
const { t } = useI18n();
console.log("i18n", t("title"));

const isCollapse = computed(() => appStore.getCollapse);
/**
 * 选项卡
 */
const cache = ref(config.tabCache);
const tabStore = useTabStore();
const editableTabsValue = ref("home");
const editableTabs = ref<Array<ITab>>([]);
const activeTab = computed(() => tabStore.getActiveTab);
const tabList = computed(() => tabStore.getTabList);
const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: "remove" | "add"
): void => {
    if (action === "remove") {
        if (targetName) {
            tabStore.deleteTab(targetName.toString());
        }
    }
};
const handleClick = (activeName: TabPaneName) => {
    const index = tabList.value.findIndex((x) => x.id === activeName);
    if (index !== -1) {
        tabStore.setActiveTab(tabList.value[index]);
        menuStore.setActiveMenuId(activeName.toString());
        editableTabsValue.value = activeName.toString();
    }
};
if (activeTab.value.id) {
    handleClick(activeTab.value.id);
}
const closeAll = () => {
    tabStore.clear();
    menuStore.clear();
    editableTabsValue.value = "home";
};
watch(activeTab, (val) => {
    if (val) {
        const { id, path } = val;
        if (id) {
            editableTabsValue.value = id;
        }
        if (path) {
            router.push(path);
        }
    }
});
watch(tabList, (val) => {
    editableTabs.value = val;
});
</script>

<template>
    <div class="aini-layout">
        <el-container>
            <el-aside :style="{ width: isCollapse ? '70px' : '200px' }">
                <aini-sidebar></aini-sidebar>
            </el-aside>
            <el-container>
                <el-header>
                    <el-card
                        shadow="never"
                        :body-style="{ padding: 0 }"
                    >
                        <aini-top></aini-top>
                    </el-card>
                </el-header>
                <el-main class="content">
                    <el-card
                        shadow="always"
                        :body-style="{ padding: 10, position: 'relative' }"
                    >
                        <el-tooltip
                            class="box-item"
                            effect="light"
                            content="关闭全部"
                            placement="left"
                        >
                            <el-button
                                style="
                                    position: absolute;
                                    top: 30px;
                                    right: 22px;
                                    z-index: 1;
                                "
                                :icon="Close"
                                size="small"
                                @click="closeAll"
                            ></el-button>
                        </el-tooltip>
                        <el-tabs
                            v-model="editableTabsValue"
                            type="card"
                            closable
                            @edit="handleTabsEdit"
                            @tab-change="handleClick"
                        >
                            <el-tab-pane
                                v-for="item in tabList"
                                :key="item.id"
                                :label="item.name"
                                :name="item.id"
                            >
                            </el-tab-pane>
                        </el-tabs>
                        <router-view
                            v-if="cache"
                            v-slot="{ Component }"
                        >
                            <keep-alive>
                                <component :is="Component" />
                            </keep-alive>
                        </router-view>
                        <router-view v-else></router-view>
                    </el-card>
                </el-main>
                <!-- <el-footer>
          <aini-bottom></aini-bottom>
        </el-footer> -->
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.aini-layout {
    height: 100%;
    background: #f0f2f5;

    .content {
        .el-card {
            // height: 100%;
        }
    }
}
</style>
<style>
.el-header {
    height: 50px;
    padding: 0;
}

.el-main {
    /* height: calc(100vh - 60px - 100px); */
    padding: 20px;

    /* overflow: hidden; */
}

.el-container {
    height: 100%;
}

.el-aside {
    width: 200px;
    overflow: hidden;
    background-color: #545c64;
}
</style>
