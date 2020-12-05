<template>
  <div class="sale">
    <div>
      <el-row :gutter="10">
        <el-col :span="3">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="adddialog = true"
            circle
          ></el-button
        ></el-col>
        <el-col :span="15">
          <el-input
            placeholder="请输入商品名称"
            v-model="name"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryProductByName"
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <el-dialog
        title="创建销售单"
        :visible.sync="adddialog"
        width="400px"
        @close="getAllsales"
        ><Addsale />
      </el-dialog>
      <el-dialog
        title="更新销售单"
        :visible.sync="updatedialog"
        width="400px"
        @close="getAllsales"
      >
      <Editsale :updaterow="updaterow"  />
      </el-dialog>
    </div>
    <el-table
      :v-loading="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
    >
      <el-table-column prop="sid" label="销售单编号"> </el-table-column>
      <el-table-column prop="pName" label="商品名称"> </el-table-column>
      <el-table-column prop="saleCount" label="购买数量"> </el-table-column>
      <el-table-column prop="prices" label="总价"> </el-table-column>
      <el-table-column prop="uName" label="操作员"> </el-table-column>
      <el-table-column prop="date" label="交易时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)"
            >更新</el-button
          >
          &nbsp;
          <el-popconfirm
            title="确定退单吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button slot="reference" type="danger">退单</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Axios from "axios";
import { AXIOS_BASE_URL } from "../../base.config";
import Addsale from "./addsale.vue";
import Editsale from './editsale.vue';
export default {
  data() {
    return {
      tableData: [],
      adddialog: false,
      updatedialog: false,
      updaterow: null,
      name: "",
    };
  },
  created: function () {
    this.getAllsales();
  },
  methods: {
    //获取所有产品
    getAllsales() {
      Axios.get(AXIOS_BASE_URL + "/sale/all").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    queryProductByName() {
      console.log(this.name);
      Axios.get(AXIOS_BASE_URL + "/sale/query", {
        params: { name: this.name },
      }).then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    handleEdit(row) {
        console.log("row");
      console.log(row);
      this.updaterow = row;
      this.updatedialog = true;
    },
    //删除选中的产品
    handleDelete(row) {
      console.log(row);
      Axios.get(AXIOS_BASE_URL + "/sale/delete/" + row.sid).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "退单成功！退货已加入库存！",
            type: "success",
          });
          this.getAllsales();
        } else {
          this.$message({
            showClose: true,
            message: "退货失败！请联系管理员处理！",
            type: "error",
          });
        }
      });
    },
  },
  components: { Addsale, Editsale,  },
  watch: {
    name: function (value) {
      if (value == "") {
        this.getAllsales();
      }
    },
  },
};
</script>