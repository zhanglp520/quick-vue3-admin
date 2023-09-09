<script lang="ts" setup>
/**导入第三方库 */
import { reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IActionbar,
    IToolbar,
    IColumn,
    IFormItem,
    IOptions
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { selectTreeFormat } from "@/utils";
import { IAttribute, IDictionary } from "@/types";
import {
    getAttributeList,
    addAttribute,
    deleteAttribute,
    getDictionaryList
} from "@/api/product/physicalModel";

/**
 * 属性
 */
const props = defineProps({
    productId: {
        type: String,
        default: ""
    }
});
const { productId } = toRefs(props);

const loading = ref(false);
const dataList = reactive<Array<IAttribute>>([]);
const dataTypeDicList = reactive<Array<IDictionary>>([]);
const dataTypeList = reactive<Array<IOptions>>([]);

const unitDicList = reactive<Array<IDictionary>>([]);
const unitList = reactive<Array<IOptions>>([]);

/**
 * 表单
 */
const formModel = reactive<IAttribute>({
    identifying: "",
    name: "",
    unit: "",
    read: 0,
    dataType: "",
    json: "",
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
        placeholder: "名称",
        prop: "name",
        rules: [
            {
                required: true,
                message: "名称不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "单位",
        labelWidth: "80px",
        vModel: "unit",
        type: "select",
        prop: "unit",
        placeholder: "单位",
        rules: [
            {
                required: true,
                message: "单位不能为空",
                trigger: "blur"
            }
        ],
        options: unitList
    },
    {
        label: "数据类型",
        labelWidth: "80px",
        vModel: "dataType",
        type: "select",
        placeholder: "读写类型",
        prop: "dataType",
        rules: [
            {
                required: true,
                message: "读写类型不能为空",
                trigger: "blur"
            }
        ],
        options: dataTypeList
    },
    {
        label: "是否只读",
        labelWidth: "80px",
        vModel: "read",
        type: "select",
        placeholder: "是否只读",
        prop: "read",
        rules: [
            {
                required: true,
                message: "只读不能为空",
                trigger: "blur"
            }
        ],
        options: [
            {
                label: "否",
                value: 0
            },
            {
                label: "是",
                value: 1
            }
        ]
    },
    {
        label: "json",
        labelWidth: "80px",
        vModel: "json",
        type: "textarea",
        placeholder: "json"
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

//表单新增按钮
const handleFormSubmit = (form: IAttribute, done: any) => {
    const row = { ...form };
    addAttribute(productId.value, row).then(() => {
        ElMessage({
            type: "success",
            message: "属性创建成功"
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
        label: "单位",
        prop: "unit",
        width: "100",
        format: (row: IAttribute) => {
            const obj = unitDicList.find(
                (x: any) => x.dicId === row.unit.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "数据类型",
        prop: "dataType",
        width: "100",
        format: (row: IAttribute) => {
            const obj = dataTypeDicList.find(
                (x: any) => x.dicId === row.dataType.toString()
            );
            return obj && obj.dicName;
        }
    },
    {
        label: "是否只读",
        prop: "read",
        width: "100",
        format: (row: IAttribute) => {
            if (row.read === 0) {
                return "否";
            }
            if (row.read === 1) {
                return "是";
            }
            return "";
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
const handleDelete = (item: IAttribute, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.name}】的属性吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.identifying) {
            return;
        }
        deleteAttribute(productId.value, item.identifying).then(() => {
            ElMessage({
                type: "success",
                message: "属性删除成功"
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
 * @param param
 */
const loadData = (param: object) => {
    console.log(param);
    loading.value = true;
    getDictionaryList("dataType").then((res: any) => {
        const { data } = res;
        dataTypeDicList.length = 0;
        dataTypeDicList.push(...data);
        const data1 = selectTreeFormat(data, {
            value: "dicId",
            label: "dicName"
        });
        dataTypeList.length = 0;
        dataTypeList.push(...data1);
    });
    getDictionaryList("unit").then((res: any) => {
        const { data } = res;
        unitDicList.length = 0;
        unitDicList.push(...data);
        const data1 = selectTreeFormat(data, {
            value: "dicId",
            label: "dicName"
        });
        unitList.length = 0;
        unitList.push(...data1);
    });
    getAttributeList({
        productId: productId.value
    })
        .then((res: any) => {
            loading.value = false;
            const { data: attributeList, total } = res;
            console.log(total);
            if (attributeList) {
                dataList.length = 0;
                dataList.push(...attributeList);
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
