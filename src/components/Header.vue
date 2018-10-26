<template>
  <div class="header-wrap clearfix">
    <div class="left-breadcrumb">
      <BreadCrumb/>
    </div>
    <div class="center-title">
      党建E家后台管理系统
    </div>
    <div class="right-dropdown">
       <el-dropdown trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="userInfo.avatar" class="avatar">
          <span>{{userInfo.nickname}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">返回首页</el-dropdown-item>
          <el-dropdown-item command="1">修改信息</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import {mapState} from 'vuex'

export default {
  name:'',
  data() {
    return {

    }
  },
  components: {
    BreadCrumb
  },
  methods: {
    handleCommand(command) {
      if (command == 1) {
        this.$router.push(`/layout/userEdit?id=${this.$store.state.userInfo.id}`)
      } else if (command == 2) {
        this.$axios.post('/admin/adminUser/logout').then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.$store.commit('CHANGE_userInfo',{username: '',avatar: '',id: ''})
            this.$router.push({path: '/'})
          } else {
            this.$message.error(res.msg)
            this.$router.push({path: '/'})
          }
        })
      } else if (command == 0) {
        this.$router.push('/layout/index')
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
.header-wrap {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e1e1e1;
  padding: 0 15px;
  display: flex;
  align-items: center;

  .left-breadcrumb {
    flex: 1;
    height: 50px;
  }

  .center-title {
    flex: 1;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
  }

  .right-dropdown{
    display: flex;
    justify-content: flex-end;
    flex:1;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      top: 5px;
      right: 100px;
    }
    
  }
}
</style>
