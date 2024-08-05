<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="search-area">
        <el-form ref="searchForm" :model="searchForm" label-width="50px">
          <el-form-item label="账号" label-width="50px">
            <el-input v-model="searchForm.username" size="small" style="width: 180px;" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="searchForm.realname" size="small" style="width: 180px;" />
          </el-form-item>
          <div class="search-btn">
            <el-button type="primary" size="small" icon="el-icon-search" @click="omsList">查询</el-button>
            <el-button size="small" icon="el-icon-refresh" @click="resetForm">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="btn-area">
        <div class="left">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addUser">添加用户</el-button>
        </div>
        <div class="right"></div>
      </div>
    </div>
    <div class="yidu-main">
      <el-table :data="tableData" border max-height="550px" style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="60" align="center" />
        <el-table-column v-if="false" prop="id" label="用户id" width="80" align="center" />
        <el-table-column prop="username" label="帐号" show-overflow-tooltip align="center" />
        <el-table-column prop="password" label="密码" show-overflow-tooltip align="center" />
        <el-table-column prop="realname" label="姓名" show-overflow-tooltip align="center" />
        <el-table-column prop="isadmin" label="身份" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{ scope.row.isadmin ? "管理者" : "员工" }}</template>
        </el-table-column>
        <el-table-column prop="roleid" label="角色id" align="center" />
        <el-table-column label="所属部门" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ depToName(scope.row.departmentids) }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? "有效" : "无效" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="roleid === 1" prop="logincount" label="登陆次数" width="120" align="center" />
        <el-table-column v-if="roleid === 1" prop="last_logintime" label="最后登录时间" width="200" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.last_logintime) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <Modal
      v-if="isShow"
      :isShow="isShow"
      :title="title"
      :backData="backData"
      :roleData="roleData"
      @close="isShow = false"
      @updateList="omsList"
    />
  </div>
</template>

<script>
import { OmsUser, DeleteUser } from "@/api/setting"
import { roleList } from "@/api/role"
import { foundNode } from "@/utils/tool"

export default {
  name: "userinfo",
  components: {
    Modal: () => import("./modal.vue"),
  },

  data() {
    return {
      tableData: [],
      searchForm: {},
      isShow: false,
      title: "",
      dictData: null,
      backData: null,
      currentPage: 1,
      pageSize: 10,
      total: 10,
      roleData: [],
      roleid: this.$store.getters.userInfo.roleid,
    }
  },

  mounted() {
    this.omsList()
    this.roleList()
  },

  methods: {
    depToName(val) {
      if (val) {
        let depArr = []
        let idArr = JSON.parse(val)
        idArr.map((element) => {
          let res = element.toString()
          let obj = foundNode(res)
          depArr.push(obj.departmentName)
        })
        return String(depArr)
      }
      return val
    },
    async roleList() {
      const data = {
        role_name: "",
        status: "",
        pageindex: 1,
        pagesize: 100,
      }
      let res = await roleList(data)
      if (res.success) {
        this.roleData = res.data.list
        return
      }
      this.roleData = []
    },
    resetForm() {
      this.searchForm = {}
      this.omsList()
    },
    async omsList(val) {
      if (val) {
        var { pagesize, pageindex } = val
      }
      let { username, realname } = this.searchForm
      const data = {
        username: username || "",
        realname: realname || "",
        status: "",
        roleid: "",
        pageindex: pageindex || this.currentPage,
        pagesize: pagesize || this.pageSize,
      }
      let res = await OmsUser(data)
      if (res.success) {
        let { data } = res
        this.tableData = data.list
        this.currentPage = data.pageindex
        this.pageSize = data.pagesize
        this.total = data.pagetotal
      }
    },
    addUser() {
      this.isShow = true
      this.title = "添加用户"
      this.backData = null
    },

    editFn(row) {
      this.title = "编辑用户"
      this.isShow = true
      let { username, realname, roleid, status, id, isadmin, departmentids } = row
      this.backData = { username, password: "", realname, roleid, status, id, isadmin, departmentids }
    },
    async delFn(row) {
      let that = this
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async function () {
          let res = await DeleteUser({ id: row.id })
          if (res.success) {
            that.$message.success("删除成功!")
            that.omsList()
            return
          }
          that.$message.info(res.message)
        })
        .catch(() => {
          this.$message.info("已取消删除")
        })
    },
    handleSizeChange(val) {
      this.omsList({ pagesize: val })
    },
    handleCurrentChange(val) {
      this.omsList({ pageindex: val })
    },
  },
}
</script>
<style lang="scss" ></style>