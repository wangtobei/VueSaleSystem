<template>
  <div>
    <div class="header">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
           <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">
            <span @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="4"><navmenu /> </el-col>
        <el-col :span="20"><router-view name="dashboard" /></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import navmenu from "@/components/navmenu";
import Navmenu from "../components/navmenu.vue";
export default {
  methods:{
logout(){
   this.$router.push("/");
}
  },
  components: {
    navmenu,
  },
};
</script>
<style scoped>
.header {
  height: 70px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  opacity: 0.9;
  background-color: white;
}
.main {
  margin-top: 90px;
}
</style>