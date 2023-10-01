<script lang="ts" setup>
/**导入第三方库 */
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox, UploadProps } from "element-plus";
import {
    IColumn,
    IFormItem,
    IPage,
    IActionbar,
    IToolbar,
    IOptions
} from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { selectFormat, validatePermission } from "@/utils";
import { useAuthStore } from "@/store/modules/auth";
import { useUserStore } from "@/store/modules/user";
import {
    getOrderPageList,
    addOrder,
    updateOrder,
    deleteOrder,
    batchDeleteOrder,
    getDictionaryList
} from "@/api/order/order";
import {
    ISearchOrder,
    IOrder,
    IOrderPermissionButton,
    IDictionary
} from "@/types";

/**
 * 属性
 */
const loginStore = useAuthStore();
const userStore = useUserStore();
const loading = ref(false);
const tableDataList = reactive<Array<IOrder>>([]);

const orderDic = reactive<Array<IDictionary>>([]);
const orderStatusSelectData = reactive<Array<IOptions>>([]);

const permissionBtn = computed<IOrderPermissionButton>(() => {
    return userStore.getPermissionBtns as IOrderPermissionButton;
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
const searchForm = reactive<ISearchOrder>({
    keyword: ""
});
const searchFormItems = reactive<Array<IFormItem>>([
    {
        label: "",
        vModel: "keyword",
        placeholder: "订单名|手机号"
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
        batchDeleteOrder(ids).then(() => {
            ElMessage({
                type: "success",
                message: "订单删除成功"
            });
            done();
        });
    });
};

const tableToolbar = reactive<IToolbar>({
    hiddenBatchDeleteButton: !validatePermission(
        permissionBtn.value?.batchDelete
    ),
    hiddenImportButton: !validatePermission(permissionBtn.value?.import),
    hiddenExportButton: !validatePermission(permissionBtn.value?.export),
    hiddenAddButton: !validatePermission(permissionBtn.value?.add),
    hiddenPrintButton: !validatePermission(permissionBtn.value?.print)
});

/**
 * 操作栏
 */
const handleDelete = (item: IOrder, done: any) => {
    ElMessageBox.confirm(`你真的删除【${item.orderName}】的订单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        deleteOrder(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "订单删除成功"
            });
            done();
        });
    });
};

const tableActionbar = reactive<IActionbar>({
    width: 300,
    hiddenEditButton: !validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn.value?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn.value?.detail)
});

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
        width: "100",
        label: "状态",
        prop: "status",
        format: (row: IOrder) => {
            const obj = orderDic.find((x: IDictionary) => x.id === row.status);
            return obj && obj.dicName;
        }
    },
    {
        width: "150",
        label: "订单编号",
        prop: "orderId"
    },
    {
        width: "100",
        label: "订单名称",
        prop: "orderName"
    },
    // {
    //     width: "100",
    //     label: "订单图片",
    //     prop: "imgUrl"
    // },
    // {
    //     width: "120",
    //     label: "订单介绍",
    //     prop: "intro"
    // },
    {
        width: "200",
        label: "交付时间",
        prop: "deliveryTime",
        format: (row: IOrder) => {
            return row.deliveryTime;
        }
    },
    {
        width: "180",
        label: "创建时间",
        prop: "createTime"
    },
    {
        label: "备注",
        prop: "remark"
    }
]);

/**
 * 加载订单下拉框数据
 */
const loadSelectData = () => {
    getDictionaryList("orderStatus").then((res) => {
        const { data: orderStatusList } = res;
        orderDic.length = 0;
        orderDic.push(...orderStatusList);
        const data1 = selectFormat(orderStatusList, {
            value: "id",
            label: "dicName"
        });
        orderStatusSelectData.length = 0;
        orderStatusSelectData.push(...data1);
    });
};

/**
 * 加载数据
 */
const loadData = (parmas: object) => {
    loadSelectData();
    loading.value = true;
    getOrderPageList(parmas)
        .then((res) => {
            loading.value = false;
            const { data: orderList, total } = res;
            console.log("orderList", orderList);
            if (orderList) {
                tableDataList.length = 0;
                tableDataList.push(...orderList);
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
    add: "添加订单",
    edit: "编辑订单",
    detail: "订单详情"
});

const formModel = reactive<IOrder>({
    id: undefined,
    orderId: "",
    orderName: "ssss",
    intro: "fffff",
    imgUrl: "ddd",
    deliveryTime: "",
    remark: "sss"
});
const handleAvatarSuccess: UploadProps["onSuccess"] = (
    response,
    uploadFile
) => {
    console.log("handleAvatarSuccess", response);
    formModel.imgUrl = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    if (rawFile.type !== "image/jpeg") {
        ElMessage.error("Avatar picture must be JPG format!");
        return false;
    }
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
        return false;
    }
    return true;
};
const formItems = reactive<Array<IFormItem>>([
    {
        label: "订单编号",
        labelWidth: "80px",
        vModel: "orderId",
        editReadonly: true,
        placeholder: "请输入订单编号",
        prop: "orderId",
        addHidden: true,
        editDisabled: true
    },
    {
        label: "订单名称",
        labelWidth: "80px",
        vModel: "orderName",
        placeholder: "请输入订单名称",
        prop: "orderName",
        rules: [
            {
                required: true,
                message: "请输入订单名称",
                trigger: "blur"
            }
        ]
    },
    {
        label: "简介",
        labelWidth: "80px",
        vModel: "intro",
        placeholder: "请输入简介",
        prop: "intro",
        type: "textarea",
        rules: [
            {
                required: true,
                message: "请输入简介",
                trigger: "blur"
            }
        ]
    },
    {
        label: "图片",
        labelWidth: "80px",
        vModel: "imgUrl",
        // placeholder: "请输入姓名",
        prop: "imgUrl",
        type: "avatar",
        actionUrl: `${
            import.meta.env.VITE_APP_BASE_URL
        }/api/v2/uploads/uploadFile`,
        headers: {
            authorization: `Bearer ${loginStore.getAccessToken}`
        },
        success: handleAvatarSuccess,
        beforeUpload: beforeAvatarUpload,
        rules: [
            {
                required: true,
                message: "请选择订单图片",
                trigger: "change"
            }
        ]
    },
    {
        label: "订单状态",
        labelWidth: "80px",
        vModel: "status",
        placeholder: "请选择订单状态",
        type: "select",
        options: orderStatusSelectData
    },
    {
        label: "交付时间",
        labelWidth: "80px",
        vModel: "deliveryTime",
        placeholders: ["请选择交付时间", "请选择交付时间"],
        prop: "deliveryTime",
        type: "datetimerange",
        rules: [
            {
                required: true,
                message: "请选择交付时间",
                trigger: "change"
            }
        ]
    },
    {
        label: "备注",
        labelWidth: "80px",
        vModel: "remark",
        placeholder: "请输入备注",
        type: "textarea",
        prop: "remark"
    }
]);
const handleFormSubmit = (form: IOrder, done: any) => {
    const row = { ...form };
    if (row.id) {
        console.log("updateOrder", row);
        updateOrder(row).then(() => {
            ElMessage({
                type: "success",
                message: "订单修改成功"
            });
            done();
        });
    } else {
        row.id = undefined;
        row.orderId = undefined;
        row.deliveryTime = form.deliveryTime ? form.deliveryTime[0] : "";
        console.log("addOrder", row);
        addOrder(row).then(() => {
            ElMessage({
                type: "success",
                message: "订单创建成功"
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
    ></quick-crud>
</template>
