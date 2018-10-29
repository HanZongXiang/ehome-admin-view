<template>
  <div class="news-detail">
    <el-card>
      <div slot="header">
        新闻详情
        <span class="fr lookNum">阅读数：{{look_nums}}</span>
      </div>
      <div v-html="detail" class="content"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      detail: '',
      look_nums: ''
    }
  },
  components: {

  },
  methods: {
    getDetail() {
      const {id} = this.$route.params
      this.$axios.get(`/admin/news/${id}`).then(res => {
        this.detail = res.data.content
        this.look_nums = res.data.look_nums
      })
    }
  },
  created() {
    this.getDetail()
  }
}
</script>

<style scoped lang="scss">
.news-detail {
  .lookNum {
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }

  
}
</style>
<style lang="scss">
.news-detail {

  .content {

    h1,h2,h3,h4,h5 {
      font-weight: 500;
      margin: 10px 0;
    }
    span,p {
      text-indent: 2em;
      font-size: 14px;
      line-height: 2;
      color: #666;
    }
    img {
      display: block;
      margin: 10px auto;
    }
  }
}
</style>

