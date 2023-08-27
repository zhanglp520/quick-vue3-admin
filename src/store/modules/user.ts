import { defineStore } from "pinia";
import { listToTableTree } from "@/utils/index";
import { IUser } from "@/types";
import { IQuickResponseData } from "@/utils/request";
import { IMenu, IMenubar } from "@/types";
import { getUserByUserName } from "@/api/system/user";
import { getPermission } from "@/api/auth";
import { useTabStore } from "@/store/modules/tab";

interface IUserState {
    user: IUser;
    permissionMenuList: Array<IMenu>;
    menuList: Array<IMenubar>;
    permissionBtns: Array<IMenu>;
}
export const useUserStore = defineStore("userStore", {
    state: (): IUserState => {
        return {
            user: {
                id: undefined,
                userId: "",
                userName: "",
                fullName: "",
                phone: "",
                avatar: "",
                email: "",
                address: "",
                createTime: ""
            },
            permissionMenuList: [],
            menuList: [],
            permissionBtns: []
        };
    },
    getters: {
        getPermissionBtns<T>() {
            const tabStore = useTabStore();
            const activeTab = tabStore.getActiveTab;
            const menuPermission = this.permissionMenuList.filter(
                (x) => x.id?.toString() === activeTab.id
            );
            if (menuPermission && menuPermission[0]) {
                const btns = this.permissionMenuList.filter(
                    (x) => x.pId === menuPermission[0].id
                );
                const permission = {};
                btns.forEach((element) => {
                    permission[element.menuId] = true;
                });
                return permission as T;
            }
            return null;
        },
        getMenuList(): Array<IMenubar> {
            return this.menuList;
        },
        getPermissionMenuList(): Array<IMenu> {
            return this.permissionMenuList;
        },
        userInfo(): IUser {
            return this.user;
        }
    },
    actions: {
        getPermission(id: string): Promise<IQuickResponseData<Array<IMenu>>> {
            return new Promise((resolve) => {
                const userId = id;
                getPermission(userId).then((res: any) => {
                    const { data: userPermissionMenuList } = res;
                    this.permissionMenuList = userPermissionMenuList;
                    const dt = JSON.parse(
                        JSON.stringify(userPermissionMenuList)
                    );
                    // const userMenuList = menuFormat(dt)
                    const dtNew = dt.filter((x: any) => x.menuType !== 2);
                    const userMenuList = listToTableTree(dtNew, 0, {
                        pId: "pId"
                    });
                    const m = JSON.parse(JSON.stringify(userMenuList));
                    this.menuList = m;
                    resolve(res);
                });
            });
        },
        getUserInfo(userName: string): Promise<IUser> {
            return new Promise((resolve) => {
                getUserByUserName(userName).then((res) => {
                    const { data: user } = res;
                    this.user = user;
                    resolve(user);
                });
            });
        }
    },
    persist: {
        enabled: true
        // encryptionKey: 'myTest',
        // strategies: [
        //   {
        //     key: 'login',
        //     storage: sessionStorage,
        //     // paths: ['token', 'refreshToken'],
        //   },
        // ],
        // enabled: true, // 默认会以模块id为key，存储当前模块所有的状态；路由跳转会刷新掉store，尽量放在路由刷新后存储。
        // strategies: [
        //   {
        //     key: 'token', // 默认userStore
        //     // storage: sessionStorage, // sessionStorage|localStorage//默认sessionStorage
        //     // paths: ['token'],
        //   },
        //   {
        //     key: 'userInfo',
        //     storage: localStorage,
        //     paths: ['tenant', 'userName'],
        //   },
        // ],
    }
});
