<template>
  <div class="news-detail">
    <el-card>
      <div slot="header">新闻详情</div>
      <div v-html="detail"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      detail: ''
    }
  },
  components: {

  },
  methods: {
    getDetail() {
      const {id} = this.$route.params
      this.$axios.get(`/admin/news/${id}`).then(res => {
        this.detail = res.data.content
      })
    }
  },
  created() {
    this.getDetail()
  }
}
</script>

<style scoped>
</style>
