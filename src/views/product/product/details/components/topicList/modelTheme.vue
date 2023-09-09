<script lang="ts" setup>
/**导入第三方库 */
import { toRefs } from "vue";

/**导入项目文件 */
import { ITopic, ISpanMethodProps } from "@/types";

/**
 * 属性
 */
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
    console.log("column", column, rowIndex);
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
        function: "属性上报",
        topicClass: `/pm/${productId.value}/{deviceName}/attribute/report`,
        permissions: "发布",
        describe: "设备属性上报"
    },
    {
        function: "属性上报",
        topicClass: `/pm/${productId.value}/{deviceName}/attribute/report/response`,
        permissions: "订阅",
        describe: "平台响应属性上报"
    },
    {
        function: "属性设置",
        topicClass: `/pm/${productId.value}/{deviceName}/attribute/set`,
        permissions: "订阅",
        describe: "设备属性设置"
    },

    {
        function: "事件上报",
        topicClass: `/pm/${productId.value}/{deviceName}/event/report`,
        permissions: "发布",
        describe: "设备事件上报"
    },
    {
        function: "事件上报",
        topicClass: `/pm/${productId.value}/{deviceName}/event/report/response`,
        permissions: "订阅",
        describe: "平台响应事件上报"
    },
    {
        function: "服务调用",
        topicClass: `/pm/${productId.value}/{deviceName}/service/call`,
        permissions: "订阅",
        describe: "设备服务调用"
    },
    {
        function: "服务调用",
        topicClass: `/pm/${productId.value}/{deviceName}/service/call/response`,
        permissions: "发布",
        describe: "设备端平台服务调用"
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
