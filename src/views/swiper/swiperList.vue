<template>
  <div class="swiper-list">
    <el-card>
      <template slot="header">轮播图列表</template>
      <el-table :data="tableData" border
        v-loading.fullscreen="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="轮播图头图" prop="img" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="轮播图标题" prop="title" width="240"></el-table-column>
        <el-table-column label="新闻标题" prop="newsId.title" width="200"></el-table-column>
        <el-table-column label="排序" prop="sort" width="120"></el-table-column>
        <el-table-column label="是否显示" prop="status" width="120">
          <template slot-scope="scope">
            {{scope.row.status ? '显示' : '不显示'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row._id)" size="mini">
              编辑
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">
              删除
            </el-button>
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
      total: 0,
      page: 1,
      loading: false
    }
  },
  components: {

  },
  methods: {
    getTableData() {
      this.loading = true
      this.$axios.get('/admin/swiper',{page: this.page,page_size:5}).then(res => {
        if (res.code == 200) {
          this.loading = false
          this.total = res.total
          this.tableData = res.data
        } else {
          this.loading = false
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.loading = false
      })
    },
    handleEdit(id) {
      this.$router.push({path: 'swiperEdit',query: {id}})
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/admin/swiper/${id}`).then(res => {
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
