<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="btn-area">
        <el-button type="primary" size="small" @click="addFn">添加角色</el-button>
      </div>
    </div>
    <div class="yidu-main">
      <el-table :data="tableData" border max-height="550px" style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="60" align="center" />
        <el-table-column v-if="false" prop="id" label="角色id" width="80" />
        <el-table-column prop="rolename" label="角色名称" align="center" />
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? "有效" : "无效" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.create_time) }}</template>
        </el-table-column>
        <el-table-column label="最后修改时间" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.last_updatetime) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFn(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="addRolePermissions(scope.row)">添加角色权限</el-button>
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
      ></el-pagination>
    </div>
    <Modal
      v-if="isShow"
      :isShow="isShow"
      :title="title"
      :backData="backData"
      :dictData="dictData"
      @close="isShow = false"
      @updateList="roleList"
    />
    <RoleModal
      v-if="isHide"
      :isHide="isHide"
      :selectIds="selectIds"
      :backRoleData="backRoleData"
      @updateList="roleList"
      @close="isHide = false"
    />
  </div>
</template>

<script>
import { roleList } from "@/api/role"
export default {
  name: "roleinfo",
  components: {
    Modal: () => import("./modal.vue"),
    RoleModal: () => import("./roleModal.vue"),
  },
  data() {
    return {
      tableData: [],
      isShow: false,
      title: "",
      dictData: null,
      backData: null,
      isHide: false,
      backRoleData: null,
      permissionData: null,
      selectIds: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
    }
  },

  mounted() {
    this.roleList()
  },

  methods: {
    addRolePermissions(val) {
      this.selectIds = []
      if (val) {
        this.selectIds = val.role_perm_ids ? JSON.parse(val.role_perm_ids) : []
        this.backRoleData = {
          roleid: val.id ? val.id : "",
          rolename: val.rolename ? val.rolename : "",
        }

        this.isHide = true
      }
    },
    async roleList(val) {
      if (val) {
        var { pagesize, pageindex } = val
      }
      const data = {
        rolename: "",
        status: "",
        pageindex: pageindex || this.currentPage,
        pagesize: pagesize || this.pageSize,
      }
      let res = await roleList(data)
      if (!res.success) {
        this.$message.error(res.message)
        this.tableData = []
        return
      }
      this.tableData = res.data.list
      this.currentPage = res.data.pageindex
      this.pageSize = res.data.pagesize
      this.total = res.data.pagetotal
    },
    addFn() {
      this.isShow = true
      this.title = "添加角色"
      this.backData = null
    },

    editFn(row) {
      this.title = "编辑角色"
      this.isShow = true
      let { rolename, status, id } = row
      this.backData = { rolename, status, id }
    },
    handleSizeChange(val) {
      this.roleList({ pagesize: val })
    },
    handleCurrentChange(val) {
      this.roleList({ pageindex: val })
    },
  },
}
</script>
<style lang="scss" scoped></style>
