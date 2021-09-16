<template>
  <a-col :span="4">
      <a-menu mode="inline" :selectedKeys="active" class="sidebar">
        <a-menu-item key="0" @click="goBack()">
          <span>← 返回</span>
        </a-menu-item>
        <a-menu-item key="1" @click="goTo('/teacher/course')">
            <span>我的课程</span>
        </a-menu-item>
        <a-divider></a-divider>
        <a-menu-item key="2">
            <span>题库</span>
        </a-menu-item>
      </a-menu>
    </a-col>
</template>

<script>
export default {
  name: "SidebarTeacherCourse",
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
