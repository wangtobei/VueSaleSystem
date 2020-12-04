<template>
  <div class="customer">
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
            placeholder="请输入客户姓名"
            v-model="name"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryCustomerByName"
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <el-dialog
        title="添加客户信息"
        :visible.sync="adddialog"
        width="400px"
        @close="getAllcustomers"
      >
        <Addcustomer />
      </el-dialog>
      <el-dialog
        title="编辑客户信息"
        :visible.sync="updatedialog"
        width="400px"
        @close="getAllcustomers"
      >
        <Editcustomer :updaterow="updaterow" />
      </el-dialog>
    </div>
    <el-table
      :v-loading="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
    >
      <el-table-column prop="cid" label="客户编号"> </el-table-column>
      <el-table-column prop="name" label="客户名称"> </el-table-column>
      <el-table-column prop="phone" label="联系方式"> </el-table-column>
      <el-table-column prop="notes" label="备注"> </el-table-column>
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
import { AXIOS_BASE_URL } from "../../base.config";
import Editcustomer from "./editcustomer.vue";
import Addcustomer from "./addcustomer.vue";
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
    this.getAllcustomers();
  },
  methods: {
    //获取所有产品
    getAllcustomers() {
      Axios.get(AXIOS_BASE_URL + "/customer/all").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    queryCustomerByName() {
      console.log(this.name);
      Axios.get(AXIOS_BASE_URL + "/customer/query", {
        params: { name: this.name },
      }).then((res) => {
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
      Axios.get(AXIOS_BASE_URL + "/customer/delete/" + row.cid).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
          this.getAllcustomers();
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
    Editcustomer,
    Addcustomer,
  },
  watch: {
    name: function (value) {
      if (value == "") {
        this.getAllcustomers();
      }
    },
  },
};
</script>