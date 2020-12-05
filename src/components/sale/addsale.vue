<template>
  <div class="addsale">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-select
          v-model="form.pid"
          placeholder="请选择商品"
          @change="handleSelectChange"
        >
          <el-option
            v-for="item in product"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售数量">
        <el-col :span="5">
          <el-input-number v-model="form.saleCount" :min="1"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="总价">
        <el-input v-model="prices" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="操作员">
        <el-select
          v-model="form.uid"
          placeholder="员工信息"
          @change="handleUserChange"
        >
          <el-option
            v-for="item in user"
            :label="item.userName"
            :value="item.empID"
            :key="item.empID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建进货单</el-button>
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
    Axios.get(AXIOS_BASE_URL + "/product/all").then((res) => {
      console.log(res);
      this.product = res.data;
    });
    Axios.get(AXIOS_BASE_URL + "/user/all").then((res) => {
      console.log(res);
      this.user = res.data;
    });
  },
  data() {
    return {
      form: {
        pid: null,
        pName: "",
        saleCount: "",
        prices: "",
        uid: null,
        uName: "",
        date: null,
      },
      product: null,
      user: null,
      pirce: 0,
    };
  },
  computed: {
    prices() {
      return this.pirce * this.form.saleCount;
    },
  },
  methods: {
    format(Date) {
      var Y = Date.getFullYear();
      var M = Date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 不够两位补充0
      var D = Date.getDate();
      D = D < 10 ? "0" + D : D;
      var H = Date.getHours();
      H = H < 10 ? "0" + H : H;
      var Mi = Date.getMinutes();
      Mi = Mi < 10 ? "0" + Mi : Mi;
      var S = Date.getSeconds();
      S = S < 10 ? "0" + S : S;
      return Y + "-" + M + "-" + D + " " + H + ":" + Mi + ":" + S;
    },
    onSubmit() {
      let date = new Date();
      this.form.date = this.format(date);
      this.form.prices = this.prices;
      console.log(this.form);
      if (
        this.form.pName == "" ||
        this.form.saleCount == "" ||
        this.form.prices == "" ||
        this.form.uName == "" ||
        this.form.date == ""
      ) {
        this.$message({
          showClose: true,
          message: "进货单不完整，请检查后重新填写！",
          type: "error",
        });
        return false;
      }
      Axios.post(AXIOS_BASE_URL + "/sale/add", qs.stringify(this.form)).then(
        (res) => {
          if (res.data == true) {
            this.$message({
              showClose: true,
              message: "创建进货单成功！",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "创建进货单失败！",
              type: "error",
            });
          }
        }
      );
    },
    handleSelectChange(value) {
      for (let item of this.product) {
        if (item.id == value) {
          this.form.pName = item.name;
          this.pirce = item.price;
        }
      }
    },
    handleUserChange(value) {
      for (let item of this.user) {
        if (item.empID == value) {
          this.form.uName = item.userName;
        }
      }
    },
  },
};
</script>
<style scoped>
.addsale {
  width: 300px;
}
</style>