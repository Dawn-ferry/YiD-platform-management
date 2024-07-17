<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="btn-area">
        <el-button type="primary" @click="exportFn"> 导出 </el-button>
      </div>
    </div>
    <div class="yidu-main">
      <el-table :data="tableData" border max-height="535" style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="60" align="center" />
        <el-table-column v-if="false" prop="id" label="id" width="80" />
        <el-table-column prop="ip" label="ip地址" show-overflow-tooltip align="center" />
        <el-table-column prop="router_path" label="菜单路径" show-overflow-tooltip align="center" />
        <el-table-column prop="operator" label="操作人" show-overflow-tooltip align="center" />
        <el-table-column label="操作时间" width="200" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.operating_time) }}</template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 10px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper" />
    </div>
  </div>
</template>
<script>
import { loggerList, fileXLSX } from "@/api/loggers"
import { getToken } from "@/utils/auth"

export default {
  name: "loggers",
  data() {
    return {
      getToken: `Bearer ${getToken()}`,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
    }
  },

  mounted() {
    this.searchLoggers()
  },

  methods: {
    async exportFn() {
      await fileXLSX({ name: "日志文件" })
    },
    async searchLoggers(val) {
      if (val) {
        var { pagesize, pageindex } = val
      }
      const data = {
        pageindex: pageindex || this.currentPage,
        pagesize: pagesize || this.pageSize,
      }
      let res = await loggerList(data)
      if (res.code === 100) {
        this.tableData = res.data.list
        this.currentPage = res.data.pageindex
        this.pageSize = res.data.pagesize
        this.total = res.data.pagetotal
      }
    },
    handleSizeChange(val) {
      this.searchLoggers({ pagesize: val })
    },
    handleCurrentChange(val) {
      this.searchLoggers({ pageindex: val })
    },
  },
}
</script>
