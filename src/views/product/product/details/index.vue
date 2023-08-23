<script lang="ts" setup>
import { ref } from "vue";
import productInformation from "./components/productInformation/index.vue";
import thingSpecificationLanguage from "./components/thingSpecificationLanguage/index.vue";
import topicList from "./components/topicList/index.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = ref("");
const activeName = ref("first");

const handleClick = () => {
    // console.log(tab, event)
};
id.value = route.query.id;
console.log("productId1", id.value);
</script>

<template>
    <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
    >
        <el-tab-pane
            label="产品信息"
            name="first"
        >
            <productInformation :productId="id"></productInformation>
        </el-tab-pane>
        <el-tab-pane
            label="主题列表"
            name="second"
        >
            <topicList></topicList>
        </el-tab-pane>
        <el-tab-pane
            label="物模型数据"
            name="model"
        >
            <thingSpecificationLanguage
                :productId="id"
            ></thingSpecificationLanguage>
        </el-tab-pane>
    </el-tabs>
</template>
