<template>
  <div class="navmenu">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-menu
          default-active="/dashboard/"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item index="/dashboard/" v-if="!customer">
            <i class="el-icon-menu"></i>
            <span slot="title">客户信息管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/product" v-if="!product">
            <i class="el-icon-document"></i>
            <span slot="title">商品信息管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/supplier" v-if="!supplier">
            <i class="el-icon-date"></i>
            <span slot="title">供应商信息管理</span>
          </el-menu-item>
          <el-submenu index="1" v-if="!purchase">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>进货管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/dashboard/addpurchase"
                >添加进货记录</el-menu-item
              >
              <el-menu-item index="/dashboard/purchase"
                >查看进货记录</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/dashboard/sale" v-if="!sale">
            <i class="el-icon-setting"></i>
            <span slot="title">销售管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/staff" v-if="!staff">
            <i class="el-icon-user"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Axios from "axios";
import { AXIOS_BASE_URL } from "../base.config";
export default {
  data() {
    return {
      customer: true,
      product: true,
      supplier: true,
      purchase: true,
      sale: true,
      staff: true,
    };
  },
  created() {
    Axios.get(AXIOS_BASE_URL + "/privilege").then((res) => {
      switch (res.data) {
        case 1:
          this.customer = false;
          break;
        case 2:
          this.customer = false;
          this.product = false;
          break;
        case 3:
          this.customer = false;
          this.product = false;
          this.supplier = false;
          break;
        case 4:
          this.customer = false;
          this.product = false;
          this.supplier = false;
          this.sale = false;
          break;
        case 5:
          this.customer = false;
          this.product = false;
          this.supplier = false;
          this.purchase = false;
          this.sale = false;
          this.staff = false;
          break;
        default:
          break;
      }
    });
  },
};
</script>
<style scoped>
</style>