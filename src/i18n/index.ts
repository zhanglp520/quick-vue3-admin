import { createI18n } from "vue-i18n";
import pinia from "../store";
import { useAppStore } from "../store/modules/app";

import zhLocale from "./lang/zh.json";
import enLocale from "./lang/en.json";

const messages = {
    zh: zhLocale,
    en: enLocale
};
const appStore = useAppStore(pinia);

const i18n = createI18n({
    locale: appStore.getLanguage,
    // locale:'zh',
    messages,
    globalInjection: true, // 解决Uncaught (in promise) TypeError: _ctx.$t is not a function
    allowComposition: true, // 使用新特性 例如：useI18n
    legacy: false // 使用组合式api
});

export default i18n;
