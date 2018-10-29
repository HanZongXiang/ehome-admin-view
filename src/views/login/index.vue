<template>
  <div class="login">
    <div class="login-box">
      <h2>党建e家后台管理系统</h2>
      <el-form ref="form" label-width="70px" label-position="left" :model="formData" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" @keyup.enter.native="validateLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="validateLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    const validator1 = (rule,value,callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if(value.length < 5) {
        callback(new Error('用户名长度过短'))
      } else {
        callback()
      }
    };
    const validator2 = (rule,value,callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if(value && value.length < 5) {
        callback(new Error('密码长度过短'))
      } else {
        callback()
      }
    }
    
    return {
      loading: false,
      formData: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
          username: [
            { validator: validator1, trigger: 'blur' }
          ],
          password: [
            { validator: validator2, trigger: 'blur' }
          ]
        }
    }
  },
  components: {

  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$axios.post('/admin/adminUser/login',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          let userInfo = {
            username: res.data.username,
            avatar: res.data.avatar,
            id: res.data.id,
            nickname: res.data.nickname
          }
          this.$store.commit('CHANGE_userInfo',userInfo)
          this.loading = false
          setTimeout(() => {
            this.$router.push('/layout/index')
          }, 1000);
        } else {
          this.loading = false
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.loading = false
      })
    },
    validateLogin() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.handleLogin()
        } else {
          return false
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
    margin-bottom: 35px;
  }

  .login-box {
    padding: 30px;
    width: 500px;
    height: 350px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #f1f1f1;
    margin: 200px auto;

    .login-btn {
      display: block;
      width: 100%;
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

    .el-form-item {
      margin-bottom: 50px;
    }
  }
}
</style>
