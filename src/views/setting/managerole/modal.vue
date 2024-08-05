<template>
  <div>
    <el-dialog :title="title" :visible="isShow" width="30%" center @close="$emit('close')">
      <el-form :model="form" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename" placeholder="请输入" size="small" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择" size="small" style="width: 100%">
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
import { roleAdd, roleEdit } from "@/api/role"
export default {
  name: "addRoleModal",
  props: ["isShow", "title", "backData", "dictData"],
  data() {
    return {
      form: {},
    }
  },
  mounted() {
    this.form = this.backData ? { ...this.backData } : {}
  },

  methods: {
    async submitFn() {
      let data = {
        ...this.form,
      }
      if (this.title === "添加角色") {
        let res = await roleAdd(data)
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success("角色添加成功")
      } else {
        let res = await roleEdit(data)
        if (!res.success) {
          this.$message.error(res.message)
          return
        }
        this.$message.success("角色编辑成功")
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
