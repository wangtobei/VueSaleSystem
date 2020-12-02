<template>
  <div class="product">
    <div>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="adddialog = true"
        circle
      ></el-button>
      <el-dialog
        title="添加产品"
        :visible.sync="adddialog"
        width="400px"
        @close="getAllProducts"
      >
        <Addproduct />
      </el-dialog>
      <el-dialog
        title="编辑产品"
        :visible.sync="updatedialog"
        width="400px"
        @close="getAllProducts"
      >
        <Editproduct :updaterow="updaterow" />
      </el-dialog>
    </div>
    <el-table
      :v-loading="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="salarmNum" label="预警线"> </el-table-column>
      <el-table-column prop="stockNum" label="库存"> </el-table-column>
      <el-table-column prop="supId" label="供货商"> </el-table-column>
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
  </div>
</template>
<script>
import Axios from "axios";
import Addproduct from "./addproduct.vue";
import { AXIOS_BASE_URL } from "../../base.config";
import Editproduct from "./editproduct.vue";
export default {
  data() {
    return {
      tableData: [],
      adddialog: false,
      updatedialog: false,
      updaterow: null
    };
  },
  created: function () {
    this.getAllProducts();
  },
  methods: {
    //获取所有产品
    getAllProducts() {
      Axios.get(AXIOS_BASE_URL + "/product/all").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    handleEdit(row) {
      console.log(row);
      this.updaterow = row;
      this.updatedialog = true;
    },
    //删除选中的产品
    handleDelete(row) {
      console.log(row);
      Axios.get(AXIOS_BASE_URL + "/product/delete/" + row.id).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
          this.getAllProducts();
        } else {
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error",
          });
        }
      });
    },
  },
  components: {
    Addproduct,
    Editproduct,
  },
};
</script>