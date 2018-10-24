<template>
  <div class="swiper-list">
    <el-card>
      <template slot="header">轮播图列表</template>
      <el-table :data="tableData" border>
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
            <el-button type="primary" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="danger">删除</el-button>
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
      tableData: []
    }
  },
  components: {

  },
  methods: {
    getTableData() {
      this.$axios.get('/admin/swiper').then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    
    handleEdit(id) {
      this.$router.push({path: 'swiperEdit',query: {id}})
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped>
</style>
