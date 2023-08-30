<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import {
    IColumn,
    IActionbar,
    IToolbar,
    IFormItem,
    IPage
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import { getLogPageList } from "@/api/system/log";
import { ILog, ISearchLog, ILogPermissionButton } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<ILog>>([]);
const permissionBtn = computed<ILogPermissionButton>(() => {
    return userStore.getPermissionBtns as ILogPermissionButton;
});

/**
 * 分页
 */
const page = reactive<IPage>({
    current: 1,
    size: 10,
    sizes: [10, 20, 30, 40, 50],
    total: 0
});

/**
 * 搜索
 */
const searchForm = reactive<ISearchLog>({
    startTime: "",
    endTime: "",
    logTime: ""
});
const searchFormItems = reactive<Array<IFormItem>>([
    {
        label: "日志时间",
        vModel: "logTime",
        placeholders: ["开始时间", "结束时间"],
        type: "datetimerange"
    }
]);

/**
 * 工具栏
 */
const tableToolbar = reactive<IToolbar>({
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenAddButton: true,
    hiddenPrintButton: true,
    hiddenBatchDeleteButton: true
});

/**
 * 操作栏
 */
const handleDetail = (item: ILog, done: any) => {
    const form: ILog = { ...item };
    if (form.request) {
        form.request = JSON.stringify(form.request, null, 4);
        done(form);
    }
    if (form.response) {
        form.response = JSON.stringify(form.response, null, 4);
        done(form);
    }
};
const tableActionbar = reactive<IActionbar>({
    width: 60,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenDetailButton: !validatePermission(permissionBtn.value?.detail)
});

/**
 * 表格
 */
const tableColumns = reactive<Array<IColumn>>([
    {
        width: "50",
        type: "selection",
        align: "center"
    },
    {
        label: "日志时间",
        prop: "createTime",
        width: "200"
    },
    {
        label: "IP",
        prop: "ip",
        width: "120"
    },
    {
        label: "耗时（ms）",
        prop: "duration",
        width: "150"
    },
    {
        label: "操作人",
        prop: "operateId",
        width: "200"
    },
    {
        label: "请求类型",
        prop: "request.method",
        width: "100"
    },
    {
        label: "请求接口",
        prop: "request.url"
    }
]);

/**
 * 加载数据
 */
const loadData = (params: any) => {
    let obj = {};
    const { logTime } = params;
    if (logTime) {
        obj = {
            ...params,
            type: 0,
            startTime: logTime[0],
            endTime: logTime[1]
        };
    } else {
        obj = { ...params, type: 0, logTime: null };
    }
    loading.value = true;
    getLogPageList(obj).then((res) => {
        loading.value = false;
        const { data: logList, total } = res;
        console.log("logList", logList);
        if (logList) {
            dataList.length = 0;
            dataList.push(...logList);
        }
        page.total = total;
    });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    detail: "日志详情"
});
const formModel = reactive<ILog>({
    id: undefined,
    type: 1,
    ip: "",
    request: "",
    response: "",
    duration: 0,
    operateId: "",
    createTime: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "编号",
        labelWidth: "80px",
        vModel: "id"
    },
    {
        label: "日志时间",
        labelWidth: "80px",
        vModel: "createTime"
    },
    {
        label: "IP",
        labelWidth: "80px",
        vModel: "ip"
    },
    {
        label: "耗时",
        labelWidth: "80px",
        vModel: "duration"
    },
    {
        label: "操作人ID",
        labelWidth: "80px",
        vModel: "operateId"
    },
    {
        label: "操作人",
        labelWidth: "80px",
        vModel: "operator"
    },
    {
        label: "请求参数",
        labelWidth: "80px",
        vModel: "request",
        type: "textarea"
    },
    {
        label: "响应",
        labelWidth: "80px",
        vModel: "response",
        type: "textarea"
    }
]);
</script>
<template>
    <quick-crud
        :dialog-title="dialogTitle"
        :form-model="formModel"
        :form-items="formItems"
        :table-data="dataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        :search-form-items="searchFormItems"
        :search-form-model="searchForm"
        dialog-titles="dialogTitles"
        :page="page"
        :form-inline="true"
        :loading="loading"
        @on-load="loadData"
        @on-detail="handleDetail"
    ></quick-crud>
</template>
