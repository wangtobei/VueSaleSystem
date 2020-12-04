<template>
  <div class="purchase">
    <el-col :span="20">
      <el-input
        placeholder="请输入商品名称"
        v-model="name"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="queryPurchaseByProductName"
        ></el-button> </el-input
    ></el-col>
    <el-table
      :v-loading="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
    >
      <el-table-column prop="pcID" label="进货单号"> </el-table-column>
      <el-table-column prop="product.name" label="商品名称"> </el-table-column>
      <el-table-column prop="product.price" label="单价"> </el-table-column>
      <el-table-column prop="supplier.supName" label="供应商">
      </el-table-column>
      <el-table-column prop="count" label="进货量"> </el-table-column>
      <el-table-column prop="date" label="交易时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.row)"
          ></el-button>
          &nbsp;
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button
              slot="reference"
              icon="el-icon-delete"
              circle
              type="danger"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑进货单"
      :visible.sync="updatedialog"
      width="400px"
      @close="getAllPurchase"
    >
      <Editpurchase :currentpcID="currentpcID" />
    </el-dialog>
  </div>
</template>
<script>
import Axios from "axios";
import { AXIOS_BASE_URL } from "../../base.config";
import Editpurchase from "./editpurchase.vue";
export default {
  data() {
    return {
      currentpcID: null,
      name: "", //当前要查询的商品的进货单的名称
      tableData: [],
      updatedialog: false,
    };
  },
  created() {
    this.getAllPurchase();
  },
  methods: {
    getAllPurchase() {
      Axios.get(AXIOS_BASE_URL + "/purchase/all").then((res) => {
        console.log(res)
        this.tableData = res.data;
      });
    },
    queryPurchaseByProductName() {
      Axios.get(AXIOS_BASE_URL + "/purchase/query", {
        params: { name: this.name },
      }).then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    handleDelete(row) {
      console.log(row);
      Axios.get(AXIOS_BASE_URL + "/purchase/delete/" + row.pcID).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
          this.getAllPurchase();
        } else {
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error",
          });
        }
      });
    },
    handleEdit(row) {
      this.currentpcID = row.pcID;
      this.updatedialog = true;
    },
  },
  watch: {
    name: function (value) {
      if (value == "") {
        this.getAllPurchase();
      }
    },
  },
  components: {
    Editpurchase,
  },
};
</script>