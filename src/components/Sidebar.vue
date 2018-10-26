<template>
  <div class="wrapper">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :collapse="isCollapse"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item index="/layout/index" class="nav-item">
        <template slot="title">
          <i class="el-icon-location"></i>
          首页
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>管理员管理</span>
        </template>
        <el-menu-item class="nav-item" index="/layout/userList">
          <i class="el-icon-edit"></i>
          管理员列表
        </el-menu-item>
        <el-menu-item class="nav-item" index="/layout/userAdd">
          <i class="el-icon-circle-plus"></i>
          添加管理员
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>新闻管理</span>
        </template>
        <el-menu-item class="nav-item" index="/layout/newsList">
          <i class="el-icon-edit"></i>
          新闻列表
        </el-menu-item>
        <el-menu-item class="nav-item" index="/layout/newsAdd">
          <i class="el-icon-circle-plus"></i>
          添加新闻
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-picture"></i>
          <span>轮播图管理</span>
        </template>
        <el-menu-item class="nav-item" index="/layout/swiperList">
          <i class="el-icon-edit"></i>
          轮播图列表
        </el-menu-item>
        <el-menu-item class="nav-item" index="/layout/swiperAdd">
          <i class="el-icon-circle-plus"></i>
          添加轮播图
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>评论管理</span>
        </template>
        <el-menu-item class="nav-item" index="/layout/topicList">
          <i class="el-icon-edit"></i>
          主题列表
        </el-menu-item>
        <el-menu-item class="nav-item" index="/layout/topicAdd">
          <i class="el-icon-circle-plus"></i>
          添加评论主题
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
      isCollapse: false
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
