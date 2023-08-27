import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// import vueSetupExtend from "@ainiteam/vite-plugin-vue-extend";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        // vue({
        //     template: {
        //         compilerOptions: {
        //             isCustomElement: (tag) => tag.includes("quick-")
        //         }
        //     }
        // }),
        vue(),
        vueSetupExtend(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: "quick-vue3-admin"
                }
            }
        }),
        eslintPlugin({
            include: [
                "src/**/*.ts",
                "src/**/*.js",
                "src/**/*.vue",
                "src/*.ts",
                "src/*.js",
                "src/*.vue"
            ]
        })
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "src")
            },
            {
                find: "vue-i18n",
                replacement: "vue-i18n/dist/vue-i18n.cjs.js"
            }
        ]
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/assets/scss/globalVariable.scss" as *;'
            }
        }
    },
    server: {
        https: false, // 运行服务是否以https方式
        host: true,
        port: 5173,
        open: false,
        proxy: {
            "/dev-api": {
                target: "http://localhost:4100/", // 代理的目标地址-本地
                // target: "https://api.quick.ainiteam.com/", // 代理的目标地址-线上
                changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3102 代理服务会把origin修改为目标地址
                secure: true, // 是否https接
                ws: false, // 是否代理websockets
                rewrite: (path) => path.replace(/^\/dev-api/, "") // 路径重写
            }
        }
    },
    preview: {
        https: false, // 运行服务是否以https方式
        host: true,
        port: 5174,
        open: false,
        proxy: {
            "/prod-api": {
                target: "http://localhost:4100/", // 代理的目标地址-本地
                // target: 'https://api.quick.ainiteam.com/', // 代理的目标地址-线上
                changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
                secure: false, // 是否https接口
                ws: false, // 是否代理websockets
                rewrite: (path) => path.replace(/^\/prod-api/, "") // 路径重写
            }
        }
    }
});
