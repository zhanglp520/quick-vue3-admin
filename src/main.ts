import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import QuickVue3Ui from "@ainiteam/quick-vue3-ui";
import "@ainiteam/quick-vue3-ui/dist/style.css";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(ElementPlus);
app.use(QuickVue3Ui);
app.mount("#app");
