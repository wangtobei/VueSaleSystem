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
        @close="queryCustomerByPage(currentpage)"
      >
        <Addcustomer />
      </el-dialog>
      <el-dialog
        title="编辑客户信息"
        :visible.sync="updatedialog"
        width="400px"
        @close="queryCustomerByPage(currentpage)"
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
      :default-sort="{ prop: 'cid', order: 'ascending' }"
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
    <el-pagination
      layout="prev, pager, next"
      :total="count"
      :page-size="size"
      @current-change="queryCustomerByPage"
      @prev-click="queryCustomerByPage"
      @next-click="queryCustomerByPage"
    >
    </el-pagination>
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
      count: 0, //数据库中数据的总量
      size: 2, //当前每页显示的数量
      currentpage: 1, //当前页码
    };
  },
  created: function () {
    Axios.get(AXIOS_BASE_URL + "/customer/count").then((res) => {
      this.count = res.data;
    });
    this.queryCustomerByPage(this.currentpage);
  },
  methods: {
    queryCustomerByName() {
      this.count = 0;
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
          this.queryCustomerByPage(this.currentpage);
        } else {
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error",
          });
        }
      });
      //删除以后重新查询下总数
      Axios.get(AXIOS_BASE_URL + "/customer/count").then((res) => {
        this.count = res.data;
      });
    },
    //分页查询
    queryCustomerByPage(page) {
      //查询之前先查询总数
      Axios.get(AXIOS_BASE_URL + "/customer/count").then((res) => {
        this.count = res.data;
      });
      console.log("现在是" + page);
      this.currentpage = page;
      Axios.get(AXIOS_BASE_URL + "/customer/page", {
        params: { page: page, size: this.size },
      }).then((res) => {
        this.tableData = res.data;
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
        Axios.get(AXIOS_BASE_URL + "/customer/count").then((res) => {
          this.count = res.data;
        });
        this.queryCustomerByPage(this.currentpage);
      }
    },
  },
};
</script>