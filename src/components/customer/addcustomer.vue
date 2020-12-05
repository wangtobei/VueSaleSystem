<template>
  <div class="addcustomer">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="客户名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入备注信息"
          v-model="form.notes"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加客户信息</el-button>
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
        name: "",
        phone: "",
        notes: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.name == "" ||
        this.form.phone == "" ||
        this.form.notes == ""
      ) {
        this.$message({
          showClose: true,
          message: "客户信息不完整，请检查后重新填写！",
          type: "error",
        });
        return false;
      }
      Axios.defaults.withCredentials=true
      Axios.post(AXIOS_BASE_URL + "/customer/add", qs.stringify(this.form)).then(
        (res) => {
          if (res.data == true) {
            this.$message({
              showClose: true,
              message: "添加客户信息成功！",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "添加客户信息失败！",
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
.addcustomer {
  width: 300px;
}
</style>