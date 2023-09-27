<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { Tickets } from "@element-plus/icons-vue";
import { getQQGroupOrderStatistics } from "@/api/qq/qqGroup";
import { getQQFrendOrderStatistics } from "@/api/qq/qqFrend";
import { useTabStore } from "@/store/modules/tab";
import { useUserStore } from "@/store/modules/user";
import { ITab } from "@/types/tab";
import { IMenu } from "@/types/menu";
import { startSpeak } from "@/utils/speech";

const tabStore = useTabStore();
const userStore = useUserStore();

const permissionMenuList = computed(() => userStore.getPermissionMenuList);

const isOpen = ref(false);
const dayCountTemp1 = ref(0);
const dayCount1 = ref(0);
const dayCountTemp = ref(0);
const dayCount = ref(0);
const yesterdayCount = ref(0);
const weekCount = ref(0);
const monthCount = ref(0);
const dayData = ref([]);
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
            data: dayData.value,
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
            data: dayData.value,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)"
            }
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
        indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 }
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
const noticeMe = () => {
    getQQGroupOrderStatistics().then((res) => {
        const { data: payload } = res;
        const {
            dayOrderNum,
            yesterDayOrderNum,
            weekOrderNum,
            monthOrderNum,
            dayData: day
        } = payload;
        dayCount.value = dayOrderNum;
        yesterdayCount.value = yesterDayOrderNum;
        weekCount.value = weekOrderNum;
        monthCount.value = monthOrderNum;
        dayData.value = day;
    });
    setInterval(() => {
        getQQGroupOrderStatistics().then((res) => {
            const { data: payload } = res;
            const {
                dayOrderNum,
                yesterDayOrderNum,
                weekOrderNum,
                monthOrderNum,
                dayData: day
            } = payload;
            dayCount.value = dayOrderNum;
            yesterdayCount.value = yesterDayOrderNum;
            weekCount.value = weekOrderNum;
            monthCount.value = monthOrderNum;
            dayData.value = day;
            console.log(
                "提醒条件，前面的数量大于后面的则会提醒",
                dayCount.value,
                dayCountTemp.value
            );

            if (dayCount.value > 0 && dayCount.value > dayCountTemp.value) {
                console.log("有新的订单，即将播放音乐");
                dayCountTemp.value = dayCount.value;
                if (isOpen.value) {
                    const myAudio = document.getElementById(
                        "audio"
                    ) as HTMLMediaElement;
                    myAudio.muted = false;
                    myAudio.play();
                }
            }
        });
        getQQFrendOrderStatistics().then((res) => {
            const { data: payload } = res;
            const { dayOrderNum } = payload;
            dayCount1.value = dayOrderNum;
            console.log(
                "提醒条件，前面的数量大于后面的则会提醒",
                dayCount1.value,
                dayCountTemp1.value
            );

            if (dayCount1.value > 0 && dayCount1.value > dayCountTemp1.value) {
                console.log("有新的qq好友消息,即将播放音乐");
                dayCountTemp1.value = dayCount1.value;
                if (isOpen.value) {
                    startSpeak("你有一条新的qq好友消息,请前往查看");
                }
            }
        });
    }, 1000 * 3);
};
const goOrder = () => {
    const menu = permissionMenuList.value.find((x) => x.path === "order");
    if (menu) {
        const { id, menuName, path }: IMenu = menu;
        const tab: ITab = {
            id,
            name: menuName,
            path
        };
        tabStore.setActiveTab(tab);
        // tabStore.addTab(tab)
    }
};

onMounted(() => {
    noticeMe();
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
            <!--此方式，为了解决音视频被浏览器限制的解决方案-->
            <el-switch
                v-model="isOpen"
                active-text="打开提示音"
            />
        </el-col>
    </el-row>
    <audio
        id="audio"
        muted
    >
        <source
            src="/audios/order.mp3"
            type="audio/mpeg"
        />
    </audio>
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
                            <div class="number">
                                <a @click="goOrder">{{ dayCount }}</a>
                            </div>
                            <el-icon :size="60"><Tickets /></el-icon>
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
                            <div class="number">
                                <a @click="goOrder">{{ yesterdayCount }}</a>
                            </div>
                            <el-icon :size="60"><Tickets /></el-icon>
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
                            <div class="number">
                                <a @click="goOrder">{{ weekCount }}</a>
                            </div>
                            <el-icon :size="60"><Tickets /></el-icon>
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
                            <div class="number">
                                <a @click="goOrder">{{ monthCount }}</a>
                            </div>
                            <el-icon :size="60"><Tickets /></el-icon>
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
    <!-- <audio id="audio" autoplay src="public/audios/order.mp3"></audio> -->
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
