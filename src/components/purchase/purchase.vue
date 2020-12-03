<template>
  <div class="purchase">
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
  </div>
</template>
<script>
import Axios from "axios";
import { AXIOS_BASE_URL } from "../../base.config";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    Axios.get(AXIOS_BASE_URL + "/purchase/all").then((res) => {
      this.tableData = res.data;
    });
  },
};
</script>