<script lang="ts" setup name="AiniTheme">
/**导入第三方库 */
import { onMounted, reactive, ref, Ref, toRefs, watch } from "vue";
import { router } from "@/router";
import { ElMessage, ElMessageBox } from "element-plus";
// import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// import en from "element-plus/dist/locale/en.mjs";
import { v4 as uuid } from "uuid";

/**
 * 属性
 */
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
console.log("props", props);
const { modelValue } = toRefs(props) as {
    modelValue: Ref<boolean>;
};
const drawerVisible = ref(false);
const themeName = ref("");
const readonly = ref(true);
const isShow = ref(false);
const language = ref("zh-cn");
// const locale = computed(() => (language.value === "zh-cn" ? zhCn : en));
drawerVisible.value = modelValue.value;
const switchLang = (lang: string) => {
    language.value = lang;
};
const langOptions = [
    {
        label: "英文",
        value: "en"
    },
    {
        label: "中文",
        value: "zh-cn"
    }
];
const themeColorOptions = ref([
    {
        label: "quick",
        value: {
            default: "#fff",
            primary: "#0000FF",
            success: "#00FF00",
            info: "#909399",
            warning: "#FFFF00",
            danger: "#FF0000"
        }
    },
    {
        label: "element",
        value: {
            default: "#fff",
            primary: "#66b1ff",
            success: "#67c23a",
            info: "#909399",
            warning: "#e6a23c",
            danger: "#f56c6c"
        }
    },
    {
        label: "ant",
        value: {
            default: "#fff",
            primary: "#1890ff",
            success: "#52c41a",
            info: "rgba(0, 0, 0, 0.25)",
            warning: "#faad14",
            danger: "#f5222d"
        }
    },
    {
        label: "layui",
        value: {
            default: "#fff",
            primary: "#16baaa",
            success: "#16b777",
            info: "#31bdec",
            warning: "#ffb800",
            danger: "#ff5722"
        }
    }
]);
const themeOptions = ref([
    {
        label: "quick主题",
        value: "quick"
    },
    {
        label: "element主题",
        value: "element"
    },
    {
        label: "ant主题",
        value: "ant"
    },
    {
        label: "layui主题",
        value: "layui"
    },
    {
        label: "自定义主题",
        value: "custom"
    }
]);
const bgthemeOptions = ref([
    {
        label: "政务蓝",
        value: "rgb(41,23,91)"
    },
    {
        label: "中国红",
        value: "rgb(255,0,0)"
    }
]);
const settingForm = reactive({
    lang: "en",
    zIndex: 1000, //>=3000时，官方bug
    namespace: "el",
    size: "default",
    model: "light",
    // button: {
    //   autoInsertSpace: false
    // },
    // message: {
    //   max: 10
    // },
    theme: "element",
    color: {
        default: "#fff",
        primary: "#66b1ff",
        success: "#67c23a",
        info: "#909399",
        warning: "#e6a23c",
        danger: "#f56c6c"
    },
    bgColor: "rgb(41,23,91)"
});
const handleConfim = () => {
    drawerVisible.value = false;
};
const handleClose = () => {
    ElMessageBox.confirm("是否保存配置？", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    })
        .then(() => {
            localStorage.setItem("setting", JSON.stringify(settingForm));
            ElMessage({
                type: "success",
                message: "保存成功"
            });
            emit("update:modelValue", drawerVisible.value);
            router.go(0);
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消"
            });
            router.go(0);
        });
};
const cancelClick = () => {
    ElMessageBox.confirm(
        "重置后，将会丢失你的所有配置，你真的要重置配置吗？",
        "Warning",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    )
        .then(() => {
            localStorage.removeItem("setting");
            ElMessage({
                type: "success",
                message: "重置成功"
            });

            router.go(0);
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消"
            });
            router.go(0);
        });
};
const saveTheme = () => {
    const index = themeOptions.value.findIndex(
        (x) => x.label === themeName.value
    );
    if (index !== -1) {
        ElMessage.error("主题名已占用！");
        return;
    }
    const id = uuid();
    themeColorOptions.value.push({
        label: id,
        value: {
            default: settingForm.color.default,
            primary: settingForm.color.primary,
            success: settingForm.color.success,
            info: settingForm.color.info,
            warning: settingForm.color.warning,
            danger: settingForm.color.danger
        }
    });
    themeOptions.value.unshift({
        label: themeName.value,
        value: id
    });
    ElMessage({
        message: "主题保存成功",
        type: "success"
    });
};
watch(
    () => modelValue.value,
    (val) => {
        drawerVisible.value = val;
    }
);
watch(
    () => settingForm.lang,
    (val) => {
        switchLang(val);
    }
);
watch(
    () => settingForm.theme,
    (val) => {
        if (val === "custom") {
            readonly.value = false;
            isShow.value = true;
        } else {
            readonly.value = true;
            isShow.value = false;
            const arr = themeColorOptions.value.filter((x) => x.label === val);
            if (arr && arr.length === 1) {
                const color = arr[0];
                settingForm.color.default = color.value.default;
                settingForm.color.primary = color.value.primary;
                settingForm.color.info = color.value.info;
                settingForm.color.success = color.value.success;
                settingForm.color.warning = color.value.warning;
                settingForm.color.danger = color.value.danger;
            }
        }
    }
);
// watch(
//   () => settingForm.color,
//   (val) => {
//     if (val === 'custom') {
//       themeOptions.push({
//         label: '',
//         value: ''
//       })
//     }
//   }
// )
const load = () => {
    const settingStr = localStorage.getItem("setting");
    if (!settingStr) {
        localStorage.setItem("setting", JSON.stringify(settingForm));
    } else {
        const obj = JSON.parse(settingStr);
        settingForm.lang = obj.lang;
        settingForm.size = obj.size;
        settingForm.model = obj.model;
        settingForm.theme = obj.theme;
        settingForm.color.default = obj.color.default;
        settingForm.color.primary = obj.color.primary;
        settingForm.color.info = obj.color.info;
        settingForm.color.success = obj.color.success;
        settingForm.color.warning = obj.color.warning;
        settingForm.color.danger = obj.color.danger;
        settingForm.bgColor = obj.bgColor;
    }
};
onMounted(() => {
    console.log("onMounted");
    load();
});
</script>
<template>
    <el-drawer
        :append-to-body="true"
        :close-on-click-modal="false"
        v-model="drawerVisible"
        title="系统配置"
        direction="rtl"
        @closed="handleClose"
    >
        <el-form
            :model="settingForm"
            label-width="120px"
        >
            <el-form-item label="语言">
                <el-select
                    v-model="settingForm.lang"
                    placeholder="请选择主题"
                >
                    <el-option
                        v-for="item in langOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="大小">
                <el-radio-group v-model="settingForm.size">
                    <el-radio label="large">大</el-radio>
                    <el-radio label="default">中</el-radio>
                    <el-radio label="small">小</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-radio-group v-model="settingForm.model">
                    <el-radio label="light">亮色</el-radio>
                    <el-radio label="dark">暗色</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="主题">
                <el-select
                    v-model="settingForm.theme"
                    placeholder="请选择主题"
                >
                    <el-option
                        v-for="item in themeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="默认颜色">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            :readonly="readonly"
                            v-model="settingForm.color.default"
                            placeholder="请输入默认颜色"
                        >
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button
                            :color="settingForm.color.default"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="主要颜色">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            :readonly="readonly"
                            v-model="settingForm.color.primary"
                            placeholder="请输入主要颜色"
                        >
                        </el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button
                            :color="settingForm.color.primary"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="成功颜色">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            :readonly="readonly"
                            v-model="settingForm.color.success"
                            placeholder="请输入成功颜色"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button
                            :color="settingForm.color.success"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="信息颜色">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            :readonly="readonly"
                            v-model="settingForm.color.info"
                            placeholder="请输入信息颜色"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button :color="settingForm.color.info"></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="警告颜色">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            :readonly="readonly"
                            v-model="settingForm.color.warning"
                            placeholder="请输入警告颜色"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button
                            :color="settingForm.color.warning"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="危险颜色">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            :readonly="readonly"
                            v-model="settingForm.color.danger"
                            placeholder="请输入危险颜色"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button
                            :color="settingForm.color.danger"
                        ></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item
                label="新主题名称"
                v-if="isShow"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            v-model="themeName"
                            placeholder="请输入新的主题名称"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-button
                            type="primary"
                            @click="saveTheme"
                            >保存到主题</el-button
                        >
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="皮肤">
                <el-select
                    v-model="settingForm.bgColor"
                    placeholder="请选择皮肤"
                >
                    <el-option
                        v-for="item in bgthemeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">重置</el-button>
                <el-button
                    type="primary"
                    @click="handleConfim"
                    >保存</el-button
                >
            </div>
        </template>
    </el-drawer>
</template>
