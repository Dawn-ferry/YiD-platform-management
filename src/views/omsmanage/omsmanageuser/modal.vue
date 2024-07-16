<template>
  <div>
    <el-dialog :title="title" :visible="isShow" width="50%" style="height: 98%" center @close="$emit('close')">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="账号" prop="username" id="username">
              <el-input
                v-model="form.username"
                :disabled="isDisable"
                placeholder="请输入"
                @input="
                  (e) => {
                    form.username = validForbid(e)
                  }
                "
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" :prop="isDisable ? '' : 'password'" id="password">
              <el-input v-model="form.password" :placeholder="isDisable ? '更改密码输入' : '请输入'" show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="realname" id="realname">
              <el-input v-model="form.realname" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色id" prop="roleid" id="roleid">
              <el-select v-model="form.roleid" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in roleArr" :key="item.id" :label="item.rolename" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门" prop="departmentids" id="departmentids">
              <el-cascader
                v-model="form.departmentids"
                :options="options"
                :props="{
                  label: 'departmentName',
                  value: 'id',
                  multiple: true,
                }"
                collapse-tags
                clearable
                @change="handleChange"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否设管理员" prop="isadmin" id="isadmin" label-width="120px">
              <el-select v-model="form.isadmin" placeholder="请选择" style="width: 100%">
                <el-option :key="1" label="是" :value="1" />
                <el-option :key="2" label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="status" id="status">
              <el-select v-model="form.status" placeholder="请选择" style="width: 100%">
                <el-option :key="1" label="有效" :value="1" />
                <el-option :key="2" label="无效" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
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
import { AddUser, UpdateUser } from "@/api/oms"
export default {
  name: "addUserModal",
  props: ["isShow", "title", "backData", "roleData"],
  data() {
    return {
      form: {},
      options: [],
      rules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        realname: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 6, max: 6, message: "请将密码控制在6位数", trigger: "blur" },
        ],
        roleid: [{ required: true, message: "请选择", trigger: "change" }],
        departmentids: [{ required: true, message: "请选择", trigger: "change" }],
        isadmin: [{ required: true, message: "请选择", trigger: "change" }],
        status: [{ required: true, message: "请选择", trigger: "change" }],
      },
      roleArr: [],
      depList: this.$store.getters.depList,
    }
  },
  computed: {
    isDisable() {
      let val = this.title == "添加用户" ? false : true
      return val
    },
  },
  mounted() {
    this.form = this.backData
      ? {
          ...this.backData,
          departmentids: JSON.parse(this.backData.departmentids),
        }
      : { status: 1, isadmin: 0 }
    this.options = this.deldepList(this.depList)
    this.delrole(this.roleData)
  },

  methods: {
    delrole(arr) {
      let roleid = this.$store.getters.userInfo.roleid
      if (roleid !== 1) {
        arr.forEach((item) => {
          if (item.id !== 1) {
            this.roleArr.push(item)
          }
        })
      } else {
        this.roleArr = this.roleData
      }
    },
    deldepList(tree) {
      if (tree && Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].children && !tree[i].children.length) {
            tree[i].children = null
          } else {
            this.deldepList(tree[i].children)
          }
        }
      }
      return tree
    },
    handleChange(val) {
      if (val) {
        this.form.departmentids = val
      }
    },

    submitFn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let data = {
            ...this.form,
          }
          if (this.title === "添加用户") {
            let res = await AddUser(data)
            if (!res.success) {
              this.$message.error(res.message)
              return
            }
            this.$message.success("用户添加成功")
          } else {
            let res = await UpdateUser(data)
            if (!res.success) {
              this.$message.error(res.message)
              return
            }
            this.$message.success("用户编辑成功")
          }
          this.$emit("updateList")
          this.$emit("close")
        } else {
          return false
        }
      })
    },
    closeFn() {
      this.$emit("close")
    },
  },
}
</script>
