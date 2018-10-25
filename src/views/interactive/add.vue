<template>
  <div class="topic-add">
    <el-card>
      <div slot="header">添加评论主题</div>
      <div class="form-wrap" style="width: 500px">
        <el-form :data="formData" label-width="80px" label-position="left">
          <el-form-item label="主题内容">
            <el-input v-model="formData.content" @keyup.enter.native="handleAdd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleAdd" type="primary">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      formData: {
        content: ''
      }
    }
  },
  components: {

  },
  methods: {
    handleAdd() {
      this.$axios.post('/admin/topic',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push({name: 'topicList'})
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
