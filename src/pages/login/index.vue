<script lang="ts" setup>
/**导入第三方库 */
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { UserFilled, Lock } from "@element-plus/icons-vue";

import { ILoginParams } from "@/types";
import { router } from "@/router";
import pinia from "@/store";
import { useAuthStore } from "@/store/modules/auth";
import { useUserStore } from "@/store/modules/user";
/**
 * 属性
 */
const title = ref("quick-vue3-admin");
const loginStore = useAuthStore(pinia);
const userStore = useUserStore(pinia);
const loading = ref(false);
const form = reactive<ILoginParams>({
    tenant: "",
    username: "",
    password: ""
});
/**
 * 函数
 */
const handleLogin = async (): Promise<void> => {
    loading.value = true;
    try {
        await loginStore.login(form);
        const user = await userStore.getUserInfo(loginStore.userName);
        const { id } = user;
        await userStore.getPermission(id!.toString());
        router.push("/");
    } catch (error) {
        console.log("login error", error);
    } finally {
        loading.value = false;
    }
};
const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        handleLogin();
    }
};
onMounted(() => {
    window.addEventListener("keydown", keyDown);
});
onUnmounted(() => {
    window.removeEventListener("keydown", keyDown, false);
});
</script>
<template>
    <div class="login-box">
        <div class="form">
            <el-card shadow="always">
                <div class="item">
                    <div class="tilte">
                        <span>{{ title }}</span>
                    </div>
                </div>
                <div class="item">
                    <el-input
                        v-model="form.username"
                        placeholder="用户名"
                        :prefix-icon="UserFilled"
                        size="large"
                    />
                </div>
                <div class="item">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="密码"
                        show-password
                        :prefix-icon="Lock"
                        size="large"
                    />
                </div>
                <div class="item">
                    <el-button
                        type="primary"
                        size="large"
                        :loading="loading"
                        @click="handleLogin"
                        >登录</el-button
                    >
                </div>
                <div class="test">测试账号密码：admin/123456</div>
            </el-card>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    // background-color: green;
    background: url("@/assets/images/login-bg.jpeg") no-repeat center center;
    // background: url('../images/login-bg.jpeg') no-repeat center center;

    background-size: 100% 100%;
    border-radius: 5px;

    .form {
        align-content: center;
        align-items: center;
        width: 550px;
        height: 400px;
        text-align: center;

        .el-card {
            height: 100%;
            border-radius: 20px;
        }

        .item {
            margin: 20px 0;
        }

        .el-button {
            width: 100%;
        }

        .tilte {
            margin-bottom: 60px;
            font-size: 30px;
        }

        .test {
            color: gray;
            text-align: left;
        }
    }
}
</style>
