<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IActionbar,
    IToolbar,
    IColumn,
    IFormItem,
    IOptions
} from "@ainiteam/quick-vue3-ui";

import { selectTreeFormat } from "@/utils";
import { IEvent, IDictionary } from "@/types/physicalModel";
import {
    getEventList,
    addEvent,
    deleteEvent,
    getDictionaryList
} from "@/api/product/physicalModel";

const props = defineProps({
    productId: {
        type: String,
        default: ""
    }
});
const { productId } = toRefs(props);

const loading = ref(false);
const levelDicList = reactive<Array<IDictionary>>([]);
const levelList = reactive<Array<IOptions>>([]);
const dataList = reactive<Array<IEvent>>([]);

/**
 * 表单
 */
const formModel = reactive<IEvent>({
    identifying: "",
    name: "",
    outputParams: "",
    level: "",
    remark: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "标识",
        labelWidth: "80px",
        vModel: "identifying",
        placeholder: "标识",
        prop: "identifying",
        rules: [
            {
                required: true,
                message: "标识不能为空",
                trigger: "blur"
            }
        ]
    },

    {
        label: "名称",
        labelWidth: "80px",
        vModel: "name",
        type: "name",
        placeholder: "名称",
        rules: [
            {
                required: true,
                message: "名称不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "事件级别",
        labelWidth: "80px",
        vModel: "level",
        type: "select",
        prop: "level",
        placeholder: "事件级别",
        rules: [
            {
                required: true,
                message: "事件级别不能为空",
                trigger: "blur"
            }
        ],
        options: levelList
    },
    {
        label: "输入参数",
        labelWidth: "80px",
        vModel: "outputParams",
        type: "textarea",
        prop: "outputParams",
        placeholder: "输入参数"
    },
    {
        label: "描述",
        labelWidth: "80px",
        vModel: "remark",
        placeholder: "描述",
        type: "textarea",
        prop: "remark"
    }
]);
const handleFormSubmit = (form: IEvent, done: any) => {
    const row = { ...form };
    addEvent(productId.value, row).then(() => {
        ElMessage({
            type: "success",
            message: "事件创建成功"
        });
        done();
    });
};

/**
 * 表格
 */
const tableColumns = reactive<Array<IColumn>>([
    {
        width: "50",
        type: "selection"
    },
    {
        width: "60",
        type: "index",
        label: "序号"
    },
    {
        label: "标识",
        prop: "identifying",
        width: "100"
    },
    {
        label: "名称",
        prop: "name",
        width: "100"
    },
    {
        label: "事件级别",
        prop: "level",
        width: "100",
        format: (row: IEvent) => {
            const obj = levelDicList.find(
                (x: any) => x.dicId === row.level.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "描述",
        prop: "remark"
    }
]);

/**
 * 工具栏
 */
const tableToolbar = reactive<IToolbar>({
    addButtonName: "添加",
    hiddenBatchDeleteButton: true,
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: false
});

/**
 * 操作栏
 * @param item
 * @param done
 */
const handleDelete = (item: IEvent, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.name}】的事件吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.identifying) {
            return;
        }
        deleteEvent(productId.value, item.identifying).then(() => {
            ElMessage({
                type: "success",
                message: "事件删除成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 200,
    hiddenEditButton: true
});

/**
 * 加载数据
 */
const loadData = () => {
    loading.value = true;
    getDictionaryList("level").then((res: any) => {
        const { data } = res;
        levelDicList.length = 0;
        levelDicList.push(...data);
        const data1 = selectTreeFormat(data, {
            value: "dicId",
            label: "dicName"
        });
        levelList.length = 0;
        levelList.push(...data1);
    });
    getEventList({
        productId: productId.value
    })
        .then((res: any) => {
            loading.value = false;
            const { data: eventList } = res;
            if (eventList) {
                dataList.length = 0;
                dataList.push(...eventList);
            }
        })
        .catch(() => {
            loading.value = false;
        });
};
</script>
<template>
    <quick-crud
        :form-model="formModel"
        :form-items="formItems"
        :table-data="dataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        @on-form-submit="handleFormSubmit"
        :loading="loading"
        @on-load="loadData"
        @on-delete="handleDelete"
    ></quick-crud>
</template>
