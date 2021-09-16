<template>
  <a-col :span="4">
      <a-menu mode="inline" :selectedKeys="active" class="sidebar">
        <a-sub-menu key="1">
          <template #title>课程管理</template>
          <a-menu-item-group>
            <a-menu-item key="11" @click="goTo('/teacher/course')">
              <span>我的课程</span>
            </a-menu-item>
            <a-menu-item key="12" @click="goTo('/teacher/course/publish')">
              <span>发布课程</span>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-divider></a-divider>
        <a-sub-menu key="2">
            <template #title>直播服务</template>
            <a-menu-item-group>
                <a-menu-item key="21"><span>开启直播</span></a-menu-item>
                <a-menu-item key="22"><span>直播记录</span></a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </a-col>
</template>

<script>
export default {
  name: "SidebarTeacher",
  props:{
      opened: String,
      active: String
  },
  data() {
    return {};
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    goTo(path){
      this.$router.push({path: path})
    }
  }
};
</script>

<style scoped>
.header {
  background-color: white;
  padding: 0px;
}
.logo {
  position: absolute;
  left: 20px;
  top: 0px;
  font-size: 20px;
  font-weight: 700;
}

.sidebar{
    height:90vh;
}
</style>
