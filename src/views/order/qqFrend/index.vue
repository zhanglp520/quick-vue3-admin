<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    IColumn,
    IFormItem,
    IPage,
    IActionbar,
    IToolbar
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { useUserStore } from "@/store/modules/user";
import {
    getQQFrendPageList,
    addQQFrend,
    updateQQFrend,
    deleteQQFrend,
    batchDeleteQQFrend,
    excuteOrder,
    batchExcuteOrder
} from "@/api/order/qqFrend";
import { ISearchQQFrend, IQQFrend, IQQFrendPermissionButton } from "@/types";

/**
 * 属性
 */

const userStore = useUserStore();
const loading = ref(false);
const tableDataList = reactive<Array<IQQFrend>>([]);

const permissionBtn = computed<IQQFrendPermissionButton>(() => {
    return userStore.getPermissionBtns as IQQFrendPermissionButton;
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
const searchForm = reactive<ISearchQQFrend>({
    orderId: "",
    keyword: "",
    content: "",
    status: ""
});
const searchFormItems = reactive<Array<IFormItem>>([
    {
        label: "订单编号",
        vModel: "orderId",
        placeholder: "订单编号"
    },
    {
        label: "关键字",
        vModel: "keyword",
        placeholder: "关键字"
    },
    {
        label: "状态",
        vModel: "status",
        type: "select",
        options: [
            {
                label: "未处理",
                value: "0"
            },
            {
                label: "已处理",
                value: "1"
            }
        ],
        placeholder: "状态"
    }
]);

/**
 * 工具栏
 */
const handleBatchDelete = (data: any, done: any) => {
    const { ids } = data;
    ElMessageBox.confirm("你真的删除选择的订单吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        batchDeleteQQFrend(ids).then(() => {
            ElMessage({
                type: "success",
                message: "qq群订单删除成功"
            });
            done();
        });
    });
};

const handleBatchExcute = (data: any, done: any) => {
    const { ids } = data;
    ElMessageBox.confirm(`你真的处理选择的订单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        batchExcuteOrder(ids).then(() => {
            ElMessage({
                type: "success",
                message: "qq群订单处理成功"
            });
            done();
        });
    });
};
const handleDetail = (item: IQQFrend, done: any) => {
    const form = { ...item };
    form.content = JSON.stringify(JSON.parse(form.content), null, 8);
    done(form);
};
const tableToolbar = reactive<IToolbar>({
    hiddenImportButton: true,
    hiddenExportButton: true,
    hiddenPrintButton: true,
    hiddenAddButton: true,
    btns: [
        {
            name: "批量处理",
            hidden: !validatePermission(permissionBtn.value.batchExcute),
            click(data: any, done: any) {
                handleBatchExcute(data, done);
            }
        }
    ]
});

/**
 * 操作栏
 */
const handleDelete = (item: IQQFrend, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.orderId}】的订单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteQQFrend(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "qq群订单删除成功"
            });
            done();
        });
    });
};
const handleExcute = (item: IQQFrend, done: any) => {
    ElMessageBox.confirm(`你真的处理【${item.orderId}】的订单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        excuteOrder(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "qq群订单处理成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 200,
    hiddenEditButton: true,
    btns: [
        {
            name: "处理",
            position: "left",
            hidden: !validatePermission(permissionBtn.value.excute),
            click(item: any, done: any) {
                handleExcute(item, done);
            },
            render(row: any) {
                return !(row.status === 1);
            }
        }
    ]
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
        label: "下单时间",
        prop: "createTime",
        width: "180",
        align: "center"
    },
    {
        label: "状态",
        prop: "status",
        width: "100",
        align: "center",
        format: (row: IQQFrend) => {
            return row.status === 1 ? "已处理" : "未处理";
        }
    },
    {
        label: "编号",
        prop: "id",
        width: "100",
        align: "center"
    },
    {
        label: "订单编号",
        prop: "orderId",
        width: "200",
        align: "center"
    },
    {
        label: "订单消息",
        prop: "content",
        width: "200",
        align: "center",
        format: (row: IQQFrend) => {
            const obj = JSON.parse(row.content);
            return obj && obj.raw_message;
        }
    },

    {
        label: "我的QQ",
        prop: "content",
        width: "200",
        align: "center",
        slot: true,
        type: "link",
        format: (row: IQQFrend) => {
            const obj = JSON.parse(row.content);
            return obj && obj.self_id;
        }
    },
    {
        label: "QQ号",
        prop: "content",
        width: "200",
        align: "center",
        slot: true,
        type: "link",
        format: (row: IQQFrend) => {
            const obj = JSON.parse(row.content);
            return obj && obj.sender && obj.sender.user_id;
        }
    },
    {
        label: "QQ昵称",
        prop: "content",
        width: "100",
        align: "center",
        format: (row: IQQFrend) => {
            const obj = JSON.parse(row.content);
            return obj && obj.sender && obj.sender.nickname;
        }
    }
    // {
    //     label: "内容",
    //     prop: "content",
    //     width: "200"
    // },
    // {
    //     label: "备注",
    //     prop: "remark"
    // }
]);

/**
 * 加载数据
 */
const loadData = (parmas: object) => {
    loading.value = true;
    getQQFrendPageList(parmas)
        .then((res) => {
            loading.value = false;
            const { data: qqFrendList, total } = res;
            console.log("qqFrendList", qqFrendList);
            if (qqFrendList) {
                tableDataList.length = 0;
                tableDataList.push(...qqFrendList);
            }
            page.total = total;
        })
        .catch(() => {
            loading.value = false;
        });
};

/**
 * 表单
 */
const dialogTitle = reactive({
    add: "添加qq群",
    edit: "编辑qq群",
    detail: "qq群详情"
});
const formModel = reactive<IQQFrend>({
    id: undefined,
    orderId: "",
    keyword: "",
    content: "",
    remark: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "订单编号",
        labelWidth: "80px",
        vModel: "orderId",
        editReadonly: true,
        placeholder: "订单编号",
        prop: "orderId",
        rules: [
            {
                required: true,
                message: "订单编号不能为空",
                trigger: "blur"
            }
        ]
    },
    {
        label: "内容",
        labelWidth: "80px",
        vModel: "content",
        placeholder: "内容",
        type: "textarea",
        editHidden: true,
        prop: "content",
        rules: [
            {
                required: true,
                message: "内容不能为空",
                trigger: "blur"
            }
        ]
    }
    // {
    //     label: "备注",
    //     labelWidth: "80px",
    //     vModel: "remark",
    //     placeholder: "备注",
    //     type: "textarea"
    // }
]);
const handleFormSubmit = (form: IQQFrend, done: any) => {
    const row = { ...form };
    if (row.id) {
        console.log("updateQQFrend", row);
        updateQQFrend(row).then(() => {
            ElMessage({
                type: "success",
                message: "qq群修改成功"
            });
            done();
        });
    } else {
        console.log("addQQFrend", row);
        addQQFrend(row).then(() => {
            ElMessage({
                type: "success",
                message: "qq群创建成功"
            });
            done();
        });
    }
};
</script>
<template>
    <quick-crud
        :dialog-title="dialogTitle"
        :form-model="formModel"
        :form-items="formItems"
        :table-data="tableDataList"
        :table-columns="tableColumns"
        :table-actionbar="tableActionbar"
        :table-toolbar="tableToolbar"
        :search-form-items="searchFormItems"
        :search-form-model="searchForm"
        dialog-titles="dialogTitles"
        :page="page"
        :loading="loading"
        @on-load="loadData"
        @on-form-submit="handleFormSubmit"
        @on-delete="handleDelete"
        @on-batch-delete="handleBatchDelete"
        @on-detail="handleDetail"
    ></quick-crud>
</template>
