import { encrypt, decrypt } from "crypto-js/aes";
import UTF8, { parse } from "crypto-js/enc-utf8";
import pkcs7 from "crypto-js/pad-pkcs7";
import ECB from "crypto-js/mode-ecb";
import md5 from "crypto-js/md5";
import Base64 from "crypto-js/enc-base64";

/*
 *@Description: 加解密库
 *@Author: 土豆哥
 *@Date: 2022-12-02 00:40:51
 */
const defaultKey = "@quick_key";
const defaultIV = "quick_iv@";
export const encryptForAes = (data: string, key = "", iv = "") => {
    return encrypt(data, key || defaultKey, {
        mode: ECB,
        padding: pkcs7,
        iv: iv ? parse(iv) : parse(defaultIV)
    }).toString();
};
export const decryptForAes = (cipherText: string, key = "", iv = "") => {
    return decrypt(cipherText, key || defaultKey, {
        mode: ECB,
        padding: pkcs7,
        iv: iv ? parse(iv) : parse(defaultIV)
    }).toString(UTF8);
};
export const encryptForMd5 = (password: string) => {
    return md5(password).toString();
};
export const encryptForBase64 = (data: string) => {
    return UTF8.parse(data).toString(Base64);
};
export const decodeForBase64 = (cipherText: string) => {
    return Base64.parse(cipherText).toString(UTF8);
};
