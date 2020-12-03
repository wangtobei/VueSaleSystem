<template>
  <div class="editsupplier">
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
        <el-button type="primary" @click="onSubmit">更新供货商信息</el-button>
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
      this.form.address = value.address;
      this.form.supContact = value.supContact;
      this.form.supName = value.supName;
      this.form.address = value.address;
    },
  },
  data() {
    return {
      form: {
        supID: this.updaterow.supID,
        address: this.updaterow.address,
        supContact: this.updaterow.supContact,
        supName: this.updaterow.supName,
        supPhone: this.updaterow.supPhone,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      Axios.post(
        AXIOS_BASE_URL + "/supplier/update",
        qs.stringify(this.form)
      ).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "更新供货商信息成功！",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "更新供货商信息失败！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.editsupplier {
  width: 300px;
}
</style>