<template>
  <div>
    <el-dialog :title="title" :visible="isShow" width="30%" center @close="$emit('close')">
      <el-form :model="form" :rules="rules" ref="siteform" label-width="100px">
        <el-form-item label="发布内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入" type="textarea" :rows="5" id="content" />
        </el-form-item>
        <el-form-item label="发布类型" prop="infotype">
          <el-select v-model="form.infotype" placeholder="请选择" id="infotype" style="width: 100%">
            <el-option :key="1" label="通知" :value="1"></el-option>
            <el-option :key="2" label="重大事项" :value="2"></el-option>
          </el-select>
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
import { msgsiteAdd, msgsiteUpdate } from "@/api/msgsite"
export default {
  name: "modal",
  props: ["isShow", "title", "backData"],
  data() {
    return {
      form: {},
      rules: {
        content: [{ required: true, message: "请输入", trigger: "blur" }],
        infotype: [{ required: true, message: "请输入", trigger: "change" }],
      },
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
      let that = this
      this.$refs["siteform"].validate(async (valid) => {
        if (valid) {
          if (that.title === "添加内容") {
            let res = await msgsiteAdd(data)
            if (!res.success) {
              that.$message.error(res.message)
              return
            }
            that.$message.success("添加成功")
          } else {
            let res = await msgsiteUpdate(data)
            if (!res.success) {
              that.$message.error(res.message)
              return
            }
            that.$message.success("编辑成功")
          }
          this.$emit("updateList")
          this.$emit("close")
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style scoped></style>
