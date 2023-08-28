<script lang="ts" setup>
import { toRefs } from "vue";
import { ITopic, ISpanMethodProps } from "@/types";

const props = defineProps({
    productId: String
});
const { productId } = toRefs(props);

/**
 * 合并行或列
 * @param row 当前行
 * @param column 当前列
 * @param rowIndex 当前行号
 * @param columnIndex 当前列号
 */
const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex
}: ISpanMethodProps) => {
    console.log("column", column);

    if (columnIndex === 0) {
        const filterResult = tableData.filter(
            (arrItem: any) => arrItem.function === row.function
        );
        console.log(filterResult);
        const index = tableData.findIndex(
            (arrItem) => arrItem.function === row.function
        );
        console.log(index);

        if (rowIndex === index) {
            return {
                rowspan: filterResult.length,
                colspan: 1
            };
        } else {
            return {
                rowspan: 0,
                colspan: 0
            };
        }
    }
};

/**
 * 表格
 */
const tableData: ITopic[] = [
    {
        function: "OTA 升级",
        topicClass: `/sys/${productId.value}/{deviceName}/device/report/firmware/upgrade/information`,
        permissions: "发布",
        describe: "设备上报固件升级信息"
    },
    {
        function: "OTA 升级",
        topicClass: `/sys/${productId.value}/{deviceName}/firmware/upgrade/information/down`,
        permissions: "订阅",
        describe: "固件升级信息下行"
    },
    {
        function: "设备标签",
        topicClass: `/sys/${productId.value}/{deviceName}/device/report/label/data`,
        permissions: "订阅",
        describe: "设备上报标签数据"
    },

    {
        function: "设备标签",
        topicClass: `/sys/${productId.value}/{deviceName}/response/label/report`,
        permissions: "发布",
        describe: "平台响应标签上报"
    },
    {
        function: "设备标签",
        topicClass: `/sys/${productId.value}/{deviceName}/device/delete/delete/information`,
        permissions: "订阅",
        describe: "设备删除标签信息"
    },
    {
        function: "时钟同步",
        topicClass: `/sys/${productId.value}/{deviceName}/device/delete/delete/information`,
        permissions: "订阅",
        describe: "NTP 时钟同步请求"
    },
    {
        function: "时钟同步",
        topicClass: "/ext/ntp/k00wqyf0ZSP/${deviceName}/response",
        permissions: "发布",
        describe: "NTP 时钟同步响应"
    },
    {
        function: "设备影子",
        topicClass: `/sys/${productId.value}/{deviceName}/device/shadow/publish`,
        permissions: "发布",
        describe: "设备影子发布"
    },
    {
        function: "设备影子",
        topicClass: `/sys/${productId.value}/{deviceName}/device/receive/shadow/change`,
        permissions: "发布",
        describe: "设备接收影子变更"
    }
];
</script>
<template>
    <div>
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
        >
            <el-table-column
                prop="function"
                label="功能"
                width="120"
            />
            <el-table-column
                prop="topicClass"
                label="Topic类"
                width="600"
            />
            <el-table-column
                prop="permissions"
                label="操作权限"
                width="100"
            />
            <el-table-column
                prop="describe"
                label="描述"
            />
        </el-table>
    </div>
</template>
