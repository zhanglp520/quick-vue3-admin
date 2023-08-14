import { defineStore } from "pinia";
import { listToTree } from "@/utils/index";
import { User } from "@/types/user";
import { QuickResponseData } from "@/utils/request";
import { Menu, Menubar } from "@/types/menu";
import { getUserByUserName } from "@/api/system/user";
import { getPermission } from "@/api/auth";
import { useTabStore } from "@/store/modules/tab";

interface UserState {
	user: User;
	permissionMenuList: Array<Menu>;
	menuList: Array<Menubar>;
	permissionBtns: Array<Menu>;
}
export const useUserStore = defineStore("userStore", {
	state: (): UserState => {
		return {
			user: {
				id: "",
				userId: "",
				userName: "",
				fullName: "",
				phone: "",
				avatar: "",
				email: "",
				address: "",
				createTime: "",
			},
			permissionMenuList: [],
			menuList: [],
			permissionBtns: [],
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
		getMenuList(): Array<Menubar> {
			return this.menuList;
		},
		getPermissionMenuList(): Array<Menu> {
			return this.permissionMenuList;
		},
		userInfo(): User {
			return this.user;
		},
	},
	actions: {
		getPermission(id: string): Promise<QuickResponseData<Array<Menu>>> {
			return new Promise((resolve) => {
				const userId = id;
				getPermission(userId).then((res: any) => {
					const { data: userPermissionMenuList } = res;
					this.permissionMenuList = userPermissionMenuList;
					const dt = JSON.parse(JSON.stringify(userPermissionMenuList));
					// const userMenuList = menuFormat(dt)
					const dtNew = dt.filter((x: any) => x.menuType !== 2);
					const userMenuList = listToTree(dtNew, 0, {
						pId: "pId",
					});
					const m = JSON.parse(JSON.stringify(userMenuList));
					this.menuList = m;
					resolve(res);
				});
			});
		},
		getUserInfo(userName: string): Promise<User> {
			return new Promise((resolve) => {
				getUserByUserName(userName).then((res) => {
					const { data: user } = res;
					this.user = user;
					resolve(user);
				});
			});
		},
	},
	persist: {
		enabled: true,
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
	},
});
