<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import ThingSpecificationLanguage from "./components/thingSpecificationLanguage/index.vue";
import ProductInformation from "./components/productInformation/index.vue";
import TopicList from "./components/topicList/index.vue";
// import { IProduct } from "@/types";

const route = useRoute();
const id = ref("");
const activeName = ref("info");

id.value = route.query.id!.toString();
// const product = JSON.parse() as IProduct;
// console.log("产品详情路由传值", route.params);
</script>

<template>
    <el-tabs
        v-model="activeName"
        class="demo-tabs"
    >
        <el-tab-pane
            label="产品信息"
            name="info"
        >
            <ProductInformation :productId="id"></ProductInformation>
        </el-tab-pane>
        <el-tab-pane
            label="主题列表"
            name="toPic"
        >
            <TopicList></TopicList>
        </el-tab-pane>
        <el-tab-pane
            label="物模型数据"
            name="model"
        >
            <ThingSpecificationLanguage
                :productId="id"
            ></ThingSpecificationLanguage>
        </el-tab-pane>
    </el-tabs>
</template>
