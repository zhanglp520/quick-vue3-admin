import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "@/store";
import { useAuthStore } from "@/store/modules/auth";
import staticRouter from "./staticRouter";
import { addRoutes } from "./dynamicRouter";

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [...staticRouter]
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    console.log("router-beforeEach-from", from);
    const loginStore = useAuthStore(pinia);
    if (loginStore.getAccessToken) {
        if (!to.name) {
            addRoutes(router);
            next({ ...to, replace: true });
        } else {
            next();
        }
    } else if (to.path === "/login") {
        next();
    } else {
        next("/login");
    }
});
router.afterEach(() => {
    NProgress.done();
});
