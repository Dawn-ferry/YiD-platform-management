<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="btn-area">
        <el-button type="primary" size="small" @click="addContent">内容添加</el-button>
      </div>
    </div>
    <div class="yidu-main">
      <BaseTable :tableData="tableData" :filterColums="filterColums">
        <template v-slot:beforeCol>
          <el-table-column type="index" width="60" align="center" />
        </template>
        <template v-slot:tableBody="{ scopeData: { row, column } }">
          <template v-if="column.property === 'infotype'">{{ row.infotype === 1 ? "通知" : "重大事项" }}</template>
          <template v-else-if="column.property === 'release_time'">{{ $formatDate(row.release_time) }}</template>
          <template v-else-if="column.property === 'last_updatetime'">{{ $formatDate(row.last_updatetime) }}</template>
          <template v-else-if="column.property === 'edit'">
            <el-button type="text" size="small" @click="editFn(row)">编辑</el-button>
            <el-button type="text" size="small" @click="delFn(row)">删除</el-button>
          </template>
        </template>
      </BaseTable>
      <el-pagination style="margin-top: 10px; text-align: left" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper" />
    </div>
    <Modal v-if="isShow" :isShow="isShow" :title="title" :backData="backData" @updateList="sitelist" @close="isShow = false" />
  </div>
</template>

<script>
import { msgsiteList, msgsiteDelet } from "@/api/msgsite"
export default {
  name: "notificationStationManage",
  components: {
    Modal: () => import("./modal.vue"),
    BaseTable: () => import("@/components/baseTable"),
  },

  data() {
    return {
      tableData: [],
      filterColums: [
        { label: "id", prop: "id", width: "60" },
        { label: "通知内容", prop: "content", showOverflowTooltip: true },
        { label: "通知类型", prop: "infotype" },
        { label: "发布时间", prop: "release_time" },
        { label: "最后修改时间", prop: "last_updatetime" },
        {
          label: "操作",
          prop: "edit",
          fixed: "right",
          width: "180",
        },
      ],
      isShow: false,
      title: "",
      backData: null,
      currentPage: 1,
      pageSize: 10,
      total: 10,
    }
  },
  mounted() {
    this.sitelist()
  },
  methods: {
    addContent() {
      this.isShow = true
      this.title = "添加内容"
      this.backData = null
    },
    resetForm() {
      this.searchForm = {}
      this.sitelist()
    },
    async sitelist() {
      const data = {
        pageindex: this.currentPage,
        pagesize: this.pageSize,
      }
      let res = await msgsiteList(data)
      if (res.success) {
        this.tableData = res.data.list
        this.total = res.data.pagetotal
        return
      }
      this.tableData = []
    },

    editFn(row) {
      this.title = "编辑内容"
      this.isShow = true
      this.backData = { ...row }
    },
    async delFn(row) {
      let that = this
      this.$confirm("此操作将永久删除该条内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async function () {
          let res = await msgsiteDelet({ id: row.id })
          if (!res.success) {
            that.$message.error(res.message)
            return
          }
          that.$message.success("删除成功!")
          that.sitelist()
        })
        .catch(() => {
          that.$message.info("已取消删除")
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.sitelist()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.sitelist()
    },
  },
}
</script>
