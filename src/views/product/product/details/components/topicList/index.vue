<script lang="ts" setup>
/**导入第三方库 */
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

/**导入项目文件 */
import modelTheme from "./modelTheme.vue";
import systemTheme from "./systemTheme.vue";
const activeName = ref("systemTheme");

//按钮
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
};
</script>
<template>
    <div>
        <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
        >
            <el-tab-pane
                label="系统主题"
                name="systemTheme"
            >
                <systemTheme></systemTheme>
            </el-tab-pane>
            <el-tab-pane
                label="物模型主题"
                name="physicalModel"
            >
                <modelTheme></modelTheme>
            </el-tab-pane>
            <!-- <el-tab-pane label="自定义主题" name="customTheme">
                <customTheme></customTheme>
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>
