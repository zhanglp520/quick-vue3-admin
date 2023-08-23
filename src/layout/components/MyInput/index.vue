<script lang="ts" setup>
defineProps({
    modelValue: {
        type: String,
        default: "update:modelValue"
    }
});
const emit = defineEmits(["update:modelValue"]);
const inputValue = (e: any) => {
    const value = e.target.value;
    emit("update:modelValue", value);
};
</script>
<template>
    <input
        :value="modelValue"
        @input="inputValue"
    />
</template>
