<template>
  <div class="addpurchase">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-select
          placeholder="请选择您要修改的商品"
          v-model="pid"
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
      <el-form-item label="商品单价">
        <el-col :span="20">
          <el-input v-model="price" :disabled="true"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="进货数量">
        <el-col :span="20">
          <el-input-number v-model="form.count" :min="1"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="总价">
        <el-col :span="20">
          <el-input v-model="currentPrices" :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="供货商">
        <el-col :span="20">
          <el-input v-model="currentSupplier" :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="进货日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          default-value
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Axios from "axios";
import { AXIOS_BASE_URL } from "../../base.config";
import qs from "qs";
export default {
  watch: {
    currentpcID: function (value) {
      this.form.pcID = value;
    },
  },
  created() {
    Axios.get(AXIOS_BASE_URL + "/product/all").then((res) => {
      console.log(res);
      this.product = res.data;
    });
  },
  props: ["currentpcID"],
  data() {
    return {
      currentSupplier: null,
      price: 0,
      pid: null,
      product: [],
      form: {
        pcID: this.currentpcID,
        pid: null,
        sid: null,
        count: 0,
        date: null,
      },
    };
  },
  computed: {
    currentPrices() {
      return this.form.count * this.price;
    },
  },
  methods: {
    handleSelectChange(value) {
      for (let item of this.product) {
        if (item.id == this.pid) {
          console.log(item);
          this.price = item.price;
          this.currentSupplier = item.supName;
          this.form.pid = item.id;
          this.form.sid = item.supId;
        }
      }
    },
    submit() {
      try {
        let oldDate = this.form.date;
        let date =
          oldDate.getFullYear() +
          "-" +
          (oldDate.getMonth() + 1) +
          "-" +
          oldDate.getDate();
        this.form.date = date;
      } catch (error) {
        console.log(error);
      }
      Axios.post(
        AXIOS_BASE_URL + "/purchase/update",
        qs.stringify(this.form)
      ).then((res) => {
        if (res.data == true) {
          this.$message({
            message: "成功修改进货记录！",
            type: "success",
          });
        } else {
          this.$message.error("嘤嘤嘤，修改失败了呢~");
        }
      });
      this.currentSupplier = null;
      this.price = 0;
      this.pid = null;
      this.form.pid = null;
      this.form.count = null;
      this.form.date = null;
    },
  },
};
</script>