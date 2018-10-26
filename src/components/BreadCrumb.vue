<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect === 'noredirect'||index==levelList.length-1" class="no-redirect">
          {{item.meta.title}}
        </span>
        <router-link v-else :to="item.redirect||item.path">
          {{item.meta.title}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  name:'',
  data() {
    return {
      levelList: null
    }
  },
  components: {

  },
  methods: {
    getBreadCrumb() {
      const {params} = this.$route
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      const first = matched[0]
      if (first && first.name !== 'layout') {
        matched = [{ path: '/layout/index', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  },
  watch: {
    $route() {
      this.getBreadCrumb()
    }
  },
  created() {
    this.getBreadCrumb()
  }
}
</script>

<style scoped lang="scss">
.breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
