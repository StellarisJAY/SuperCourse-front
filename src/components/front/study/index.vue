<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Super Course</div>
      <navbar-top></navbar-top>
    </a-layout-header>
    <a-row>
      <a-col :span="4">
        <a-menu mode="inline" class="chapter-selector" @openChange="onMenuOpenChange" @select="onMenuSelect">
          <a-menu-item @click="back">
            <span>返回</span>
          </a-menu-item>
          <a-sub-menu v-for="chapter in chapters" :key="chapter.id">
            <template #title>{{chapter.name}}</template>
            <a-menu-item-group>
              <template #title>视频</template>
              <a-menu-item v-for="video in chapter.videos" :key="video.id" @click="navigateTo(video.id, video.title, 'v')">
                <span>{{video.title}}</span>
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group>
              <template #title>练习</template>
              <a-menu-item v-for="practice in chapter.practices" :key="practice.id" @click="navigateTo(practice.id, practice.title, 'p')">
                <span>{{practice.title}}</span>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <a-col :span="20" class="main-content">
        <a-card class="content-card">
            <a-row>
              <a-col :span="4">
                <h2 style="font-weight:700">{{courseInfo.name}}</h2>
                <a-tag :color="status[courseInfo.status].type">{{
                  status[courseInfo.status].name
                }}</a-tag>
                <a-tag color="blue">{{
                  courseInfo.price != 0 ? "付费" : "免费"
                }}</a-tag>
                <br><br>
                <h3>授课老师：{{courseInfo.teacherName}}</h3>
              </a-col>
              <a-col :span="12"><p></p></a-col>
              <a-col :span="8">
                <img height="100px" :src="courseInfo.image==null?'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png':courseInfo.image">
              </a-col>
            </a-row>
            <a-divider></a-divider>
            <a-row>
              <h3 style="font-weight:700">学习情况</h3>
              <h4>视频（{{studyProgress.watchedVideo}}/{{studyProgress.videoTotal}}）</h4>
              <a-progress :percent="getPercentage(studyProgress.watchedVideo, studyProgress.videoTotal)"></a-progress>
              <h4>练习（{{studyProgress.finishedPractice}}/{{studyProgress.practiceTotal}}）</h4>
              <a-progress :percent="getPercentage(studyProgress.finishedPractice, studyProgress.practiceTotal)"></a-progress>
            </a-row>

            <a-divider></a-divider>
            <a-row>
              <h3 style="font-weight:700">学习小组</h3>
            </a-row>
        </a-card>
      </a-col>
    </a-row> 
  </a-layout>
</template>


<script>
import NavbarTop from "../NavbarTop.vue";
import request from '../../../util/request'
import {message} from 'ant-design-vue'
export default {
  name: "CourseInfoStudent",
  components: {
    NavbarTop,
  },
  data() {
    return {
      status: [
        { name: "未开始", type: "" },
        { name: "进行中", type: "green" },
        { name: "已结束", type: "red" },
      ],
    courseInfo:{
      "id": 31,
        "name": "Besige（围观）",
        "image": null,
        "teacherId": "13558710899",
        "teacherName": "teacher-1",
        "status": 0,
        "price": 0.00,
        "startTime": "2021-08-27 20:36:09",
        "endTime": "2021-09-02 20:34:09"
    },
      chapters: [],
      openKeys: [],
      studyProgress: {}
    };
  },
  mounted() {
    this.getCourseChapters()
    this.getStudyProgress()
  },
  methods: {
    back(){
      this.$router.back()
    },
      navigateTo(contentId,title, type){
        console.log(type)
      if(type === 'v'){
        this.$router.push({
          name:'Video',
          params: {
            contentId: contentId,
            contentTitle: title,
            chapters: this.chapters,
            courseId: this.courseInfo.id,
            menuOpenKeys: this.openKeys
          }})
      }
    },

    getCourseChapters() {
      let that = this;
      request
        .get("/course-chapter/list", {
          params: {
            courseId: this.courseInfo.id,
          },
        })
        .then((response) => {
          let result = response.data;
          if (result.code === 200) {
            that.chapters = result.data;
          }
        });
    },

    onMenuOpenChange(sub){
      this.openKeys = this.openKeys
      let that = this
      for(let i = 0; i < sub.length; i++){
        this.chapters.forEach((c)=>{
        if(c.id === sub[i] && !c.videos){
          that.getChapterVideos(c)
        }
        if(c.id === sub[i] && !c.practices){
          that.getChapterPractices(c)
        }
      })
      }
    },

    onMenuSelect(selection){
      console.log(selection)
    },

    getChapterVideos(chapter){
      let that = this;
      request.get('/video/list', {
        params:{
          chapterId: chapter.id
        }
      })
      .then((response)=>{
        let result = response.data
        if(result.code === 200){
          chapter.videos = result.data
          that.$forceUpdate()
        }
      })
    },

    getChapterPractices(chapter){
      let that = this;
      request.get('/practice/list', {
        params:{
          chapterId: chapter.id,
          courseId: this.courseInfo.id
        }
      })
      .then((response)=>{
        let result = response.data
        if(result.code === 200){
          chapter.practices = result.data
          that.$forceUpdate()
        }
      })
    },

    getStudyProgress(){
      let that = this
      request.get('/course/student-progress', {
        params:{
          courseId: this.courseInfo.id
        }
      })
      .then((response=>{
        let result = response.data
        if(result.code === 200){
          that.studyProgress = result.data
        }
      }))
    },

    getPercentage(x, y){
      return y == 0 ? 100 : Math.floor(x * 100 / y)
    }

  },
};
</script>
<style scoped>
.header {
  padding: 0px;
  background-color: #f0f2f5;
}
.logo {
  position: absolute;
  left: 20px;
  top: 0px;
  font-size: 20px;
  font-weight: 700;
  color:white;
}
.chapter-selector {
  height: 90vh;
}
.practice-wrapper{
  margin-top: 20px
}
.practice-card{
    width: 80%;
    left: 10%;
}
.selection{
    margin: 10px;
}
.submit-button{
    float:right;
    width:10%;
}
.main-content{
  margin-top:20px
}
.content-card {
   width: 80%;
  left: 10%;
}
</style>
