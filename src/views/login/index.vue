<template>
  <div class="login">
    <div class="login-box">
      <h2>党建e家后台管理系统</h2>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formData.password" @keyup.enter.native="handleLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      formData: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  components: {

  },
  methods: {
    handleLogin() {
      this.$axios.post('/admin/adminUser/login',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          setTimeout(() => {
            this.$router.push('/layout/index')
          }, 1000);
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  overflow: hidden;
  height: 100vh;
  background: #2d3a4b;

  h2 {
    font-weight: normal;
    text-align: center;
    color: #fff;
  }

  .login-box {
    padding: 30px;
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #f1f1f1;
    margin: 200px auto;

    .login-btn {
      display: block;
      width: 100%;
      margin-top: 40px;
    }
  }

  /deep/ {
    .el-input {
      background: #2d3a4b;
      border: none;
    }

    .el-form-item__label {
      color: #fff;
    }
  }
}
</style>
