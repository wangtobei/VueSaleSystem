<template>
  <div class="login_bg">
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
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div id="grecaptcha"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import "../css/font.css";
import Axios from "axios";
import qs from "qs";
import { AXIOS_BASE_URL } from "../base.config";
Axios.defaults.withCredentials = true;
export default {
  mounted() {
    this.captcha();
  },
  data() {
    return {
      site_key: "6LfeSssZAAAAAB-H61Ns69Pi_P5OH-tLDYCNs8_K",
      verify: false,
      form: {
        UserName: "",
        PassWord: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.verify) {
        this.$message.error("请先完成人机身份验证！");
        return false;
      }
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
    //通过验证码校验的时候调用此函数
    check() {
      this.verify = true;
    },
    captcha() {
      setTimeout(() => {
        window.grecaptcha.render("grecaptcha", {
          sitekey: this.site_key,
          callback: this.check,
        });
      }, 200);
    },
  },
};
</script>
<style scoped>
.login_bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url("../assets/bg2.jpg");
  background-size: cover;
  background-position: center;
}
.login {
  width: 300px;
  height: 370px;
  margin: auto;
  margin-top: 100px;
  margin-right: 200px;
  padding: 20px;
  background-color: white;
  opacity: 0.9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 5%;
}
h2 {
  font-family: "NerkoOne";
}
</style>