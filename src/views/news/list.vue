<template>
  <div class="list-wrap">
    <el-card>
      <div slot="header">
        <span>新闻列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addCategory">
          <i class="el-icon-circle-plus"></i>添加新闻分类
        </el-button>
      </div>
      <el-table :data="tableData" border
        v-loading.fullscreen="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="新闻标题" prop="title" width="260px">

        </el-table-column>
        <el-table-column label="作者" prop="author.nickname" width="200px">

        </el-table-column>
        <el-table-column label="新闻头图" width="200px">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="新闻分类" prop="type.title" width="200px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详细</el-button>
            <el-button type="warning" size="mini" @click="handleEdit(scope.row._id)">编辑新闻</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">删除新闻</el-button>
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
      this.$axios.get('/admin/news',{page: this.page,page_size:5}).then(res => {
        if (res.code == 200) {
          this.loading = false
          this.tableData =res.data
          this.total = res.total
        } else {
          this.loading = false
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.loading = false
      })
    },
    handleDetail(id) {
      this.$router.push(`/layout/newsDetail/${id}`)
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该新闻条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/admin/news/${id}`).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.getTableData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    addCategory() {
      this.$prompt('请输入分类标题', '添加分类', {
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(( data ) => {
        console.log(data.value)
        this.$axios.post('/admin/category',{title: data.value}).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        });       
      });
    },
    handleEdit(id) {
      this.$router.push(`/layout/newsEdit/${id}`)
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
