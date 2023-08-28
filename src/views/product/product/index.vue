<script lang="ts" setup>
/**导入第三方库 */
import { ref } from "vue";

import CardList from "./component/CardList/index.vue";
import Crud from "./component/Crud/index.vue";

//切换按钮
const switchButton = ref(false);

const handleswitch = (val: boolean) => {
    switchButton.value = val;
};
</script>
<template>
    <el-switch
        @change="handleswitch"
        v-model="switchButton"
        class="mb-2"
        active-text="表格"
        inactive-text="卡片"
    />
    <Crud v-if="switchButton"></Crud>
    <CardList v-else></CardList>
</template>
