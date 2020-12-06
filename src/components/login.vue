<template>
  <div class="login">
    <h2 style="text-align: center">WELCOME TO USE THIS SYSTEM.</h2>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input
          v-model="form.UserName"
          placeholder="请输入用户名："
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.PassWord"
          show-password
          placeholder="请输入密码："
          @change="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 100%"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "../css/font.css";
import Axios from "axios";
import qs from "qs";
import { AXIOS_BASE_URL } from "../base.config";
Axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      form: {
        UserName: "",
        PassWord: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.UserName == "" || this.form.PassWord == "") {
        this.$message.error("用户信息不正确，请重新输入！");
        return false;
      }
      Axios.post(AXIOS_BASE_URL + "/login", qs.stringify(this.form)).then(
        (res) => {
          if (res.data == true) {
            this.$notify({
              title: "登录成功",
              message: "欢迎使用方研销售管理系统",
              type: "success",
            });
            this.$router.push("/dashboard/");
          } else {
            this.$message.error("用户信息不正确，请重新输入！");
          }
        }
      );
    },
  },
};
</script>d
<style scoped>
.login {
  width: 400px;
  height: 250px;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
  background-color: white;
  opacity: 0.9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
h2 {
  font-family: "NerkoOne";
}
</style>