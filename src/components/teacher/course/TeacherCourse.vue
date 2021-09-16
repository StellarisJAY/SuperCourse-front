<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Teacher</div>
      <navbar-top-teacher></navbar-top-teacher>
    </a-layout-header>

    <a-layout-content class="content">
      <a-row class="main">
        <sidebar :active="'1'"></sidebar>
        <a-col :span="20" class="content-wrapper">
          <a-card class="header-card">
            <a-row>
              <a-col :span="6">
                <h1>{{ courseInfo.name }}</h1>
                <a-tag :color="status[courseInfo.status].type">{{
                  status[courseInfo.status].name
                }}</a-tag>
                <a-tag color="blue">{{
                  courseInfo.price != 0 ? "付费" : "免费"
                }}</a-tag>
                <p>{{ courseInfo.description }}</p>
              </a-col>
              <a-col :span="4">
                <a-row>
                  <a-col :span="12">
                    <a-statistic
                      title="关注量"
                      :value="courseInfo.subscribeCount"
                    ></a-statistic>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-statistic
                      :value="0"
                      :prefix="'↑'"
                      :value-style="{ color: '#cf1322' }"
                    ></a-statistic>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="8">
                <span></span>
              </a-col>
              <a-col :span="6">
                <img
                  width="80%"
                  height="80%"
                  :src="
                    courseInfo.image == null
                      ? 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                      : courseInfo.image
                  "
                />
              </a-col>
            </a-row>
          </a-card>
          <a-card title="课程详情" class="chapter-card">
            <template #extra>
              <a-button type="primary" size="default">发布练习</a-button>
              <a-button type="primary" @click="showUploadVideoModal" size="default">上传视频</a-button>
              <a-button type="primary" @click="showNewChapterModal" size="default">添加章节</a-button>
            </template>
            <a-collapse @change="onCollapseChange" accordion="true">
              <!-- 各章节的折叠面板 -->
              <a-collapse-panel
                v-for="chapter in chapters"
                :key="chapter"
                :header="chapter.name" 
              >
                <template #extra
                  ><a-button type="danger" size="small" @click="deleteChapter(chapter)"
                    >删除</a-button
                  ></template
                >

                <!-- 章节视频列表 -->
                <a-table :data-source="chapter.videos">
                  <template #title><span>视频</span></template>
                  <a-table-column title="视频标题" key="title" dataIndex="title"></a-table-column>
                  <a-table-column title="时长" key="duration" dataIndex="duration"></a-table-column>
                  <a-table-column title="操作">
                    <template #default="{ video }">
                      <a-button type="link" @click="()=>{video.id}">详情</a-button>
                    </template>
                  </a-table-column>
                </a-table>
                <!-- 章节练习列表-->
                <a-table :data-source="chapter.practices">
                  <template #title>练习</template>
                  <a-table-column
                    title="名称"
                    key="title"
                    dataIndex="title"
                  ></a-table-column>
                  <a-table-column
                    title="题量"
                    key="questionCount"
                    dataIndex="questionCount"
                  ></a-table-column>
                  <a-table-column
                    title="限时"
                    key="timeLimit"
                    dataIndex="timeLimit"
                  ></a-table-column>
                  <a-table-column
                    title="完成人数"
                    key="finishedCount"
                    dataIndex="finishedCount"
                  ></a-table-column>
                  <a-table-column title="操作">
                    <template #default="{ practice }">
                      <a-button
                        type="link"
                        @click="
                          () => {
                            practice.id;
                          }
                        "
                        >详情</a-button
                      >
                    </template>
                  </a-table-column>
                </a-table>
              </a-collapse-panel>
            </a-collapse>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>

    <!-- 添加章节模态框 -->
    <a-modal :visible="addChapterVisible" @ok="addChapter" @cancel="hideNewChapterModal" ok-text="添加" cancel-text="取消">
      <a-form v-model="newChapter">
        <a-form-item label="章节名">
          <a-input v-model="newChapter.name" placeholder="输入章节名称"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 上传视频模态框 -->
    <a-modal :visible="uploadVideoVisible" @ok="uploadVideo" @cancel="hideUploadVideoModal" ok-text="上传" cancel-text="取消">
      <a-form v-model="newVideo">
        <a-form-item label="视频标题">
          <a-input v-model="newVideo.title" placeholder="请输入播放时显示的视频标题"></a-input>
        </a-form-item>
        <a-form-item label="上传到章节">
          <a-select v-model="newVideo.chapterId">
            <a-select-option v-for="chapter in chapters" :key="chapter.id" :value="chapter.id">{{chapter.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-upload :file-list="fileList" :before-upload="beforeUpload">
          <a-button>
            选择文件
          </a-button>
        </a-upload>
        <a-progress :percent="uploadProgress.percentage" />
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "../NavbarTopTeacher.vue";
import SidebarTeacher from "./Sidebar.vue";
import request from "../../../util/request";
import upload from '../../../util/uploader'
export default {
  name: "TeacherCourseDetail",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {
      status: [
        { name: "未开始", type: "" },
        { name: "进行中", type: "green" },
        { name: "已结束", type: "red" },
      ],
      courseInfo: {},
      chapters: [],
      // 添加章节变量
      addChapterVisible: false,
      newChapter:{},
      // 上传视频变量
      uploadVideoVisible: false,
      newVideo: {
        
      },
      uploading: false,
      fileList: [],
      uploadProgress:{
        percentage: 0
      }
    };
  },
  mounted() {
    // 从路由取参数
    if (
      this.$route.params != undefined &&
      this.$route.params.course != undefined
    ) {
      this.courseInfo = this.$route.params.course;
      // 加载章节信息（不加载内容）
      this.getChapterList();

      let uploader = new AliyunUpload.Vod({
        
      })
      console.log(uploader)

    } else {
      this.$router.back();
    }
  },
  methods: {
    showNewChapterModal(){
      this.addChapterVisible = true
    },
    hideNewChapterModal(){
      this.addChapterVisible = false
    },
    getChapterList() {
      let that = this;
      request
        .get("/course-chapter/list", {
          params: {
            courseId: this.courseInfo.id,
          },
        })
        .then((response) => {
          let result = response.data;
          if (result.code == 200) {
            that.chapters = result.data;
          }
        });
    },

    addChapter(){
      let that = this
      this.newChapter.courseId = this.courseInfo.id
      request.post('/course-chapter/add', this.newChapter)
      .then((response)=>{
        let result = response.data
        if(result.code == 200){
          // 关闭添加模态框
          that.addChapterVisible = false
          // 前端章节数组添加
          that.chapters.push(result.data)
        }
      })
    },

    /**
     * 删除章节
     */
    deleteChapter(chapter){
      let that = this
      request.post('/course-chapter/delete', chapter)
      .then((response)=>{
        let result = response.data
        if(result.code == 200){
          // 前端数组删除该章节
          that.chapters.forEach((c, index, chapters)=>{
            if(c.id === chapter.id){
              chapters.splice(index, 1)
            }
          })
        }
      })
    },

    onCollapseChange(key){
      let that = this
      console.log(this.chapters)
      if(!key.videos){
        this.getChapterVideos(key.id)
      }
    },

    /**
     * 获取章节的视频列表
     */
    getChapterVideos(id){
      let that = this
      request.get('/video/list', {
        params:{
          chapterId: id
        }
      })
      .then((response)=>{
        let result = response.data
        if(result.code === 200){
          for(let i = 0; i < that.chapters.length; i++){
            if(that.chapters[i].id === id){
              that.chapters[i].videos = result.data
            }
          }
          that.$forceUpdate()
        }
      })
    },

    showUploadVideoModal(){
      this.uploadVideoVisible = true
    },
    hideUploadVideoModal(){
      this.uploadVideoVisible = false
    },
    beforeUpload(file){
      this.fileList.push(file)
      return false
    },

    uploadVideo(){
      let that = this
      this.newVideo.courseId = this.courseInfo.id
      this.uploading = true
      // 读取即将上传视频的时长
      let fileUrl = URL.createObjectURL(this.fileList[0])
      let video = new Audio(fileUrl)
      video.addEventListener("loadedmetadata", (_event)=>{
        that.newVideo.duration = Math.floor(video.duration)
      })

      // 创建上传请求，获取vid、上传地址、上传凭证
      request.post('/video/uploadRequest', this.newVideo)
      .then((response)=>{
        let result = response.data
        if(result.code == 200){
          let uploadRequest = result.data
          let uploader = upload.createUploader(uploadRequest.videoId, uploadRequest.uploadAddress, uploadRequest.uploadAuth, that.uploadProgress, this.onUploadSuccess)
          uploader.addFile(that.fileList[0])
          uploader.startUpload()
        }
      })
    },
    /**
     * 上传成功回调
     */
    onUploadSuccess(uploadInfo){
      let that = this
      // 获取到vid
      this.newVideo.vid = uploadInfo.videoId
      console.log(this.newVideo)
      //添加视频信息到数据库
      request.post('/video/add', this.newVideo)
      .then((response)=>{
        let result = response.data
        if(result.code == 200){
          that.chapters.forEach((chapter)=>{
            if(chapter.id === that.newVideo.chapterId){
              chapter.videos.push(that.newVideo)
            }
          })
          that.uploadVideoVisible = false
          that.uploadProgress.percentage = 0
          that.newVideo = null
          that.fileList = []
          that.$forceUpdate()
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
.header-card {
  height: 200px;
  margin: 20px;
}
.chapter-card {
  margin: 20px;
  height: 100%;
}
</style>
