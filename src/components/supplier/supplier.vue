<template>
  <div class="supplier">
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
        <el-col :span="15"
          ><el-input
            placeholder="请输入供货商名称"
            v-model="name"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="querySupplierByName"
            ></el-button> </el-input
        ></el-col>
      </el-row>

      <el-dialog
        title="添加供货商"
        :visible.sync="adddialog"
        width="450px"
        @close="getAllSupplier"
      >
        <Addsupplier />
      </el-dialog>
      <el-dialog
        title="编辑供货商"
        :visible.sync="updatedialog"
        width="440px"
        @close="getAllSupplier"
      >
        <Editsupplier :updaterow="updaterow" />
      </el-dialog>
    </div>
    <el-table
      :v-loading="true"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
       :default-sort = "{prop: 'supID', order: 'ascending'}"
    >
      <el-table-column prop="supID" label="供货商编号"> </el-table-column>
      <el-table-column prop="supName" label="供货商名称"> </el-table-column>
      <el-table-column prop="supContact" label="联系人姓名"> </el-table-column>
      <el-table-column prop="supPhone" label="供货商电话"> </el-table-column>
      <el-table-column prop="address" label="供货商地址"> </el-table-column>
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
import Addsupplier from "./addsupplier.vue";
import Editsupplier from "./editsupplier.vue";
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
    this.getAllSupplier();
  },
  methods: {
    //获取所有产品
    getAllSupplier() {
      Axios.get(AXIOS_BASE_URL + "/supplier/all").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    querySupplierByName() {
      console.log(this.name);
      Axios.get(AXIOS_BASE_URL + "/supplier/query", {
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
      Axios.get(AXIOS_BASE_URL + "/supplier/delete/" + row.supID).then(
        (res) => {
          if (res.data == true) {
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
            });
            this.getAllSupplier();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败！",
              type: "error",
            });
          }
        }
      );
    },
  },
  components: {
    Addsupplier,
    Editsupplier,
  },
  watch: {
    name: function (value) {
      if (value == "") {
        this.getAllSupplier();
      }
    },
  },
};
</script>