<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="btn-area">
        <el-button type="primary" @click="addContent">内容添加</el-button>
      </div>
    </div>
    <div class="yidu-main">
      <el-table :data="tableData" border max-height="535" style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="60" align="center" />
        <el-table-column v-if="false" prop="id" label="id" />
        <el-table-column prop="content" label="通知内容" align="center" show-overflow-tooltip />
        <el-table-column label="通知类型" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.infotype === 1 ? "通知" : "重大事项" }}</template>
        </el-table-column>
        <el-table-column prop="release_time" label="发布时间" width="155" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.release_time) }}</template>
        </el-table-column>
        <el-table-column prop="last_updatetime" label="最后修改时间" width="155" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.last_updatetime) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 10px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper" />
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
  },
  data() {
    return {
      tableData: [],
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
    async sitelist(val) {
      if (val) {
        var { pagesize, pageindex } = val
      }
      const data = {
        pageindex: pageindex || this.currentPage,
        pagesize: pagesize || this.pageSize,
      }
      let res = await msgsiteList(data)
      if (res.success) {
        this.tableData = res.data.list
        this.currentPage = res.data.pageindex
        this.pageSize = res.data.pagesize
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
      this.sitelist({ pagesize: val })
    },
    handleCurrentChange(val) {
      this.sitelist({ pageindex: val })
    },
  },
}
</script>
