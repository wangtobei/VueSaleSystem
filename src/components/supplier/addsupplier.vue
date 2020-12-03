<template>
  <div class="addsupplier">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="供应商名称">
        <el-input v-model="form.supName"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="form.supContact"></el-input>
      </el-form-item>
      <el-form-item label="供应商电话">
        <el-input v-model="form.supPhone"></el-input>
      </el-form-item>
      <el-form-item label="供应商地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加供货商</el-button>
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
        address: "",
        supContact: "",
        supName: "",
        supPhone: "",
      },
    };
  },
  methods: {
    onSubmit() {
        if(this.form.address==""||this.form.supContact==""||this.supName==""||this.form.supPhone==""){
            this.$message({
            showClose: true,
            message: "信息填写不完整，请检查后重新填写！",
            type: "error",
          });
          return false;
        }
      Axios.post(
        AXIOS_BASE_URL + "/supplier/add",
        qs.stringify(this.form)
      ).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "添加供货商成功！",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "添加供货商失败！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.addsupplier {
  width: 340px;
}
</style>