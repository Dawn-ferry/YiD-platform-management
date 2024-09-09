<template>
  <div class="yidu-container">
    <div class="yidu-header">
      <div class="btn-area">
        <el-button type="primary" size="small" @click="addFn">添加权限</el-button>
      </div>
    </div>
    <div class="yidu-main">
      <BaseTable :tableData="tableData" :filterColums="filterColums" :rowkey="'id'" border :defaultExpandAll="true" :treeProps="{ children: 'children', hasChildren: 'hasChildren' }" :height="600" style="width: 100%; height: 100%">
        <template v-slot:beforeCol>
          <el-table-column type="index" width="60" align="center" />
        </template>
        <template v-slot:tableBody="{ scopeData: { row, column } }">
          <template v-if="column.property === 'status'">
            <el-tag :type="row.status ? 'success' : 'danger'">{{ row.status ? "有效" : "无效" }}</el-tag>
          </template>
          <template v-else-if="column.property === 'create_time'">{{ $formatDate(row.create_time) }}</template>
          <template v-else-if="column.property === 'last_updatetime'">{{ $formatDate(row.last_updatetime) }}</template>
          <template v-else-if="column.property === 'edit'">
            <el-button type="text" size="small" @click="editFn(row)">编辑</el-button>
          </template>
        </template>
      </BaseTable>
      <!-- <el-table :data="tableData" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" max-height="550px">
        <el-table-column fixed prop="id" label="权限id" align="center" />
        <el-table-column prop="per_code" label="基础权限code" width="120" show-overflow-tooltip align="center" />
        <el-table-column prop="per_name" label="基础权限名称" width="120" show-overflow-tooltip align="center" />
        <el-table-column prop="parent_id" label="父级id" align="center" />
        <el-table-column prop="route" label="路由" width="120" show-overflow-tooltip align="center" />
        <el-table-column align="center" label="状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? "有效" : "无效" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="order_index" label="排序" width="120" align="center" />
        <el-table-column label="创建时间" width="180" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.create_time) }}</template>
        </el-table-column>
        <el-table-column label="最后修改时间" width="180" align="center">
          <template slot-scope="scope">{{ $formatDate(scope.row.last_updatetime) }}</template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table> -->
    </div>

    <Modal v-if="isShow" :isShow="isShow" :title="title" :parentIds="parentIds" :backData="backData" :dictData="dictData" @close="isShow = false" @updateList="omsPermissionList" />
  </div>
</template>

<script>
import { permissionsList } from "@/api/permission"
export default {
  name: "permissionsinfo",
  components: {
    Modal: () => import("./modal.vue"),
    BaseTable: () => import("@/components/baseTable"),
  },
  data() {
    return {
      tableData: [],
      filterColums: [
        { label: "权限id", prop: "id", width: "70", hasChildren: true },
        { label: "基础权限code", prop: "per_code", showOverflowTooltip: true, width: "120" },
        { label: "基础权限名称", prop: "per_name" },
        { label: "父级id", prop: "parent_id" },
        { label: "路由", prop: "route" },
        { label: "状态", prop: "status" },
        { label: "排序", prop: "order_index" },
        { label: "创建时间", prop: "create_time" },
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
      dictData: null,
      backData: null,
      parentIds: [],
      currentPage: 1,
      pageSize: 10,
      total: 10,
    }
  },

  mounted() {
    this.omsPermissionList()
  },

  methods: {
    async omsPermissionList(val) {
      if (val) {
        var { pagesize, pageindex } = val
      }
      const data = {
        status: "",
        pageindex: pageindex || this.currentPage,
        pagesize: pagesize || this.pageSize,
      }
      let res = await permissionsList(data)
      if (res.code === 100) {
        this.tableData = res.data.list
        this.parentIds = res.data.list
      }
    },
    addFn() {
      this.isShow = true
      this.title = "添加权限"
      this.backData = null
    },

    editFn(row) {
      this.title = "编辑权限"
      this.isShow = true
      let { per_code, per_name, order_index, status, id, parent_id } = row
      this.backData = { per_code, per_name, order_index, status, id, parent_id }
    },
  },
}
</script>
<style lang="scss" scoped></style>
