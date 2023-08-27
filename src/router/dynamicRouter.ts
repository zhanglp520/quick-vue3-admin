import { Router, RouteRecordRaw } from "vue-router";
import { IMenu } from "@/types";
import pinia from "@/store";
import { useUserStore } from "@/store/modules/user";

const modules = import.meta.glob("../views/**/*.vue");
const layout = import.meta.glob("../layout/*.vue");

const getComponent = (childElement: IMenu) => {
    let component = {};
    if (childElement.viewPath) {
        const viewPath = modules[`../views${childElement.viewPath}.vue`];
        if (!viewPath) {
            console.error(
                `IMenu view path configuration error or view does not exist ../views${childElement.viewPath}.vue`
            );
        } else {
            component = viewPath;
        }
    } else {
        const path = modules[`../views${childElement.path}/index.vue`];
        if (!path) {
            console.error(
                `IMenu routing path configuration error or view does not exist ../views${childElement.path}/index.vue`
            );
        } else {
            component = path;
        }
    }
    return component;
};
const formatRouter = (data: IMenu[]) => {
    const arr: RouteRecordRaw[] = [];
    const firstMenuArr: IMenu[] = [];
    const secondMenuArr: IMenu[] = [];
    data.forEach((element: IMenu) => {
        if (element.menuType === 0) {
            firstMenuArr.push(element);
        } else if (element.menuType === 1) {
            secondMenuArr.push(element);
        }
    });
    console.log("secondMenuArr", secondMenuArr);
    const childMenus = secondMenuArr.filter((x) => Number(x.pId) === 0);
    console.log("childMenus", childMenus);

    childMenus.forEach((element) => {
        const component = getComponent(element);
        const routerObj: RouteRecordRaw = {
            name: element.menuId,
            path: element.path,
            component: layout["../layout/index.vue"],
            redirect: `${element.path}/index`,
            children: [
                {
                    name: `${element.menuId}/index`,
                    path: `${element.path}/index`,
                    component
                }
            ],
            meta: {
                title: element.menuName,
                icon: element.icon,
                link: element.link
            }
        };
        arr.push(routerObj);
    });
    firstMenuArr.forEach((element) => {
        const routerObj: RouteRecordRaw = {
            name: element.menuId,
            path: element.path,
            component: layout["../layout/index.vue"],
            redirect: "",
            children: [],
            meta: {
                title: element.menuName,
                icon: element.icon,
                link: element.link
            }
        };
        const childMenu = secondMenuArr.filter((x) => x.pId === element.id);
        if (childMenu.length > 0) {
            routerObj.redirect = childMenu[0].path;
            childMenu.forEach((childElement: IMenu) => {
                if (childElement.link) return;
                // console.log('childElement', childElement.menuName)

                const component = getComponent(childElement);
                const childRouterObj: RouteRecordRaw = {
                    name: childElement.menuId,
                    path: childElement.path,
                    component,
                    meta: {
                        title: childElement.menuName,
                        icon: childElement.icon,
                        link: childElement.link
                    }
                };
                if (routerObj.children) {
                    routerObj.children.push(childRouterObj);
                }
            });
        }
        arr.push(routerObj);
    });
    return arr;
};
export const addRoutes = (router: Router) => {
    const userStore = useUserStore(pinia);
    const menuList = userStore.getPermissionMenuList;
    const routerData = formatRouter(menuList);
    routerData.forEach((element) => {
        router.addRoute(element);
    });
    console.log("routerData", routerData);
};
