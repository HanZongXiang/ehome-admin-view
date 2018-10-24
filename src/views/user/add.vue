<template>
  <div class="admin-add">
    <el-card>
      <div slot="header">
        添加管理员
      </div>
      <el-form :model="formData" label-width="80px" label-position="left">
        <el-form-item label="上传头像">
          <upload v-model="formData.avatar"></upload>
        </el-form-item>
        <el-form-item label="用户名" required>
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.sex">
            <el-option value="1" label="男"></el-option>
            <el-option value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="formData.desc" @keyup.enter.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import upload from '@/components/Upload'

export default {
  name:'',
  data() {
    return {
      formData: {
        avatar: '',
        username: '',
        password: '',
        nickname: '',
        sex: '',
        desc: ''
      }
    }
  },
  components: {
    upload
  },
  methods: {
    handleSubmit() {
      this.$axios.post('/admin/adminUser',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/layout/userList')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
