<template>
  <div>
    <el-dialog :title="title" :visible="isShow" width="50%" center @close="$emit('close')">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="用户姓名">
              <el-input v-model="userForm.realname" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model.trim="userForm.oldPassword" placeholder="请输入" id="oldPassword" show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model.trim="userForm.newPassword" placeholder="请输入" id="newPassword" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="密码确认:" prop="passwordAffirm">
              <el-input v-model.trim="userForm.passwordAffirm" placeholder="请输入" id="passwordAffirm" show-password />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="submitFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { personChangePWD } from "@/api/user"
export default {
  name: "changePWD",
  props: ["title", "isShow"],
  data() {
    return {
      userForm: {
        realname: this.$store.getters.userInfo.username,
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位数密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位数密码", trigger: "blur" },
        ],
        passwordAffirm: [
          { required: true, message: "请输入密码确认", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位数密码", trigger: "blur" },
        ],
      },
    }
  },
  mounted() {},

  methods: {
    async logout() {
      await this.$store.dispatch("user/logout")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    submitFn() {
      let that = this
      this.$refs["userForm"].validate(async (valid) => {
        if (valid) {
          let setData = {
            id: this.$store.getters.userInfo.id,
            ...this.userForm,
          }
          let res = await personChangePWD(setData)
          if (!res.success) {
            that.$message.error(res.message)
            return
          }
          that.$message.success("密码修改成功,请重新登录")
          that.$emit("close")
          setTimeout(() => {
            that.logout()
          }, 1500)
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
  },
}
</script>

<style></style>
