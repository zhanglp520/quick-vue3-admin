<script lang="ts">
/**导入第三方库 */
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

/**导入项目文件 */
import pinia from "@/store";
import { useAppStore } from "@/store/modules/app";

export default defineComponent({
    setup() {
        const appStore = useAppStore(pinia);
        const { locale } = useI18n();
        const switchLanguage = (lang: string) => {
            locale.value = lang;
            appStore.setLanguage(lang);
        };
        return {
            switchLanguage
        };
    }
});
</script>

<template>
    <div>
        <el-button
            type="primary"
            @click="switchLanguage('zh')"
            >中文</el-button
        >
        <el-button
            type="primary"
            @click="switchLanguage('en')"
            >英文</el-button
        >
    </div>
</template>
