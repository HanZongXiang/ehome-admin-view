<template>
  <div class="list-wrap">
    <el-card>
      <div slot="header">新闻列表</div>
      <el-table :data="tableData" border>
        <el-table-column label="新闻标题" prop="title">

        </el-table-column>
        <el-table-column label="作者" prop="author.nickname">

        </el-table-column>
        <el-table-column label="新闻头图">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="新闻分类" prop="type.title"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">查看详细</el-button>
            <el-button type="danger" size="mini">删除新闻</el-button>
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
      this.$axios.get('/admin/news').then(res => {
        if (res.code == 200) {
          this.tableData =res.data
        } else {
          this.$message.error(res.msg)
        }
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
