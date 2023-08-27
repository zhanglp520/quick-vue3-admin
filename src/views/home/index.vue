<script setup lang="ts">
/**导入第三方库 */
import { onMounted } from "vue";
import * as echarts from "echarts";
import { Tickets } from "@element-plus/icons-vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
// const isOpen = ref(false);
// const dayCountTemp = ref(0);
// const dayCount = ref(0);
// const yesterdayCount = ref(0);
// const weekCount = ref(0);
// const monthCount = ref(0);
const lineOptions = {
    xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
        }
    ]
};
const barOption = {
    xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#83bff6" },
                    { offset: 0.5, color: "#188df0" },
                    { offset: 1, color: "#188df0" }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#2378f7" },
                        { offset: 0.7, color: "#2378f7" },
                        { offset: 1, color: "#83bff6" }
                    ])
                }
            }
            // backgroundStyle: {
            //   color: 'rgba(180, 180, 180, 0.2)',
            // },
        }
    ]
};
const pieOption = {
    title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center"
    },
    tooltip: {
        trigger: "item"
    },
    legend: {
        orient: "vertical",
        left: "left"
    },
    series: [
        {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
                { value: 300, name: "Video Ads" }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        }
    ]
};
const radarOption = {
    title: {
        text: "Basic Radar Chart"
    },
    legend: {
        data: ["Allocated Budget", "Actual Spending"]
    },
    radar: {
        // shape: 'circle',
        // indicator: [
        //     { name: "Sales", max: 6500 },
        //     { name: "Administration", max: 16000 },
        //     { name: "Information Technology", max: 30000 },
        //     { name: "Customer Support", max: 38000 },
        //     { name: "Development", max: 52000 },
        //     { name: "Marketing", max: 25000 }
        // ]
        indicator: [
            { name: "Sales" },
            { name: "Administration" },
            { name: "Information Technology" },
            { name: "Customer Support" },
            { name: "Development" },
            { name: "Marketing" }
        ]
    },
    series: [
        {
            name: "Budget vs spending",
            type: "radar",
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: "Allocated Budget"
                },
                {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: "Actual Spending"
                }
            ]
        }
    ]
};
onMounted(() => {
    const arr = ["myChart1", "myChart2", "myChart3", "myChart4"];
    arr.forEach((element) => {
        let options: any;
        if (element === "myChart1") {
            options = barOption;
        } else if (element === "myChart2") {
            options = radarOption;
        } else if (element === "myChart3") {
            options = pieOption;
        } else if (element === "myChart4") {
            options = lineOptions;
        }
        const dom = document.getElementById(element);
        if (dom) {
            const myChart = echarts.init(dom);
            myChart.setOption(options);
        }
    });
});
</script>

<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div
                            class="item"
                            :style="{
                                backgroundColor: '#67C23A'
                                // backgroundImage: 'linear-gradient(to right, #39A5DA ,#54BAC2)',
                            }"
                        >
                            <div class="title">当日订单数量</div>
                            <div class="number">10</div>
                            <el-icon :size="60">
                                <Tickets />
                            </el-icon>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div
                            class="item"
                            :style="{
                                backgroundColor: '#E6A23C'
                                // backgroundImage: 'linear-gradient(to right, #FC418F ,#c7e5e4)',
                            }"
                        >
                            <div class="title">昨天订单数量</div>
                            <div class="number">50</div>
                            <el-icon :size="60">
                                <Tickets />
                            </el-icon>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div
                            class="item"
                            :style="{
                                backgroundColor: '#409EFF'
                                // backgroundImage: 'linear-gradient(to right, #67C23A ,#c7e5e4)',
                            }"
                        >
                            <div class="title">本周订单数量</div>
                            <div class="number">358</div>
                            <el-icon :size="60">
                                <Tickets />
                            </el-icon>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div
                            class="item"
                            :style="{
                                backgroundColor: '#F56C6C'
                                // backgroundImage: 'linear-gradient(to right, #F56C6C ,#c7e5e4)',
                            }"
                        >
                            <div class="title">本月订单数量</div>
                            <div class="number">1020</div>
                            <el-icon :size="60">
                                <Tickets />
                            </el-icon>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
    <el-row
        :gutter="10"
        class="chart"
    >
        <el-col :span="12">
            <el-card class="box-card">
                <div
                    id="myChart1"
                    :style="{ width: '100%', height: '400px' }"
                ></div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
                <div
                    id="myChart2"
                    :style="{ width: '100%', height: '400px' }"
                ></div>
            </el-card>
        </el-col>
    </el-row>
    <el-row
        :gutter="10"
        class="chart"
    >
        <el-col :span="12">
            <el-card class="box-card">
                <div
                    id="myChart3"
                    :style="{ width: '100%', height: '400px' }"
                ></div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
                <div
                    id="myChart4"
                    :style="{ width: '100%', height: '400px' }"
                ></div>
            </el-card>
        </el-col>
    </el-row>
</template>
<style lang="scss" scoped>
.chart {
    margin-top: 10px;
}

.item {
    position: relative;
    height: 150px;
    color: rgb(255 255 255);
    background-color: rgb(103 194 58);

    .title {
        position: absolute;
        top: 21px;
        left: 31px;
    }

    .number {
        position: absolute;
        top: 75px;
        left: 102px;
        font-size: 40px;
        font-weight: 600;
        cursor: pointer;
    }

    .el-icon {
        position: absolute;
        top: 42px;
        right: 24px;
    }
}
</style>
