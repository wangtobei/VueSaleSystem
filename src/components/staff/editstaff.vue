<template>
  <div class="editstaff">
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
          <el-option v-for="item in privilege" :label="item" :value="item"  :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新员工信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { AXIOS_BASE_URL } from "../../base.config";
export default {
  props: ["updaterow"],
  watch: {
    updaterow: function (value) {
      this.form.empID = value.empID;
      this.form.userName = value.userName;
      this.form.passWord = value.passWord;
      this.form.empPost = value.empPost;
      this.form.phone = value.phone;
      this.form.privilege = value.privilege;
    },
  },
  data() {
    return {
      form: {
        empID: this.updaterow.empID,
        userName: this.updaterow.userName,
        passWord: this.updaterow.passWord,
        empPost: this.updaterow.empPost,
        phone: this.updaterow.phone,
        privilege: this.updaterow.privilege,
      },
      privilege:[1,2,3,4,5],
    };
  },
  methods: {
    onSubmit() {
        console.log(this.form)
      Axios.post(
        AXIOS_BASE_URL + "/user/update",
        qs.stringify(this.form)
      ).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "更新员工信息成功！",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "更新员工信息失败！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.editstaff{
  width: 300px;
}
</style>