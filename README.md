<div align="center"> <a href="https://gitee.com/zhanglp520/quick-vue3-admin.git"> <img alt="quick-vue3-admin Logo" width="200" height="200" src="https://raw.githubusercontent.com/wiki/zhanglp520/quick-vue3-admin/logo.png"> </a> <br> <br>
</div>

**中文** | [英文](./README.en.md)

# quick-vue3-admin

## 简介

quick-vue3-admin 是一款免费开源快速搭建中后台系统框架。本框架基于 vite4、vue3.2 语法糖模式、element-plus、pinia 等最新主流技术并封装了通用的组件方便开发者提高工作效率。后期也会通过版本升级的方式来维护并更新，使开发者拥有一款长期并且稳定的脚手架。本团队还提供了基于 quick 框架开发的各类业务项目，比如： 订单管理系统、调度管理系统、聊天系统、音视系统 、监控系统、商城系统、物联网平台、外卖系统、ERP 系统、CMR 系统、OA 系统、物流管理系统、CRM 管理系统等等常用的业务系统，如有相关需求联系管理员。

## 软件特色

1. 使用 vite4、vue3.2 语法糖、VUex、vue-router4.x、element-plus、pinia 和 typescript 等前言技术
2. 封装了通用的组件
3. 提供了系统管理常用功能模块
4. 提供权限管理模块
5. 动态菜单技术
6. 动态路由技术
7. 使用 JWT 鉴权
8. 使用中间件异常处理
9. 前后端分离
10. 提供免费帮助通道
11. 免费提供框架演示环境
12. 官方提供稳定并长期维护的 node 轻后端接口项目
13. 后端使用 nestjs 框架
14. 使用 restful 接口规范
15. 个人资料修改及密码修改功能
16. token 过期功能
17. 刷新 token 功能
18. 模块化管理
19. 使用 mvc 架构及多层设计思想
20. 使用 typeorm 框架，可活支持数据库及多种类型的数据库

## 预览

-   [quick-vue3-admin](https://quick.ainiteam.com/) - 框架演示 2.0 版本
-   [quick-vue3-admin](https://v1.quick.ainiteam.com/) - 框架演示 1.0 版本

演示账号密码：admin/123456

## 开发文档

-   [quick-vue3-admin](https://doc.ainiteam.com/) - quick-vue3-admin 开发文档

## 接口文档

-   [quick 接口文档](https://console-docs.apipost.cn/preview/0e11a2eb3c3883a7/4fff7a394c074ac7) - quick 接口文档 1.0 版本
-   [quick 接口文档](https://console-docs.apipost.cn/preview/52de13c4d013470f/e5aa6f10d52601f7) - quick 接口文档 2.0 版本

## 安装使用

-   克隆项目

```bash
github： git clone https://github.com/zhanglp520/quick-vue3-admin.git

gitee：git clone https://gitee.com/zhanglp520/quick-vue3-admin.git

```

-   切换淘宝镜像

```bash
npm config set registry https://registry.npm.taobao.org
```

-   切换 npm

```bash
npm config set registry https://registry.npmjs.org

```

-   切换是否成功验证

```bash
npm config get registry
```

-   安装 pnpm

```bash
npm install -g pnpm
```

-   安装项目依赖包

```bash
pnpm install
```

如果 install 失败，删除 pnpm-lock.yaml 和 node_modules 以及 D 盘的.pnpm-store 目录，并且重新 install

-   运行

```bash
pnpm run dev
```

运行命令执行服务启动后，浏览器输入：http://localhost:3102/

-   eslint 检测

```bash
pnpm run lint 检测并尝试修复
```

-   打包上线

```bash
pnpm run build
```

-   打包后预览

```bash
pnpm run preview
```

## 后端接口

-   官方提供后端接口项目 express 版本：https://gitee.com/zhanglp520/quick-node-express.git 接口 v1 版本
-   官方提供后端接口项目 nestjs 版本：https://github.com/zhanglp520/quick-node-Nestjs.git 接口 v2 版本

## 寻求帮助

1. 查看官方帮助文档
2. 发起 Issue
3. 加 quick 框架 QQ 群：

-   群 1：528166164
-   群 2：485013155
-   群 3：558795174

## License

[MIT © quick-vue3-admin](./LICENSE)

## 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码,提交代码规则：(^(Fix|Update|New|Breaking|Docs|Build|Upgrade|Chor)?: .{1,72})
4.  新建 Pull Request
5.  点个 star 把
6.  如需加入开源，请联系管理员
7.  如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持!
    ![donate](https://raw.githubusercontent.com/wiki/zhanglp520/quick-vue3-admin/20230430121236.png)
