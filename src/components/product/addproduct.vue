<template>
  <div class="addproduct">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="form.stockNum"></el-input>
      </el-form-item>
      <el-form-item label="报警线">
        <el-input v-model="form.salarmNum"></el-input>
      </el-form-item>
      <el-form-item label="供货商">
        <el-select v-model="form.supId" placeholder="请选择供货商">
          <el-option
            v-for="item in supplier"
            :label="item.supName"
            :value="item.supID"
            :key="item.supID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { AXIOS_BASE_URL } from "../../base.config";
export default {
  created() {
    Axios.get(AXIOS_BASE_URL + "/supplier/all").then((res) => {
      console.log(res);
      this.supplier = res.data;
    });
  },
  data() {
    return {
      form: {
        name: "",
        price: "",
        stockNum: "",
        salarmNum: "",
        supId: "",
      },
      supplier: null,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.name == "" ||
        this.form.price == "" ||
        this.form.stockNum == "" ||
        this.form.salarmNum == "" ||
        this.form.supId == ""
      ) {
        this.$message({
          showClose: true,
          message: "商品信息不完整，请检查后重新填写！",
          type: "error",
        });
        return false;
      }
      Axios.post(AXIOS_BASE_URL + "/product/add", qs.stringify(this.form)).then(
        (res) => {
          if (res.data == true) {
            this.$message({
              showClose: true,
              message: "添加商品成功！",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "添加商品失败！",
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
.addproduct {
  width: 300px;
}
</style>