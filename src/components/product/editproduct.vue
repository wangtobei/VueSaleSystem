<template>
  <div class="addproduct">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
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
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新商品</el-button>
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
      this.form.id = value.id;
      this.form.name = value.name;
      this.form.price = value.price;
      this.form.stockNum = value.stockNum;
      this.form.salarmNum = value.salarmNum;
      this.form.supId = value.supId;
    },
  },
  data() {
    return {
      form: {
        id: this.updaterow.id,
        name: this.updaterow.name,
        price: this.updaterow.price,
        stockNum: this.updaterow.stockNum,
        salarmNum: this.updaterow.salarmNum,
        supId: this.updaterow.supId,
      },
    };
  },
  methods: {
    onSubmit() {
        console.log(this.form)
      Axios.post(
        AXIOS_BASE_URL + "/product/update",
        qs.stringify(this.form)
      ).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "更新商品成功！",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "更新商品失败！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.addproduct {
  width: 300px;
}
</style>