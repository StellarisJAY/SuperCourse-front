<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Super Course</div>
      <navbar-top></navbar-top>
    </a-layout-header>
    <a-row>
      <a-col :span="4">
        <a-menu mode="inline" class="chapter-selector">
          <a-menu-item>
            <span>返回</span>
          </a-menu-item>
          <a-sub-menu v-for="chapter, index in chapters" :key="index">
            <template #title>{{chapter.name}}</template>
            <a-menu-item-group>
              <template #title>视频</template>
              <a-menu-item v-for="video, index in chapter.videos" :key="index">
                <span>{{video.name}}</span>
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group>
              <template #title>练习</template>
              <a-menu-item v-for="practice, index in chapter.practices" :key="index">
                <span>{{practice.name}}</span>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-col>

      <a-col :span="20" class="practice-wrapper">
        <a-card class="practice-card">
            <h2>练习2</h2>
            <a-statistic-countdown
        title="倒计时"
        :value="Date.now() + 1000 * 60"
        style="margin-right: 50px"
        @finish="onTimeup"
      />
        <a-divider></a-divider>
        <div v-for="problem, index in problems" :key="index">
            <p>{{(index + 1) + '、' + problem.content}}</p>
            <a-radio-group>
                <a-radio class="selection" v-for="selection in problem.selections" :key="selection.seq" :value="selection.seq">
                    {{seqs[selection.seq] + '、' + selection.content}}
                </a-radio>
            </a-radio-group>
        </div>
        <a-divider></a-divider>
        <a-button type="primary" class="submit-button">提交</a-button>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>


<script>
import NavbarTop from "../NavbarTop.vue";
export default {
  name: "VideoPlayer",
  components: {
    NavbarTop,
  },
  data() {
    return {
      player: null,
      seqs: [null, 'A','B','C','D'],
      chapters: [
        { id: "1", 
          name: "第一章", 
          videos: [
            {name: '视频 1'},
            {name: '视频 2'},
            {name: '视频 3'}
          ], 
          practices: [
            {name: '练习 1'},
            {name: '练习 2'}
          ] 
        },
        { id: "1", 
          name: "第二章", 
          videos: [
            {name: '视频 1'},
            {name: '视频 2'},
            {name: '视频 3'}
          ], 
          practices: [
            {name: '练习 1'},
            {name: '练习 2'}
          ] 
        },
        { id: "1", 
          name: "第三章", 
          videos: [
            {name: '视频 1'},
            {name: '视频 2'},
            {name: '视频 3'}
          ], 
          practices: [
            {name: '练习 1'},
            {name: '练习 2'}
          ] 
        },
      ],
      problems:[
          {id: '1', 
          content: '运算符优先级别排序正确的是（）', 
          selections: [
              {seq: 1, content: '由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符；'},
              {seq: 2, content: '由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符；'},
              {seq: 3, content: '由高向低分别是：()、算术运算符、逻辑运算符、关系运算符、!、赋值运算符；'},
              {seq: 4, content: '由高向低分别是：()、!、关系运算符、赋值运算符、算术运算符、逻辑运算符；'}
          ]},
          {id: '1', 
          content: '运算符优先级别排序正确的是（）', 
          selections: [
              {seq: 1, content: '由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符；'},
              {seq: 2, content: '由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符；'},
              {seq: 3, content: '由高向低分别是：()、算术运算符、逻辑运算符、关系运算符、!、赋值运算符；'},
              {seq: 4, content: '由高向低分别是：()、!、关系运算符、赋值运算符、算术运算符、逻辑运算符；'}
          ]},
          {id: '1', 
          content: '运算符优先级别排序正确的是（）', 
          selections: [
              {seq: 1, content: '由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符；'},
              {seq: 2, content: '由高向低分别是：()、!、算术运算符、关系运算符、逻辑运算符、赋值运算符；'},
              {seq: 3, content: '由高向低分别是：()、算术运算符、逻辑运算符、关系运算符、!、赋值运算符；'},
              {seq: 4, content: '由高向低分别是：()、!、关系运算符、赋值运算符、算术运算符、逻辑运算符；'}
          ]},
      ]
    };
  },
  mounted() {
    this.player = new Aliplayer(
      {
        id: 'player-con',
        source: 'https://player.alicdn.com/video/aliyunmedia.mp4',
        width: '100%',
        height: '500px',
        autoplay: false,
        isLive: false,
        name: 'test'
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
      onTimeup(){

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
</style>
