<script lang="ts" setup>
/**导入第三方库 */
import { onMounted, reactive } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import { IFormItem } from "@ainiteam/quick-vue3-ui";

/**导入项目文件 */
import { useAuthStore } from "@/store/modules/auth";
import { useUserStore } from "@/store/modules/user";
import { updateUser } from "@/api/system/user";
import { IUser } from "@/types";

/**
 * 属性
 */
const loginStore = useAuthStore();
const userStore = useUserStore();
const form = reactive<IUser>({
    id: undefined,
    userId: "",
    avatar: "",
    fullName: "",
    userName: "",
    phone: "",
    email: "",
    address: ""
});
/**
 * 上传
 */
// const imageUrl = ref('')
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    form.avatar = `${import.meta.env.VITE_UPLOAD_PATH}${response.data.path}`;
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
        label: "头像",
        labelWidth: "80px",
        vModel: "avatar",
        placeholder: "头像",
        type: "avatar",
        // actionUrl: '/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        actionUrl: `${
            import.meta.env.VITE_APP_BASE_URL
        }/api/v2/uploads/uploadFile`,
        headers: {
            authorization: `Bearer ${loginStore.getAccessToken}`
        },
        success: handleAvatarSuccess,
        beforeUpload: beforeAvatarUpload
    },
    {
        label: "姓名",
        labelWidth: "80px",
        vModel: "fullName",
        placeholder: "姓名"
    },
    {
        label: "用户名",
        labelWidth: "80px",
        vModel: "userName",
        placeholder: "用户名"
    },
    {
        label: "手机号",
        labelWidth: "80px",
        vModel: "phone",
        type: "phone",
        placeholder: "手机号"
    },
    {
        label: "邮箱",
        labelWidth: "80px",
        vModel: "email",
        type: "email",
        placeholder: "邮箱"
    },
    {
        label: "地址",
        labelWidth: "80px",
        vModel: "address",
        placeholder: "地址"
    }
]);
/**
 * 函数
 */
const getInfo = () => {
    const { user } = userStore.$state;
    const { id, userName } = user;
    userStore.getUserInfo(userName).then((res) => {
        const info = { ...res };
        const { userId, avatar, fullName, phone, email, address } = info;
        form.id = id;
        form.userId = userId;
        form.userName = userName;
        form.avatar = avatar;
        form.fullName = fullName;
        form.phone = phone;
        form.email = email;
        form.address = address;
    });
};
const handleSubmit = () => {
    updateUser(form).then(() => {
        ElMessage({
            type: "success",
            message: "修改个人资料成功."
        });
        getInfo();
    });
};
const handleClear = () => {
    Object.keys(form).forEach((key) => {
        form[key] = "";
    });
};
onMounted(() => {
    getInfo();
});
</script>

<template>
    <div class="personal-info">
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
.personal-info {
    width: 50%;
}
</style>
