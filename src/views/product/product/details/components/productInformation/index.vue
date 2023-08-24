<script lang="ts" setup>
import { toRefs } from "vue";
import { ElMessage } from "element-plus";
import clipboard3 from "vue-clipboard3";

const props = defineProps({
    productId: String
});
const { productId } = toRefs(props);

const { toClipboard } = clipboard3();

const handleCopy = async (value: string) => {
    debugger;
    try {
        await toClipboard(value);
        ElMessage({
            type: "success",
            message: "复制成功!"
        });
    } catch (err) {
        // console.error(err)
        ElMessage({
            type: "error",
            message: "复制失败"
        });
    }
};
</script>
<template>
    <el-descriptions title="产品信息">
        <el-descriptions-item label="产品名称">网关设备</el-descriptions-item>
        <el-descriptions-item label="产品ID">{{
            productId
        }}</el-descriptions-item>
        <el-descriptions-item label="节点类型">直连设备</el-descriptions-item>
        <el-descriptions-item label="接入协议">MQTT</el-descriptions-item>
        <el-descriptions-item label="数据协议">OneJson</el-descriptions-item>
        <el-descriptions-item label="ProductKey"
            >k00wqyf0ZSP</el-descriptions-item
        >
        <el-descriptions-item label="ProductSecret">
            <el-button
                link
                class="el-button--text"
                @click="handleCopy('456')"
                >复制</el-button
            >
        </el-descriptions-item>
        <el-descriptions-item label="创建时间"
            >2023/07/21 15:50:59</el-descriptions-item
        >
        <el-descriptions-item label="更新时间"
            >2023/07/21 15:50:59</el-descriptions-item
        >
        <el-descriptions-item label="access_key">
            <el-link
                type="primary"
                :underline="false"
                >复制</el-link
            ></el-descriptions-item
        >
        <el-descriptions-item label="所属品类">灯</el-descriptions-item>
        <el-descriptions-item label="数据格式"
            >ICA 标准数据格式（Alink JSON）</el-descriptions-item
        >
        <el-descriptions-item label="数据校验级别">弱校验</el-descriptions-item>
        <el-descriptions-item label="认证方式">设备密钥</el-descriptions-item>
        <el-descriptions-item label="动态注册">已关闭</el-descriptions-item>
        <el-descriptions-item label="状态">开发中</el-descriptions-item>
        <el-descriptions-item label="连网协议">Wi-Fi</el-descriptions-item>
        <el-descriptions-item label="产品描述"></el-descriptions-item>
    </el-descriptions>
</template>
