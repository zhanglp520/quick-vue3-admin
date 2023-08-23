<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import attribute from "./attribute.vue";
// import function from "./function.vue";
// import function from "./function.vue";
import func from "./func.vue";
import event from "./event.vue";

const props = defineProps({
    productId: String
});
const activeName = ref("attribute");
const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event)
    console.log(tab, event);
};
console.log("productId", props.productId);

// props.productId
</script>
<template>
    <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
    >
        <el-tab-pane
            label="属性定义"
            name="attribute"
        >
            <attribute :productId="productId"></attribute>
        </el-tab-pane>
        <el-tab-pane
            label="服务定义"
            name="func"
        >
            <func :productId="productId"></func>
        </el-tab-pane>
        <el-tab-pane
            label="事件定义"
            name="event"
        >
            <event :productId="productId"></event>
        </el-tab-pane>
    </el-tabs>
</template>
<style scoped>
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    min-height: 36px;
    border-radius: 4px;
}
</style>
