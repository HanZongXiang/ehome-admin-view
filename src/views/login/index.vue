<template>
  <div class="login">
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    <div class="login-box">
      <h2>欢迎来到后台管理系统</h2>
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
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

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
  },
  created() {
    document.documentElement.style.overflow = 'hidden'
  }
}
</script>

<style scoped lang="scss">
.login {
  overflow: hidden;
  height: 100%;

  #particles-js {
    background-image: url(/static/sky.871d198.jpg);
    background-size: 100%,100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 998;

    .login-btn {
      display: block;
      width: 100%;
    }
  }

  /deep/ {
    .el-input {
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
