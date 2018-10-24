<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="4" style="height: 100vh">
        <Sidebar></Sidebar>
      </el-col>
      <el-col :span="20" style="height: 100vh;overflow-y: scroll">
        <Header></Header>
        <AppMain></AppMain>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import AppMain from '@/components/AppMain'

export default {
  name:'',
  data() {
    return {

    }
  },
  components: {
    Header,
    Sidebar,
    AppMain
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
/deep/ .el-row{
  height: 100vh;
}
</style>
