<template>
  <div class="list-wrap">
    <el-card>
      <div slot="header">
        管理员列表
      </div>
      <el-table :data="userData" border>
        <el-table-column label="姓名" prop="nickname" width="150"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="200"></el-table-column>
        <el-table-column label="头像" prop="avatar">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex" width="150">
          <template slot-scope="scope">
            {{scope.row.sex ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column label="个性签名" prop="desc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">查看详细</el-button>
            <el-button type="danger" size="mini">删除管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      userData: []
    }
  },
  components: {

  },
  methods: {
    getUserData() {
      this.$axios.get('/admin/adminUser').then(res => {
        if (res.code == 200) {
          this.userData = res.data
        } else {
          this.$message.info('数据请求失败')
        }
      })
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style scoped>
</style>
