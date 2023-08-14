export interface Token {
  quickAccessToken?: string
  quickRefreshToken?: string
  expiresIn?: number
}
export interface LoginParams {
  tenant: string
  username: string
  password: string
}
export interface LoginData extends Token {
  tenant: string
  userName: string
}
