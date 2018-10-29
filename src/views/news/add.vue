<template>
  <div class="news-add">
    <el-card>
      <div slot="header">添加新闻</div>
      <el-form :data="formData" label-width="80px" label-position="left">
        <el-form-item label="新闻标题" required>
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻作者" required>
          <el-select v-model="formData.author">
            <el-option v-for="(item,index) in userData" :key="index" :value="item._id" :label="item.nickname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻内容" required>
          <quill-editor 
            v-model="formData.content"
            :options="editorOption"
            @change="handleChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="新闻头图" required>
          <upload v-model="formData.img"></upload>
        </el-form-item>
        <el-form-item label="新闻分类" required>
          <el-select v-model="formData.type">
            <el-option v-for="(item,index) in categoryData" :value="item._id" :label="item.title" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd" v-if="!this.isEdit">
            添加
          </el-button>
          <el-button type="warning" @click="handleSave" v-else>保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import 'quill/dist/quill.snow.css'
import {quillEditor,Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import upload from '@/components/Upload'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name:'',
  data() {
    return {
      isEdit: false,
      formData: {
        title: '',
        content: '',
        contentText: '',
        author: '',
        type: '',
        img: ''
      },
      token: '',
      userData: [],
      categoryData: [],
      editorOption: {
        modules: {
          ImageExtend: {
            loading:true,
            name:'file',
            action:'https://upload-z1.qiniup.com',
            response: (res) => {
              return res.url
            },
            change : (xhr,formData) => {
              formData.append('token',this.token)
            }
          },
          toolbar:[
  ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
  ['blockquote', 'code-block'],         //引用，代码块
  [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
  [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
  [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题
  [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
  [{ 'font': [] }],         //字体
  [{ 'align': [] }],        //对齐方式
  ['clean'],        //清除字体样式
  ['image']        //上传图片
           ]
        }
      }
    }
  },
  components: {
    quillEditor,
    upload
  },
  methods: {
    getUserData() {
      this.$axios.get('/admin/adminUser').then(res => {
        if (res.code == 200) {
          this.userData = res.data
        }
      })
    },
    getToken() {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        if (res.data.code == 200) {
          this.token = res.data.data
        }
      })
    },
    handleChange({quill,content,text}) {
      this.formData.contentText = text
    },
    getType() {
      this.$axios.get('/admin/category').then(res => {
        if(res.code == 200) {
          this.categoryData = res.data
        }
      })
    },
    handleAdd() {
      this.$axios.post('/admin/news',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push({name:'newsList'})
        } else {
          this.$message.info(res.msg)
        }
      })
    },
    getEditData() {
      const {id} = this.$route.params
      this.$axios.get(`/admin/news/${id}`).then(res => {
        if (res.code == 200) {
          this.formData = res.data
        }
      })
    },
    handleSave() {
      const {id} = this.$route.params
      this.$axios.patch(`/admin/news/${id}`,this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/layout/newsList')
        } else {
          this.$message.error('未知错误')
        }
      })
    }
  },
  created() {
    this.getUserData()
    this.getToken()
    this.getType()
    if (this.$route.name == 'newsEdit') {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    if (this.isEdit) {
      this.getEditData()
    }
  },
  watch: {
    $route(to,from) {
      if(to.name == 'newsEdit') {
        this.isEdit = true
      } else {
        this.isEdit = false
        this.formData = {
          title: '',
          content: '',
          contentText: '',
          author: '',
          type: '',
          img: ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .ql-container {
    min-height: 200px;
  }
}
</style>
