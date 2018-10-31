<template>
  <div class="list-wrap">
    <div>
      <el-input type="text" v-model="keyword"></el-input>
    </div>
    <el-card>
      <div slot="header">
        管理员列表
      </div>
      <el-table :data="filteredList" border
        v-loading.fullscreen="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="姓名" prop="nickname" width="150"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="180"></el-table-column>
        <el-table-column label="头像" prop="avatar" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex" width="150">
          <template slot-scope="scope">
            {{scope.row.sex ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column label="个性签名" prop="desc" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详细</el-button>
            <el-button type="warning" size="mini" @click="handleEdit(scope.row._id)">编辑信息</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row._id)">删除管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      userData: [],
      total: 0,
      page: 1,
      loading: false,
      keyword: ''
    }
  },
  components: {

  },
  methods: {
    getUserData() {
      this.loading = true
      this.$axios.get('/admin/adminUser',{page: this.page,page_size: 5}).then(res => {
        if (res.code == 200) {
          this.loading = false
          this.userData = res.data
          this.total = res.total
        } else {
          this.loading = false
          this.$message.info('数据请求失败')
        }
      }).catch(err => {
        this.loading = false
      })
    },
    handleDetail() {},
    handleRemove(id) {
      this.$confirm('此操作将永久删除该管理员信息，是否继续?','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(res => {
        this.$axios.delete(`/admin/adminUser?id=${id}`).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.getUserData()
          }
        }).catch(() => {
          this.$message.info(res.msg)
        })
      })
    },
    handleEdit(id) {
      this.$router.push({name: 'userEdit',query: {id}})
    },
    handleDetail(id) {
      this.$router.push(`/layout/userDetail/${id}`)
    },
    pageChange(page) {
      this.page = page
      this.getUserData()
    }
  },
  created() {
    this.getUserData()
  },
  computed: {
    filteredList() {
      return this.userData.filter(item => {
        return item.nickname.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss">

</style>
