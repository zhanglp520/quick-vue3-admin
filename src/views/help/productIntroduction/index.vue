<script setup lang="ts">
const yanshi = () => {
  window.open("https://quick.ainiteam.com/");
};
const kaiyuan = () => {
  window.open("https://gitee.com/zhanglp520/quick-admin/");
};
</script>

<template>
  <div class="product">
    <el-row :gutter="10">
      <el-col>
        <el-card>
          <template #header>
            <div class="card-header">
              <span>产品名称：quick中后台开发者系统平台</span>
            </div>
          </template>
          <div class="description">
            quick-admin 是一款免费开源快速搭建中后台系统框架,本框架基于
            vite4、vue3、element-plus、pinia
            等最新主流技术并封装了通用的组件方便开发者提高工作效率,后期也会通过版本升级的方式来维护并更新，使开发者拥有一款长期并且稳定的脚手架。本团队还提供了基于
            quick 框架开发的各类业务项目，如有相关需求联系管理员。
            <br />
            <p>
              开源地址：<el-link
                type="primary"
                href="https://gitee.com/zhanglp520/quick-admin/"
              >
                https://gitee.com/zhanglp520/quick-admin</el-link
              >
              <br />
              演示地址：<el-link
                type="primary"
                href="http://quick.ainiteam.com/"
              >
                http://quick.ainiteam.com/</el-link
              >
              <br />
              账号密码：admin/123456
              <br />
              如果对你有帮助，帮忙点个star吧！ 也可以fork项目并对项目做出贡献！
              <br />
              如果想加入项目，请联系管理员！
            </p>
          </div>
          <div class="action">
            <el-button type="primary" @click="yanshi">演示版本</el-button>
            <el-button type="warning" @click="kaiyuan">开源版本</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>特色</span>
            </div>
          </template>
          <p>
            1.使用 vite4、vue3、element-plus、pinia 和 typescript 等前言技术<br />
            2.封装了通用的组件<br />
            3.提供了系统管理常用功能模块 <br />
            4. 提供权限管理模块 <br />
            5.动态菜单技术<br />
            6. 动态路由技术 <br />
            7. 使用 JWT 鉴权<br />
            8. 使用中间件异常处理<br />
            9.前后端分离<br />
            10. 提供免费帮助通道<br />
            11. 免费提供框架演示环境<br />
            12.官方提供稳定并长期维护的 node 轻后端接口项目<br />
          </p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>升级</span>
            </div>
          </template>
          <p>
            发布版本1.0.0<br />
            1.提供-quick产品系统平台<br />
            2.提供-系统模块<br />
            3.提供-授权模块<br />
            4.提供-帮助模块<br />
            <br />
            发布版本1.0.1<br />
            1.菜单优化；<br />
            2.路由缓存；<br />
            3.修复bug<br />
            <br />
            发布版本1.1.0<br />
            1.增加：资源管理模块<br />
            2.增加：产品介绍页面<br />
            3.优化：选项卡<br />
            4.优化：面包屑<br />
            5.优化：菜单滚动条；<br />
            6.修复bug<br />
          </p>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>服务</span>
            </div>
          </template>
          <p>
            1.开发文档：<el-link
              type="primary"
              href=" https://doc.ainiteam.com/"
            >
              https://doc.ainiteam.com/</el-link
            ><br />
            2.接口文档：<el-link
              type="primary"
              href="https://console-docs.apipost.cn/preview/0e11a2eb3c3883a7/4fff7a394c074ac7"
            >
              https://console-docs.apipost.cn/preview/0e11a2eb3c3883a7/4fff7a394c074ac7</el-link
            ><br />
            4.码云地址：<el-link
              type="primary"
              href="https://gitee.com/zhanglp520/quick-admin/"
            >
              https://gitee.com/zhanglp520/quick-admin/</el-link
            ><br />
            5.github地址：<el-link
              type="primary"
              href="https://github.com/zhanglp520/quick-admin/"
            >
              https://github.com/zhanglp520/quick-admin/</el-link
            ><br />
            6.gitlab地址：<el-link
              type="primary"
              href="http://110.42.130.88:8099/zhanglp520/quick-admin/"
            >
              http://110.42.130.88:8099/zhanglp520/quick-admin/</el-link
            ><br />
            7.gitee中发起 Issue<br />
            8.qq群帮助：558795174<br />
          </p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>合作</span>
            </div>
          </template>
          <p>
            1.承接quick产品的定制化开发<br />
            2.承接quick产品的业务项目<br />
            3.组件定制化开发<br />
            4.其他项目可以联系咨询<br />
            qq：1841031740<br />
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.product {
  .description {
    font-size: 24px;
    color: gray;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-card {
    height: 400px;
  }
  p {
    font-size: 14px;
    color: gray;
  }
  .card-header {
    font-size: 16px;
  }
}
</style>
