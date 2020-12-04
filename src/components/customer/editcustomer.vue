<template>
  <div class="editcustomer">
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
        <el-button type="primary" @click="onSubmit">更新客户信息</el-button>
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
      this.form.cid = value.cid;
      this.form.name = value.name;
      this.form.phone = value.phone;
      this.form.notes = value.notes;
    },
  },
  data() {
    return {
      form: {
        cid: this.updaterow.cid,
        name: this.updaterow.name,
        phone: this.updaterow.phone,
        notes: this.updaterow.notes,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      Axios.post(
        AXIOS_BASE_URL + "/customer/update",
        qs.stringify(this.form)
      ).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "更新客户信息成功！",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "更新客户信息失败！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.editcustomer {
  width: 300px;
}
</style>