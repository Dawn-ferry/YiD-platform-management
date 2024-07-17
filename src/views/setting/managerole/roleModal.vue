<template>
  <div>
    <el-dialog title="添加角色权限" :visible="isHide" width="30%" center @close="$emit('close')">
      <el-form :model="form" label-width="100px">
        <el-form-item label="角色ID">
          <el-input v-model="form.roleid" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-tree :data="permissionsData" highlight-current show-checkbox default-expand-all :check-strictly="isCheck" empty-text="占无数据" node-key="id" ref="tree" :props="defaultProps" @check="handleNodeClick"></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRolePer } from "@/api/role"
import { permissionsList } from "@/api/permission"
export default {
  name: "roleModal",
  props: ["isHide", "backRoleData", "selectIds"],
  data() {
    return {
      form: {},
      permissionsData: [],
      permissionsIds: [],
      isCheck: false,
      defaultProps: {
        children: "children",
        label: "per_name",
      },
    }
  },
  watch: {
    selectIds: {
      handler(val) {
        this.isCheck = true
        this.permissionsIds = val
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.permissionsIds)
        })
      },
    },
  },

  mounted() {
    this.omsPermissionList()
    this.form = this.backRoleData ? { ...this.backRoleData } : {}
    this.permissionsIds = this.selectIds
    if (this.permissionsIds) {
      this.isCheck = true
    }
    this.$nextTick(() => {
      this.$refs.tree.setCheckedKeys(this.permissionsIds)
    })
  },

  methods: {
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3, 4])
    },

    handleNodeClick(data, checked) {
      this.isCheck = false
      this.permissionsIds = checked.checkedKeys.concat(checked.halfCheckedKeys)
    },
    async omsPermissionList() {
      const data = {
        status: "",
        pageindex: 1,
        pagesize: 100,
      }
      let res = await permissionsList(data)
      if (res.success) {
        this.permissionsData = res.data.list
      }
    },
    async submitFn() {
      let data = {
        ...this.form,
        id: this.form.roleid,
        role_perm_ids: this.permissionsIds || [],
      }
      let res = await addRolePer(data)
      if (!res.success) {
        this.$message.error(res.message)
        return
      }
      this.$message.success("角色权限添加成功")
      this.$emit("updateList")
      this.$emit("close")
    },
  },
}
</script>

<style></style>
