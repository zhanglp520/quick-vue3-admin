/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
// declare module 'echarts' {
//   const echarts: any
//   export default echarts
// }

declare module "@grapecity/spread-sheets-vue" {
    export { GcSpreadSheets, GcWorksheet, GcColumn };
}
declare module "@grapecity/spread-sheets" {
    export default GC;
}
declare module "crypto-js/aes" {
    export { encrypt, decrypt };
}
declare module "crypto-js/enc-utf8" {
    export default UTF8;
    export { parse };
}
declare module "crypto-js/pad-pkcs7" {
    export default pkcs7;
}
declare module "crypto-js/mode-ecb" {
    export default ECB;
}
declare module "crypto-js/md5" {
    export default md5;
}
declare module "crypto-js/enc-base64" {
    export default Base64;
}
declare module "element-plus/dist/locale/zh-cn.mjs" {
    export default zhCn;
}
declare module "element-plus/dist/locale/en.mjs" {
    export default en;
}
declare module "nprogress" {
    export default nprogress;
}
declare module "uuid" {
    export { v4 };
}
