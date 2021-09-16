<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Super Course</div>
      <navbar-top></navbar-top>
    </a-layout-header>
    <a-row>
      <a-col :span="4">
        <a-menu
          mode="inline"
          class="chapter-selector"
          @openChange="onMenuOpenChange"
          @select="onMenuSelect"
        >
          <a-menu-item @click="back">
            <span>返回</span>
          </a-menu-item>
          <a-sub-menu v-for="chapter in chapters" :key="chapter.id">
            <template #title>{{ chapter.name }}</template>
            <a-menu-item-group>
              <template #title>视频</template>
              <a-menu-item
                v-for="video in chapter.videos"
                :key="video.id"
                @click="navigateTo(video.id, video.title, 'v')"
              >
                <span>{{ video.title }}</span>
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group>
              <template #title>练习</template>
              <a-menu-item
                v-for="practice in chapter.practices"
                :key="practice.id"
              >
                <span>{{ practice.name }}</span>
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-col>

      <a-col :span="20" class="video-wrapper">
        <a-card class="video-card">
          <!--当前视频信息-->
          <h2>{{video.title}}</h2>
          <div></div>
          <!-- 播放器 -->
          <div class="prism-player" id="player-con"></div>
          <a-divider></a-divider>
          <!-- 评论区-->
          <h3>评论与回复</h3>
          <a-comment>
            <template #avatar>
              <a-avatar>U</a-avatar>
            </template>
            <template #content>
              <a-form-item>
                <a-textarea :rows="4" />
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary">
                  添加评论
                </a-button>
              </a-form-item>
            </template>
          </a-comment>
          <a-list></a-list>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>


<script>
import NavbarTop from "../NavbarTop.vue";
import request from "../../../util/request";
import {message} from 'ant-design-vue'
export default {
  name: "VideoPlayer",
  components: {
    NavbarTop,
  },
  data() {
    return {
      player: null,
      courseInfo: {
        id: 2,
      },
      chapters: [],
      video: {},
      openKeys:[]
    };
  },
  mounted() {
    if (this.$route.params) {
      this.courseInfo.id = this.$route.params.courseId;
      this.chapters = this.$route.params.chapters;
      this.video.id = this.$route.params.contentId;
      this.video.title = this.$route.params.contentTitle
      this.openKeys = this.$route.params.menuOpenKeys
      this.loadVideo(this.video.id);
    } else {
      this.$router.back();
    }
  },
  methods: {
    back(){
      if(this.player){
        this.player.dispose()
      }
      this.$router.back()
    },
    navigateTo(contentId, title, type) {
      console.log(type);
      if (type === "v") {
        this.video.id = contentId
        this.video.title = title
        this.loadVideo(contentId)
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

    onMenuOpenChange(sub) {
      let that = this;
      for (let i = 0; i < sub.length; i++) {
        this.chapters.forEach((c) => {
          if (c.id === sub[i] && !c.videos) {
            that.getChapterVideos(c);
          }
        });
      }
    },

    onMenuSelect(selection) {
      
    },

    getChapterVideos(chapter) {
      let that = this;
      request
        .get("/video/list", {
          params: {
            chapterId: chapter.id,
          },
        })
        .then((response) => {
          let result = response.data;
          if (result.code === 200) {
            chapter.videos = result.data;
            that.$forceUpdate();
          }
        });
    },

    /**
     * 获取播放权限
     */
    loadVideo(id) {
      let that = this;
      request
        .get("/video/play-auth", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          let result = response.data;
          if (result.code === 200) {
            that.createPlayer(
              result.data.videoMeta.videoId,
              result.data.playAuth
            );
          }
        });
    },

    /**
     * 创建播放器
     */
    createPlayer(vid, playAuth) {
      if (this.player) {
        console.log(this.player)
        this.player.replayByVidAndPlayAuth(vid, playAuth);
      } else {
        this.player = new Aliplayer(
          {
            id: "player-con",
            width: "100%",
            height: "500px",
            autoplay: false,
            isLive: false,
            name: "test",
            vid: vid,
            playauth: playAuth
          },
          (err) => {
            console.log(err);
          }
        );
        
      }
      // 注册 视频播放结束事件 回调
      this.player.on("ended", this.onVideoPlayEnd)
      this.$forceUpdate();
    },

    /**
     * 视频播放结束回调
     * 服务端播放记录
     */
    onVideoPlayEnd(event){
      let that = this
      request.post('/watch-record/save', {
        videoId: this.video.id,
        courseId: this.courseInfo.id,
        finished: 1,
        time: 0
      })
      .then((response)=>{
        let result = response.data
        if(result.code === 200){
          message.success("视频打卡完成")
        }
        else{
          message.error("视频打卡失败")
        }
      })
    }
  },
};
</script>
<style scoped>
.header {
  background-color: #f0f2f5;
  padding: 0px;
}
.logo {
  position: absolute;
  left: 20px;
  top: 0px;
  font-size: 20px;
  font-weight: 700;
  color: white;
}
.chapter-selector {
  height: 90vh;
}
.video-wrapper {
  margin-top: 20px;
}
.video-card {
  width: 80%;
  left: 10%;
}
</style>
