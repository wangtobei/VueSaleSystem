<template>
  <div class="navmenu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="/dashboard/"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item index="/dashboard/">
            <i class="el-icon-menu"></i>
            <span slot="title">客户信息管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/product">
            <i class="el-icon-document"></i>
            <span slot="title">商品信息管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/supplier">
            <i class="el-icon-date"></i>
            <span slot="title">供应商信息管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>进货管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/addpurchase">添加进货记录</el-menu-item>
              <el-menu-item index="/dashboard/purchase">查看进货记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">销售管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/staff">
            <i class="el-icon-user"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {},
};
</script>
<style scoped>
</style>