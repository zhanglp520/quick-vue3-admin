import { defineStore } from "pinia";
import { userLogin, refreshToken } from "@/api/auth";
import { LoginData, LoginParams, Token } from "@/types/auth";
import { encryptForMd5 } from "@/utils/crypto";

interface LoginState {
	quickAccessToken: string;
	quickRefreshToken: string;
	expiresIn: number;
	tenant: string;
	userName: string;
}
export const useAuthStore = defineStore("loginStore", {
	state: (): LoginState => {
		return {
			quickAccessToken: "",
			quickRefreshToken: "",
			expiresIn: 0,
			tenant: "",
			userName: "",
		};
	},
	getters: {
		getRefreshToken(): string | undefined {
			return this.quickRefreshToken;
		},
		getAccessToken(): string | undefined {
			return this.quickAccessToken;
		},
		getExpiresIn(): number | undefined {
			return this.expiresIn;
		},
	},
	actions: {
		login(form: LoginParams): Promise<LoginData> {
			const { tenant, username, password } = form;
			return new Promise((resolve, reject) => {
				userLogin({
					tenant,
					username,
					password: encryptForMd5(password),
				})
					.then((res) => {
						const { data: loginData } = res;
						const { quickAccessToken, quickRefreshToken, expiresIn } =
							loginData;
						if (quickAccessToken) {
							this.quickAccessToken = quickAccessToken;
						}
						if (quickRefreshToken) {
							this.quickRefreshToken = quickRefreshToken;
						}
						if (expiresIn) {
							this.expiresIn = expiresIn;
						}
						this.tenant = tenant;
						this.userName = username;
						resolve(this.$state);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		refreshToken(token: Token) {
			return new Promise((resolve, reject) => {
				refreshToken(token)
					.then((res) => {
						const { data: loginData } = res;
						const { quickAccessToken, quickRefreshToken, expiresIn } =
							loginData;
						if (quickAccessToken) {
							this.quickAccessToken = quickAccessToken;
						}
						if (quickRefreshToken) {
							this.quickRefreshToken = quickRefreshToken;
						}
						if (expiresIn) {
							this.expiresIn = expiresIn;
						}
						resolve(this.$state);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
	},
	persist: {
		enabled: true,
	},
});
