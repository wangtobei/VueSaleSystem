<template>
  <div>
    <div class="header">
      <img src="../assets/1.png" alt="" style="height: 70px" />
      <el-dropdown trigger="click" class="user">
        <span class="el-dropdown-link">
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">
            <span @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="4"><navmenu /></el-col>
        <el-col :span="20">
            <router-view name="dashboard" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import navmenu from "@/components/navmenu";
import Navmenu from "../components/navmenu.vue";
import Axios from "axios";
import { AXIOS_BASE_URL } from "../base.config";
Axios.defaults.withCredentials = true;
export default {
  methods: {
    logout() {
      Axios.get(AXIOS_BASE_URL + "/logout").then((res) => {
        if ((res.data = true)) {
          this.$message({
            message: "您已经成功退出系统了哦~",
            type: "success",
            showClose: true,
            center: true,
          });
          this.$router.push("/");
        }
      });
    },
  },
  components: {
    navmenu,
  },
  //使用导航守卫看当前用户是否登录系统
  beforeRouteEnter(to, from, next) {
    Axios.get(AXIOS_BASE_URL + "/check").then((res) => {
      if (res.data == false) {
        console.log("未登陆");
        window.location.href = "/";
      } else {
        next();
      }
    });
  },
};
</script>
<style scoped>
.header {
  height: 70px;
  box-shadow: 0 2px 12px 0 #6a9ca3;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  opacity: 0.9;
  background-color: #6fb8c4;
}
.main {
  margin-top: 90px;
}
.user {
  float: right;
  margin-right: 30px;
  margin-top: 10px;
}
</style>