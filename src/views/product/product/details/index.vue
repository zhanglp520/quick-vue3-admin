<script lang="ts" setup>
/**导入第三方库 */
import { ref } from "vue";
import { useRoute } from "vue-router";

/**导入项目文件 */
import ThingSpecificationLanguage from "./components/thingSpecificationLanguage/index.vue";
import ProductInformation from "./components/productInformation/index.vue";
import TopicList from "./components/topicList/index.vue";
// import { IProduct } from "@/types";

/**
 * 属性
 */
const route = useRoute();
const id = ref("");
const activeName = ref("info");

id.value = route.query.id!.toString();
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
