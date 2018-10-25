<template>
  <div class="list-wrap">
    <el-card>
      <div slot="header">主题列表</div>
      <el-table :data="tableData" border>
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
            <el-button type="warning" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row._id)">删除</el-button>
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
      tableData: [],
      page: 1,
      page_size: 10
    }
  },
  components: {

  },
  methods: {
    getTableData() {
      let page = this.page
      let page_size = this.page_size
      this.$axios.get('/admin/topic',{page,page_size}).then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addComment(id) {
      this.$prompt('请输入评论内容', '添加评论', {
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(( data ) => {
        console.log(data.value)
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
          this.$message.info(res.msg)
        })
      })
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped>
</style>
