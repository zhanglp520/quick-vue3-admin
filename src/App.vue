<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

const locale = ref(en);
const zIndex = ref(1000); //版本：2.3.9当zIndex>=3000时，官方bug
const size = ref("default");
const setColor = (setting: any) => {
    const model = setting.model;
    const defaultColor = setting.color.default;
    const primaryColor = setting.color.primary;
    const infoColor = setting.color.info;
    const successColor = setting.color.success;
    const warningColor = setting.color.warning;
    const dangerColor = setting.color.danger;
    const light = "#ffffff";
    const darkColor = "#000000";
    let mixColor = model === "light" ? light : darkColor;
    const el = document.documentElement;
    el.style.setProperty("--el-color-primary", primaryColor);
    el.style.setProperty("--el-color-info", infoColor);
    el.style.setProperty("--el-success-primary", successColor);
    el.style.setProperty("--el-warning-primary", warningColor);
    el.style.setProperty("--el-danger-primary", dangerColor);
    for (let i = 1; i < 10; i++) {
        el.style.setProperty(
            `--el-color-default-light-${i}`,
            colourBlend(defaultColor, mixColor, i / 10)
        );
        el.style.setProperty(
            `--el-color-default-dark-${i}`,
            colourBlend(defaultColor, mixColor, i / 10)
        );

        el.style.setProperty(
            `--el-color-primary-light-${i}`,
            colourBlend(primaryColor, mixColor, i / 10)
        );
        el.style.setProperty(
            `--el-color-primary-dark-${i}`,
            colourBlend(primaryColor, mixColor, i / 10)
        );

        el.style.setProperty(
            `--el-color-info-light-${i}`,
            colourBlend(infoColor, mixColor, i / 10)
        );
        el.style.setProperty(
            `--el-color-info-dark-${i}`,
            colourBlend(infoColor, mixColor, i / 10)
        );

        el.style.setProperty(
            `--el-color-success-light-${i}`,
            colourBlend(successColor, mixColor, i / 10)
        );
        el.style.setProperty(
            `--el-color-success-dark-${i}`,
            colourBlend(successColor, mixColor, i / 10)
        );

        el.style.setProperty(
            `--el-color-warning-light-${i}`,
            colourBlend(warningColor, mixColor, i / 10)
        );
        el.style.setProperty(
            `--el-color-warning-dark-${i}`,
            colourBlend(warningColor, mixColor, i / 10)
        );

        el.style.setProperty(
            `--el-color-danger-light-${i}`,
            colourBlend(dangerColor, mixColor, i / 10)
        );
        el.style.setProperty(
            `--el-color-danger-dark-${i}`,
            colourBlend(dangerColor, mixColor, i / 10)
        );
    }
    el.style.setProperty(
        "--el-color-default-dark-2",
        colourBlend(defaultColor, mixColor, 0.2)
    );
    el.style.setProperty(
        "--el-color-primary-dark-2",
        colourBlend(primaryColor, mixColor, 0.2)
    );
    el.style.setProperty(
        "--el-color-info-dark-2",
        colourBlend(infoColor, mixColor, 0.2)
    );
    el.style.setProperty(
        "--el-color-success-dark-2",
        colourBlend(successColor, mixColor, 0.2)
    );
    el.style.setProperty(
        "--el-color-warning-dark-2",
        colourBlend(warningColor, mixColor, 0.2)
    );
    el.style.setProperty(
        "--el-color-danger-dark-2",
        colourBlend(dangerColor, mixColor, 0.2)
    );
};
const colourBlend = (c1: string, c2: string, ratio: number) => {
    ratio = Math.max(Math.min(Number(ratio), 1), 0);
    let r1 = parseInt(c1.substring(1, 3), 16);
    let g1 = parseInt(c1.substring(3, 5), 16);
    let b1 = parseInt(c1.substring(5, 7), 16);
    let r2 = parseInt(c2.substring(1, 3), 16);
    let g2 = parseInt(c2.substring(3, 5), 16);
    let b2 = parseInt(c2.substring(5, 7), 16);
    let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    const red = ("0" + (r || 0).toString(16)).slice(-2);
    const green = ("0" + (g || 0).toString(16)).slice(-2);
    const blue = ("0" + (b || 0).toString(16)).slice(-2);
    return "#" + red + green + blue;
};
onMounted(() => {
    const settingStr = localStorage.getItem("setting");
    if (settingStr) {
        const setting = JSON.parse(settingStr);
        zIndex.value = setting.zIndex;
        size.value = setting.size;

        locale.value = setting.lang === "en" ? en : zhCn;
        setColor(setting);
    }
});
</script>

<template>
    <el-config-provider
        :locale="locale"
        :size="size"
        :z-index="zIndex"
    >
        <router-view />
    </el-config-provider>
</template>

<style>
html,
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: visible;
    overflow-x: hidden;
}

#app {
    width: 100%;
    height: 100%;
    background: #f0f2f5;
}
</style>
