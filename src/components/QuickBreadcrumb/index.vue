<script lang="ts" setup>
/**导入第三方库 */
import { toRefs } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    }
});
const { data } = toRefs(props);
</script>
<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
            :to="{ path: '/' }"
            :replace="true"
            >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item
            v-for="(item, index) in data"
            :key="index"
        >
            {{ item }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
