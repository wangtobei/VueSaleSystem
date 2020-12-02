<template>
  <div class="login">
    <h2>欢迎使用XXXXX企业销售管理系统</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="form.UserName"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.PassWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
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
      axios
        .post("http://localhost:8080/login", qs.stringify(this.form))
        .then((res) => {
          if (res.data == true) {
            this.$notify({
              title: "登录成功",
              message: "欢迎使用xxxx系统",
              type: "success",
            });
            this.$router.push("/dashboard/");
          }
          else{
            this.$message.error('用户信息不正确，请重新输入！');
          }
        });
    },
  },
};
</script>d
<style scoped>
.login {
  width: 400px;
  height: 300px;
  margin: auto;
  margin-top: 100px;
}
</style>