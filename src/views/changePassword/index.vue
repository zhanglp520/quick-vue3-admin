<script lang="ts" setup>
/**导入第三方库 */
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { IFormItem } from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { encryptForMd5 } from "@/utils/crypto";
import { useUserStore } from "@/store/modules/user";
import { changePassword } from "@/api/system/user";
import { IChangePassword } from "@/types";

/**
 * 属性
 */
const userStore = useUserStore();
const { user } = userStore.$state;

/**
 * 表单
 */
const form = reactive<IChangePassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
});
const formItems = reactive<Array<IFormItem>>([
    {
        label: "原密码",
        labelWidth: "80px",
        vModel: "oldPassword",
        type: "password",
        placeholder: "原密码"
    },
    {
        label: "新密码",
        labelWidth: "80px",
        vModel: "newPassword",
        type: "password",
        placeholder: "新密码"
    },
    {
        label: "确认密码",
        labelWidth: "80px",
        vModel: "confirmPassword",
        type: "password",
        placeholder: "确认密码"
    }
]);

/**
 * 函数
 */
const handleSubmit = () => {
    const { id } = user;
    if (id === undefined) {
        return;
    }
    const { oldPassword, newPassword, confirmPassword } = form;
    if (confirmPassword !== newPassword) {
        ElMessage.error("确认密码和新密码不一致.");
        return;
    }
    changePassword(id, {
        oldPassword: encryptForMd5(oldPassword),
        newPassword: encryptForMd5(newPassword)
    }).then(() => {
        ElMessage({
            type: "success",
            message: "密码修改成功."
        });
    });
};
const handleClear = () => {
    Object.keys(form).forEach((key) => {
        form[key] = "";
    });
};

onMounted(() => {
    console.log("onMounted-changePassword");
});
</script>

<template>
    <div class="change-password">
        <quick-form
            :model="form"
            :form-items="formItems"
            :show-action="true"
            :action-slot="true"
        >
            <template #action>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="handleSubmit"
                        >提交</el-button
                    >
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleClear">清空</el-button>
                </el-form-item>
            </template>
        </quick-form>
    </div>
</template>

<style lang="scss" scoped>
.change-password {
    width: 50%;
}
</style>
