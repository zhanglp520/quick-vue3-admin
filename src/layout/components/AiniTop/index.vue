<script setup lang="ts" name="AiniTop">
/**导入第三方库 */
import { ref, computed, onMounted, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    Setting,
    Search,
    Fold,
    ChatDotRound,
    FullScreen,
    Phone
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

/**导入项目文件 */
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { useMenuStore } from "@/store/modules/menu";
import { useTabStore } from "@/store/modules/tab";
import { IMenu, ITab } from "@/types";
import QuickBreadcrumb from "@/components/QuickBreadcrumb/index.vue";
import AiniTheme from "../AiniTheme/index.vue";
// import MyInput from "../MyInput/index.vue";

const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();
const menuStore = useMenuStore();
const tabStore = useTabStore();

const themeVisible = ref(false);
const testInput = ref("");

const isCollapse = computed(() => appStore.getCollapse);
const bredcrumbData = ref<Array<string>>([]);
const userInfo = computed(() => userStore.userInfo);
const permissionMenuList = computed(() => userStore.getPermissionMenuList);
const collapse = () => {
    appStore.setCollapse(!isCollapse.value);
};
const activeMenuId = computed(() => menuStore.getAciveMenuId);

const loginOut = () => {
    ElMessageBox.confirm("你真的要退出系统吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        localStorage.clear();
        sessionStorage.clear();
        router.push("/login");
    });
};
const personalInfo = () => {
    const tab: ITab = {
        id: "PersonalInfo",
        name: "个人资料",
        path: "/personalInfo"
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
    router.push("/personalInfo");
};
const changePassword = () => {
    const tab: ITab = {
        id: "ChangePassword",
        name: "修改密码",
        path: "/changePassword"
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
    router.push("/changePassword");
};
const handleCommand = (cmd: string) => {
    /* eslint-disable indent */
    switch (cmd) {
        case "loginOut":
            loginOut();
            break;
        case "personalInfo":
            personalInfo();
            break;
        case "changePassword":
            changePassword();
            break;
        default:
            break;
    }
};
const formatBredcrumbData = (currentMenuId: any) => {
    bredcrumbData.value = [];
    const menu: IMenu | undefined = permissionMenuList.value.find(
        (x: IMenu) => x.id === currentMenuId
    );
    if (!menu) {
        return;
    }
    const { pId, id } = menu;
    if (id === "home") {
        return;
    }
    bredcrumbData.value.push(menu.menuName);
    const parentMenu: IMenu | undefined = permissionMenuList.value.find(
        (x) => x.id === pId
    );
    if (parentMenu) {
        bredcrumbData.value.push(parentMenu.menuName);
        const parentMenu1: IMenu | undefined = permissionMenuList.value.find(
            (x) => x.id === parentMenu.pId
        );
        if (parentMenu1) {
            bredcrumbData.value.push(parentMenu1.menuName);
        }
    }
    bredcrumbData.value.reverse();
};
const handleSetting = () => {
    themeVisible.value = true;
    testInput.value = "11111111";
};

watch(activeMenuId, (val: string) => {
    formatBredcrumbData(val);
});
onMounted(() => {
    formatBredcrumbData(activeMenuId.value);
});
</script>

<template>
    <div class="aini-top">
        <div class="left">
            <span
                class="test"
                @click="collapse"
            >
                <el-icon>
                    <Fold />
                </el-icon>
            </span>
            <div>
                <quick-breadcrumb :data="bredcrumbData"></quick-breadcrumb>
            </div>
        </div>
        <div class="right">
            <span class="test">
                <el-icon>
                    <Search />
                </el-icon>
            </span>
            <span class="test">
                <el-icon>
                    <ChatDotRound />
                </el-icon>
            </span>
            <span class="test">
                <el-icon>
                    <FullScreen />
                </el-icon>
            </span>
            <span class="test">
                <el-icon>
                    <Phone />
                </el-icon>
            </span>
            <span class="test">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <template v-if="userInfo.avatar">
                            <el-avatar
                                :size="30"
                                :src="userInfo.avatar"
                            >
                            </el-avatar>
                        </template>
                        <template v-else>
                            <el-avatar :size="30">
                                {{ userInfo.userName.charAt(0).toUpperCase() }}
                            </el-avatar>
                        </template>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                :icon="Setting"
                                command="personalInfo"
                            >
                                个人资料
                            </el-dropdown-item>
                            <el-dropdown-item
                                :icon="Setting"
                                command="changePassword"
                            >
                                修改密码
                            </el-dropdown-item>
                            <el-dropdown-item
                                :icon="Setting"
                                command="loginOut"
                            >
                                退出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </span>
            <span class="test">
                <el-icon @click="handleSetting">
                    <Setting />
                </el-icon>
            </span>
        </div>
        <AiniTheme v-model="themeVisible"></AiniTheme>
    </div>
</template>

<style lang="scss" scoped>
.aini-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;

    .test {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 1px 10px 0;
        cursor: pointer;
    }

    .test:hover {
        background-color: #f6f6f6;
    }

    .left {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .right {
        display: flex;
        align-items: center;
        min-width: 180px;
        height: 100%;
    }
}
</style>
