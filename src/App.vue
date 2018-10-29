<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
clearfix {
  &::after{
    content: '';
    display: block;
    clear: both;
  }
}
a {
  text-decoration: none;
  color: rgb(191,203,217)
}

// 表格全局样式
.table-item-img {
  width: 80px;
  height: 80px;
}
.el-table {
  text-align: center;
}
.el-table th > .cell {
  text-align: center;
}
.el-table td > .cell {
  text-align: center;
}

// card 全局样式
.main-wrap .el-card {
  min-height: calc(100vh - 160px);
}

.page-wrap {
  margin-top: 10px;
  width: 500px;
  margin-right: auto;
  margin-left: auto;
}
</style>
