<template>
  <div class="addstaff">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="员工名称">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.passWord"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.empPost"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="form.privilege" placeholder="请设置员工级别:">
          <el-option
            v-for="item in privilege"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加员工</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { AXIOS_BASE_URL } from "../../base.config";
export default {
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
        empPost: "",
        phone: "",
        privilege: "",
      },
      privilege: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.userName == "" ||
        this.form.passWord == "" ||
        this.form.empPost == "" ||
        this.form.phone == "" ||
        this.form.privilege == ""
      ) {
        this.$message({
          showClose: true,
          message: "员工信息不完整，请检查后重新填写！",
          type: "error",
        });
        return false;
      }
      Axios.post(AXIOS_BASE_URL + "/user/add", qs.stringify(this.form)).then(
        (res) => {
          if (res.data == true) {
            this.$message({
              showClose: true,
              message: "添加员工成功！",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "添加员工失败！",
              type: "error",
            });
          }
        }
      );
    },
  },
};
</script>
<style scoped>
.addstaff {
  width: 300px;
}
</style>