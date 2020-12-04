<template>
  <div class="product">
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
            placeholder="请输入员工名："
            v-model="name"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryUserByName"
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <el-dialog
        title="添加员工"
        :visible.sync="adddialog"
        width="400px"
        @close="closeAddStaff"
      >
        <Addstaff />
      </el-dialog>
      <el-dialog
        title="编辑员工信息"
        :visible.sync="updatedialog"
        width="400px"
        @close="closeAddStaff"
      >
        <Editstaff :updaterow="updaterow" />
      </el-dialog>
    </div>
    <el-table
      :v-loading="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
    >
      <el-table-column prop="empID" label="员工编号"> </el-table-column>
      <el-table-column prop="userName" label="员工名称"> </el-table-column>
      <el-table-column prop="passWord" label="密码"> </el-table-column>
      <el-table-column prop="empPost" label="职位"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="privilege" label="级别"> </el-table-column>
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
import Editstaff from "./editstaff.vue";
import Addstaff from "./addstaff.vue";
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
    this.getAllStaff();
  },
  methods: {
    getAllStaff() {
      Axios.get(AXIOS_BASE_URL + "/user/all").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    queryUserByName() {
      console.log(this.name);
      Axios.get(AXIOS_BASE_URL + "/user/query", {
        params: { username: this.name },
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
    handleDelete(row) {
      console.log(row);
      Axios.get(AXIOS_BASE_URL + "/user/delete/", {
        params: {
          uid: row.empID,
        },
      }).then((res) => {
        if (res.data == true) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
          });
          this.getAllStaff();
        } else {
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error",
          });
        }
      });
    },
    closeAddStaff() {
      this.getAllStaff();
    },
  },
  components: { Editstaff, Addstaff },
  watch: {
    name: function (value) {
      if (value == "") {
        this.getAllStaff();
      }
    },
  },
};
</script>