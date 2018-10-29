<template>
  <div class="list-wrap">
    <el-card>
      <div slot="header">主题列表</div>
      <el-table :data="tableData" border
        v-loading.fullscreen="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="主题内容" prop="content">

        </el-table-column>
        <el-table-column label="发布人" prop="user.username" width="160"></el-table-column>
        <el-table-column label="头像" prop="user">
          <template slot-scope="scope">
            <img :src="scope.row.user.avatar" v-if="scope.row.user" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="评论列表" prop="comment">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.comment" :key="index">{{item.content}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addComment(scope.row._id)">添加评论</el-button>
            <el-button type="warning" size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row._id)">删除</el-button>
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
      tableData: [],
      page: 1,
      total: 0,
      loading: false
    }
  },
  components: {

  },
  methods: {
    getTableData() {
      this.loading = true
      let page = this.page
      this.$axios.get('/admin/topic',{page,page_size: 5}).then(res => {
        this.loading = false
        if (res.code == 200) {
          this.total = res.count
          this.tableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.loading = false
      })
    },
    addComment(id) {
      this.$prompt('请输入评论内容', '添加评论', {
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(( data ) => {
        this.$axios.post('/admin/comment',{content: data.value,topicId: id}).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.getTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        });       
      });
    },
    handleRemove(id) {
      this.$confirm('此操作将永久删除该主题信息，是否继续?','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(res => {
        this.$axios.delete(`/admin/topic?id=${id}`).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.getTableData()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        })
      })
    },
    handleEdit(id) {
      this.$router.push(`/layout/topicEdit/${id}`)
    },
    pageChange(page) {
      this.page = page
      this.getTableData()
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped>
</style>
