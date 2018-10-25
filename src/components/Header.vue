<template>
  <div class="header-wrap clearfix">
    <div class="left-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="center-title">
      党建E家后台管理系统
    </div>
    <div class="right-dropdown">
       <el-dropdown trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="http://pbl.yaojunrong.com/FoTHXRGBhCd61yMbW4vY930wSbTp" class="avatar">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">修改信息</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    handleCommand(command) {
      if (command == 1) {
        this.$router.push('/layout/index')
      } else if (command == 2) {
        this.$axios.post('/admin/adminUser/logout').then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.$router.push({path: '/'})
          } else {
            this.$message.error(res.msg)
            this.$router.push({path: '/'})
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrap {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e1e1e1;
  padding: 0 15px;
  display: flex;
  align-items: center;

  .left-breadcrumb {
    flex: 1;
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
    }
    
  }
}
</style>
