<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="btn-area">
        <el-button type="primary" @click="exportFn" size="small">导出</el-button>
      </div>
    </div>
    <div class="yidu-main">
      <BaseTable :tableData="tableData" :filterColums="filterColums">
        <template v-slot:beforeCol>
          <el-table-column type="index" width="60" />
          <el-table-column v-if="false" prop="id" label="id" width="80" />
        </template>
        <template v-slot:tableBody="{ scopeData: { row, column } }">
          <template v-if="column.property === 'infotype'">{{ $formatDate(row.operating_time)}}</template>
        </template>
      </BaseTable>
      <el-pagination
        style="margin-top: 10px;text-align: left;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>
<script>
import { loggerList, fileXLSX } from "@/api/loggers"
import { getToken } from "@/utils/auth"

export default {
  name: "loggers",
  components: {
    BaseTable: () => import("@/components/baseTable"),
  },
  data() {
    return {
      getToken: `Bearer ${getToken()}`,
      tableData: [],
      filterColums: [
        { label: "ip地址", prop: "ip", showOverflowTooltip: true },
        { label: "菜单路径", prop: "router_path", showOverflowTooltip: true },
        { label: "操作人", prop: "operator", showOverflowTooltip: true },
      ],
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
