<template>
  <div class="interactive-edit">
    <el-card>
      <div slot="header">
        编辑主题信息
      </div>
      <div class="form-wrap" style="width: 500px">
        <el-form :data="formData" label-width="90px" label-position="left">
          <el-form-item label="主题内容">
            <el-input v-model="formData.content"></el-input>
          </el-form-item>
          <el-form-item label="发布人">
            <el-select v-model="formData.user._id">
              <el-option v-for="(item,index) in userData" :label="item.username" :value="item._id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人头像">
              <img :src="formData.user.avatar" class="table-item-img">
          </el-form-item>
          <el-form-item label="评论内容">
            <template slot-scope="scope">
              <el-tag v-for="(item,index) in formData.comment" :key="index" 
                style="margin-right: 5px">
                {{item.content}}
              </el-tag>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="mini" @click="handleEdit()">保存编辑</el-button>
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
        content: '',
        user: '',
        comment: []
      },
      userData: []
    }
  },
  components: {

  },
  methods: {
    getEditData() {
      const id = this.$route.params.id
      this.$axios.get(`/admin/topic/${id}`).then(res => {
        this.formData = res.data
      })
    },
    getUserData() {
      this.$axios.get('/admin/adminUser').then(res => {
        this.userData = res.data
      })
    },
    handleEdit() {
      const id = this.$route.params.id
      let obj = {
        content: this.formData.content,
        user: this.formData.user._id
      }
      this.$axios.patch(`/admin/topic/${id}`,obj).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push({name: 'topicList'})
        } else {
          this.$message.error(res)
        }
      })
    }
  },
  created() {
    this.getEditData()
    this.getUserData()
  }
}
</script>

<style scoped>
</style>
