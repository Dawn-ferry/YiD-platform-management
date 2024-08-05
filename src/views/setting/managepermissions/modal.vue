<template>
  <div>
    <el-dialog :title="title" :visible="isShow" width="40%" center @close="$emit('close')" style="text-align: center;">
      <el-form :model="form" label-width="80px" style="display: flex;flex-direction: column;align-items: center;">
        <el-form-item label="权限名称">
          <el-input v-model="form.per_name" size="small" placeholder="请输入" style="width: 240px;" />
        </el-form-item>
        <el-form-item label="权限code">
          <el-input v-model="form.per_code" size="small" placeholder="请输入" style="width: 240px;" />
        </el-form-item>
        <el-form-item label="父级ID" v-if="form.parent_id || isParent">
          <el-select v-model="form.parent_id" placeholder="父级节点无需选择" clearable size="small" style="width: 240px;">
            <el-option v-for="item in parentIds" :key="item.id" :label="item.per_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.order_index" size="small" v-nsc placeholder="请输入" style="width: 240px;" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择" size="small" style="width: 240px;">
            <el-option :key="1" label="有效" :value="1" />
            <el-option :key="2" label="无效" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('close')">取 消</el-button>
        <el-button type="primary" size="small" @click="submitFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { permissionsEdit, permissionsAdd } from "@/api/permission"
import { asyncRoutes } from "@/router/asyncRoutes"
export default {
  name: "addPermissionModal",
  props: ["isShow", "title", "backData", "dictData", "parentIds"],
  data() {
    return {
      form: {},
      asyncRoutes,
    }
  },
  computed: {
    isParent() {
      let val = this.title == "添加权限" ? true : false
      return val
    },
  },
  mounted() {
    this.form = this.backData ? { ...this.backData } : {}
  },

  methods: {
    async submitFn() {
      let data = {
        ...this.form,
      }
      if (this.title === "添加权限") {
        let res = await permissionsAdd(data)
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success("权限添加成功")
      } else {
        let res = await permissionsEdit(data)
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success("权限编辑成功")
      }
      this.$emit("updateList")
      this.$emit("close")
    },
    closeFn() {
      this.$emit("close")
    },
  },
}
</script>

<style></style>
