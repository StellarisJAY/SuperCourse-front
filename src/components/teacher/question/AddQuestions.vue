<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Teacher</div>
      <navbar-top-teacher></navbar-top-teacher>
    </a-layout-header>
    <a-layout-content class="content">
      <a-row class="main">
        <sidebar :active="'2'"></sidebar>
        <a-col :span="20" class="content-wrapper">
          <a-row>
            <a-card class="question-card" title="批量添加题目">
                <a-upload-dragger :multiple="false" :before-upload="beforeUpload" :remove="handleRemove">
                    <p class="ant-upload-drag-icon">
                    <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">点击或拖动文件到该区域进行上传</p>
                    <p class="ant-upload-hint">
                    文件限制.csv
                    </p>
                </a-upload-dragger>
                <a-divider></a-divider>
                <a-form v-model="uploadForm" layout="inline">
                    <a-form-item label="第一行作为表头">
                        <a-checkbox v-model="uploadForm.firstRowHeader"></a-checkbox>
                    </a-form-item>
                    <a-form-item label="上传到题目集">
                        <a-select style="width:600px" v-model="uploadForm.collections" mode="multiple" :options="collectionOptions"></a-select>
                    </a-form-item>
                </a-form>
                <a-divider></a-divider>
                <a-button type="primary" style="width:200px" @click="upload">上传</a-button>
            </a-card>
          </a-row>
        </a-col>
      </a-row>


      
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "../NavbarTopTeacher.vue";
import SidebarTeacher from "../course/Sidebar.vue";
import request from "../../../util/request";
import { message } from "ant-design-vue";
export default {
  name: "AddQuestions",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {
        questionTypes: ['', '单选题','多选题','填空题'],
        options:[{label: 'A', value: 1},{label: 'B', value: 2},{label: 'C', value: 3},{label: 'D', value: 4}],
        collectionInfo: {},
        uploadForm: {
            fileList: [],
            firstRowHeader: false
        },
        collections:[],
        collectionOptions: []
    };
  },
  mounted() {
    if (this.$route.params.collectionInfo && this.$route.params.collections) {
      this.collectionInfo = this.$route.params.collectionInfo;
      this.collections = this.$route.params.collections
      this.getCollectionOptions()
    } else {
      this.$router.back();
    }
  },
  methods: {
      getCollectionOptions(){
          let that = this
          this.collections.forEach(collection=>{
            that.collectionOptions.push({value: collection.id, label: collection.name})              
          })
      },
      beforeUpload(file){
          let filename = new String(file.name)
          let split = filename.split('.')
          if(split[split.length - 1] != 'csv'){
              message.warning('请上传csv格式文件')
              return false
          }
          this.uploadForm.fileList.push(file)
          return false
      },
      handleRemove(file){
          let i = this.uploadForm.fileList.indexOf(file)
          this.uploadForm.fileList.splice(i, 1)
      },
      upload(){
        console.log(this.uploadForm)
        this.uploadForm.file = this.uploadForm.fileList[0]
        let formData = new FormData()
        formData.append('file', this.uploadForm.file)
        formData.append('firstRowHeader', this.uploadForm.firstRowHeader)
        formData.append('collections', this.uploadForm.collections)
        request.post('/question/upload', formData)
        .then((response)=>{
          let result = response.data
          if(result.code === 200){
            message.success("成功添加 " + result.data.length + "道题目")
          }
          else{
            message.error(result.message)
          }
        })
      }
  },
};
</script>

<style scoped>
.header {
  padding: 0px;
  margin: 0px;
  background-color: #f0f2f5;
}
.logo {
  position: absolute;
  left: 20px;
  top: 0px;
  font-size: 20px;
  font-weight: 700;
  color: white;
}
.content {
  padding: 0px;
  margin: 0px;
}
.operation-card {
  margin: 20px;
}

.question-card {
  margin: 20px;
}
</style>
