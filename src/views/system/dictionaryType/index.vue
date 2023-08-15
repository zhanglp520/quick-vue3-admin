<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Column, Actionbar, Toolbar, FormItem } from "@ainiteam/quick-vue3-ui";
import { validatePermission } from "@/utils";
import {
  IDictionaryType,
  IDictionaryTypePermissionButton,
} from "@/types/dictionaryType";
import { useUserStore } from "@/store/modules/user";
import {
  getDictionaryTypeList,
  addDictionaryType,
  updateDictionaryType,
  deleteDictionaryType,
} from "@/api/system/dictionaryType";

/**
 * 属性
 */
const userStore = useUserStore();
const loading = ref(false);
const dataList = reactive<Array<IDictionaryType>>([]);
const permissionBtn = computed<IDictionaryTypePermissionButton>(() => {
  return userStore.getPermissionBtns as IDictionaryTypePermissionButton;
});
/**
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
  hiddenBatchDeleteButton: true,
  hiddenImportButton: true,
  hiddenExportButton: true,
  hiddenPrintButton: true,
  hiddenAddButton: validatePermission(permissionBtn.value?.add),
});
/**
 * 操作栏
 */
const handleDelete = (item: IDictionaryType, done: any) => {
  ElMessageBox.confirm(
    `你真的删除【${item.dicTypeName}】的字典分类吗？`,
    "警告",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(() => {
    if (!item.id) {
      return;
    }
    deleteDictionaryType(item.id).then(() => {
      ElMessage({
        type: "success",
        message: "字典分类删除成功",
      });
      done();
    });
  });
};
const tableActionbar = reactive<Actionbar>({
  width: 100,
  hiddenDetailButton: true,
  hiddenEditButton: validatePermission(permissionBtn.value?.edit),
  hiddenDeleteButton: validatePermission(permissionBtn.value?.delete),
});
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
  {
    width: "50",
    type: "selection",
  },
  {
    label: "分类编号",
    prop: "dicTypeId",
    width: "200",
  },
  {
    label: "字典分类",
    prop: "dicTypeName",
  },
]);
/**
 * 加载数据
 */
const load = () => {
  loading.value = true;
  getDictionaryTypeList().then((res) => {
    loading.value = false;
    const { data: dictionaryTypeList } = res;
    dataList.length = 0;
    dataList.push(...dictionaryTypeList);
  });
};
/**
 * 表单
 */
const dialogTitle = reactive({
  add: "创建字典分类",
  edit: "修改字典分类",
  detail: "字典分类详情",
});
const formModel = reactive<IDictionaryType>({
  id: "",
  dicTypeId: "",
  dicTypeName: "",
});
const formItems = reactive<Array<FormItem>>([
  {
    label: "分类编号",
    labelWidth: "80px",
    vModel: "dicTypeId",
    placeholder: "分类编号",
    editReadonly: true,
    prop: "dicTypeId",
    rules: [
      {
        required: true,
        message: "分类编号不能为空",
        trigger: "blur",
      },
    ],
  },
  {
    label: "分类名称",
    labelWidth: "80px",
    vModel: "dicTypeName",
    placeholder: "分类名称",
    prop: "dicTypeName",
    rules: [
      {
        required: true,
        message: "分类名称不能为空",
        trigger: "blur",
      },
    ],
  },
]);
const handleFormSubmit = (form: IDictionaryType, done: any) => {
  const row = { ...form };
  if (row.id) {
    updateDictionaryType(row).then(() => {
      ElMessage({
        type: "success",
        message: "用户修改成功",
      });
      done();
    });
  } else {
    row.id = undefined;
    addDictionaryType(row).then(() => {
      ElMessage({
        type: "success",
        message: "用户创建成功",
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
		:table-data="dataList"
		:table-columns="tableColumns"
		:table-actionbar="tableActionbar"
		:table-toolbar="tableToolbar"
		dialog-titles="dialogTitles"
		:loading="loading"
		@on-load="load"
		@on-form-submit="handleFormSubmit"
		@on-delete="handleDelete"
	></quick-crud>
</template>
