import { createPinia } from "pinia";
import persist from "pinia-plugin-persist";
// import { usePersist } from 'pinia-use-persist'//加密插件

const pinia = createPinia();
pinia.use(persist);
// pinia.use(usePersist)
export default pinia;
