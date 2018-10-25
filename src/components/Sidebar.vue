<template>
  <div class="wrapper">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/layout/index" class="nav-item">
        <template slot="title">
          <i class="el-icon-location"></i>
          <router-link to="/layout/index">首页</router-link>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>管理员管理</span>
        </template>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-edit"></i>
          <router-link to="/layout/userList">管理员列表</router-link>
        </el-menu-item>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-circle-plus"></i>
          <router-link to="/layout/userAdd">添加管理员</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>新闻管理</span>
        </template>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-edit"></i>
          <router-link to="/layout/newsList">新闻列表</router-link>
        </el-menu-item>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-circle-plus"></i>
          <router-link to="/layout/newsAdd">添加新闻</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-picture"></i>
          <span>轮播图管理</span>
        </template>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-edit"></i>
          <router-link to="/layout/swiperList">轮播图列表</router-link>
        </el-menu-item>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-circle-plus"></i>
          <router-link to="/layout/swiperAdd">添加轮播图</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>评论管理</span>
        </template>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-edit"></i>
          <router-link to="/layout/topicList">主题列表</router-link>
        </el-menu-item>
        <el-menu-item class="nav-item" index="/">
          <i class="el-icon-circle-plus"></i>
          <router-link to="/layout/topicAdd">添加评论主题</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
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

  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  background: #304156;

  .nav-item {
    display: block;
    width: 100%;
    height: 100%;
    background: #1f2d3d!important;
  }

  /deep/ {
    .el-menu {
      border-right:none;
    }
  }
}
</style>
