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
import * as XLSX from "xlsx";

/**导入项目文件 */
import { validatePermission } from "@/utils";
import { downloadExcel, exportExcel } from "@/utils/download";
import { useAuthStore } from "@/store/modules/auth";
import { useOrderStore } from "@/store/modules/order";
import {
    exportOrder,
    getOrderPageList,
    addOrder,
    updateOrder,
    deleteOrder,
    batchDeleteOrder,
    resetOrderPassword,
    enableOrder,
    disableOrder,
    downloadFileStream
} from "@/api/system/order";
import { ISearchOrder, IOrder, IOrderPermissionButton } from "@/types";

/**
 * 属性
 */
const loginStore = useAuthStore();
const orderStore = useOrderStore();
const loading = ref(false);
const tableDataList = reactive<Array<IOrder>>([]);
const uploadRef = ref<HTMLElement | null>(null);
const permissionBtn = computed<IOrderPermissionButton>(() => {
    return orderStore.getPermissionBtns as IOrderPermissionButton;
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
const handleExport = () => {
    exportOrder().then((res) => {
        downloadExcel(res, "订单列表");
    });
};
const handlePrint = () => {
    window.print();
};
const changeFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary", cellDates: true });
        const wsname = workbook.SheetNames[0];
        const outdata = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        console.log(outdata, "outdata");
    };
};
const tableToolbar = reactive<IToolbar>({
    importButtonName: "导入（默认后端方式）",
    exportButtonName: "导出（默认后端方式）",
    hiddenBatchDeleteButton: !validatePermission(
        permissionBtn.value?.batchDelete
    ),
    hiddenImportButton: !validatePermission(permissionBtn.value?.import),
    hiddenExportButton: !validatePermission(permissionBtn.value?.export),
    hiddenAddButton: !validatePermission(permissionBtn.value?.add),
    hiddenPrintButton: !validatePermission(permissionBtn.value?.print),
    position: "right",
    btns: [
        {
            name: "下载模板(浏览器下载方式)",
            position: "left",
            type: "warning",
            hidden: !validatePermission(permissionBtn.value?.download),
            click() {
                window.location.href = `${
                    import.meta.env.VITE_APP_BASE_URL
                }/api/v2/downloads?filePath=templates/订单模板.xlsx`;
            }
        },
        {
            name: "下载模板(流文件方式)",
            position: "left",
            type: "success",
            hidden: !validatePermission(permissionBtn.value?.download),
            click() {
                downloadFileStream("templates/订单模板.xlsx").then((res) => {
                    downloadExcel(res, "订单导入模板");
                });
            }
        },
        {
            name: "导入(前端方式)",
            position: "left",
            type: "warning",
            hidden: !validatePermission(permissionBtn.value?.import),
            click() {
                const fileBtn = uploadRef.value as HTMLInputElement;
                fileBtn.click();
            }
        },
        {
            name: "导出(前端方式)",
            position: "left",
            type: "danger",
            hidden: !validatePermission(permissionBtn.value?.export),
            click() {
                // 导出的字段映射
                const columns = [
                    {
                        label: "编号",
                        value: "id"
                    },
                    {
                        label: "订单编号",
                        value: "orderId"
                    },
                    {
                        label: "订单名",
                        value: "orderName"
                    },
                    {
                        label: "姓名",
                        value: "fullName"
                    },
                    {
                        label: "手机号",
                        value: "phone"
                    },
                    {
                        label: "邮箱",
                        value: "email"
                    },
                    {
                        label: "地址",
                        value: "address"
                    }
                ];
                exportExcel(tableDataList, "订单列表", columns);
            }
        }
    ]
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
const handleResetPassword = (item: IOrder, done: any) => {
    ElMessageBox.confirm(
        `你真的重置【${item.orderName}】订单的密码吗？`,
        "警告",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        if (!item.id) {
            return;
        }
        resetOrderPassword(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "置订单密码重成功"
            });
            done();
        });
    });
};
const handleEnable = (item: IOrder, done: any) => {
    ElMessageBox.confirm(`你真的启用【${item.orderName}】的订单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        enableOrder(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "订单启用成功"
            });
            done();
        });
    });
};
const handleDisable = (item: IOrder, done: any) => {
    ElMessageBox.confirm(`你真的禁用【${item.orderName}】的订单吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(() => {
        if (!item.id) {
            return;
        }
        disableOrder(item.id).then(() => {
            ElMessage({
                type: "success",
                message: "订单禁用成功"
            });
            done();
        });
    });
};
const tableActionbar = reactive<IActionbar>({
    width: 300,
    hiddenEditButton: !validatePermission(permissionBtn.value?.edit),
    hiddenDeleteButton: !validatePermission(permissionBtn.value?.delete),
    hiddenDetailButton: !validatePermission(permissionBtn.value?.detail),
    btns: [
        {
            name: "重置密码",
            hidden: !validatePermission(permissionBtn.value?.resetPassword),
            click(item: IOrder, done: any) {
                handleResetPassword(item, done);
            }
        },
        {
            name: "启用",
            hidden: !validatePermission(permissionBtn.value?.enabled),
            click(item: IOrder, done: any) {
                handleEnable(item, done);
            },
            render(row: IOrder) {
                return row.enabled === 0;
            }
        },
        {
            name: "禁用",
            hidden: !validatePermission(permissionBtn.value?.disabled),
            click(item: IOrder, done: any) {
                handleDisable(item, done);
            },
            render(row: IOrder) {
                return row.enabled !== 0;
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
        type: "selection"
    },
    {
        width: "60",
        type: "index",
        label: "序号"
    },
    {
        width: "100",
        label: "订单编号",
        prop: "orderId"
    },
    {
        width: "100",
        label: "订单名",
        prop: "orderName"
    },
    {
        width: "100",
        label: "姓名",
        prop: "fullName"
    },
    {
        width: "120",
        label: "手机号",
        prop: "phone"
    },
    {
        width: "200",
        label: "邮箱",
        prop: "email"
    },
    {
        width: "60",
        label: "启用",
        prop: "enabled",
        format: (row: IOrder) => {
            return row.enabled === 1 ? "启用" : "禁用";
        }
    },
    {
        width: "180",
        label: "创建时间",
        prop: "createTime"
    },
    {
        width: "150",
        label: "地址",
        prop: "address"
    },
    {
        label: "备注",
        prop: "remark"
    }
]);

/**
 * 加载数据
 */
const loadData = (parmas: object) => {
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
const validateOrderId = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^YH_\d+$/;
    if (!reg.test(value)) {
        callback(new Error("订单编号必须是以YH_开头和数字组合"));
    } else {
        callback();
    }
};
const validateOrderName = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^[a-zA-Z0-9]{4,16}$/;
    if (!reg.test(value)) {
        callback(new Error("订单必须是4-16位的字母、数字"));
    } else {
        callback();
    }
};
const validateFullName = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!value) {
        callback();
    } else if (!reg.test(value)) {
        callback(new Error("非法姓名"));
    } else {
        callback();
    }
};
const validatePhone = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!value) {
        callback();
    } else if (!reg.test(value)) {
        callback(new Error("非法手机号"));
    } else {
        callback();
    }
};
const validateEmail = (rule: any, value: string, callback: any) => {
    console.log("rule", rule);
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!value) {
        callback();
    } else if (!reg.test(value)) {
        callback(new Error("非法邮箱"));
    } else {
        callback();
    }
};
const formModel = reactive<IOrder>({
    id: undefined,
    orderId: "",
    orderName: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
    remark: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "订单编号",
        labelWidth: "80px",
        vModel: "orderId",
        editReadonly: true,
        placeholder: "请输入订单编号",
        prop: "orderId",
        rules: [
            {
                required: true,
                message: "请输入订单编号",
                trigger: "blur"
            },
            {
                validator: validateOrderId,
                trigger: "blur"
            }
        ]
    },
    {
        label: "订单名",
        labelWidth: "80px",
        vModel: "orderName",
        placeholder: "请输入订单名",
        prop: "orderName",
        rules: [
            {
                required: true,
                message: "请输入订单名",
                trigger: "blur"
            },
            {
                validator: validateOrderName,
                trigger: "blur"
            }
        ]
    },
    {
        label: "姓名",
        labelWidth: "80px",
        vModel: "fullName",
        placeholder: "请输入姓名",
        prop: "fullName",
        rules: [
            {
                validator: validateFullName,
                trigger: "blur"
            }
        ]
    },
    {
        label: "手机号",
        labelWidth: "80px",
        vModel: "phone",
        placeholder: "请输入手机号",
        prop: "phone",
        rules: [
            {
                validator: validatePhone,
                trigger: "blur"
            }
        ]
    },
    {
        label: "邮箱",
        labelWidth: "80px",
        vModel: "email",
        placeholder: "请输入邮箱",
        prop: "email",
        rules: [
            {
                validator: validateEmail,
                trigger: "blur"
            }
        ]
    },
    {
        label: "地址",
        labelWidth: "80px",
        vModel: "address",
        placeholder: "请输入地址",
        prop: "address"
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

/**
 * 导入
 */
const dialogVisible = ref(false);
const action = `${
    import.meta.env.VITE_APP_BASE_URL
}/api/v2/system/orders/importOrder`;
const headers = reactive({
    authorization: `Bearer ${loginStore.getAccessToken}`
});
const handleImport = () => {
    // const handleImport = (done: any) => {
    dialogVisible.value = true;
};

const handleSuccess = () => {
    // const handleSuccess = (data: any) => {
    // const {
    //   response,
    //   uploadFile,
    //   uploadFiles
    // }=data
    ElMessage({
        type: "success",
        message: "导入订单成功."
    });
    dialogVisible.value = false;
    loadData({
        keyword: "",
        current: 1,
        size: 10
    });
};
const handleError = () => {
    ElMessage({
        type: "success",
        message: "导入订单失败."
    });
    dialogVisible.value = false;
};
const handleClose = () => {
    dialogVisible.value = false;
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
        @on-import="handleImport"
        @on-export="handleExport"
        @on-print="handlePrint"
    ></quick-crud>
    <quick-upload
        :dialog-visible="dialogVisible"
        :action="action"
        :headers="headers"
        @on-success="handleSuccess"
        @on-error="handleError"
        @on-close="handleClose"
    ></quick-upload>
    <input
        ref="uploadRef"
        style="display: none"
        type="file"
        accept=".xls,.xlsx"
        class="upload-file"
        @change="changeFile($event)"
    />
</template>
