export interface IToken {
    quickAccessToken?: string;
    quickRefreshToken?: string;
    expiresIn?: number;
}
export interface ILoginParams {
    tenant: string;
    username: string;
    password: string;
}
export interface ILoginData extends IToken {
    tenant: string;
    userName: string;
}
