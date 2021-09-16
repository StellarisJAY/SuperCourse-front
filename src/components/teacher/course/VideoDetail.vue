<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Teacher</div>
      <navbar-top-teacher></navbar-top-teacher>
    </a-layout-header>
    <a-layout-content class="content">
      <a-row class="main">
        <sidebar :active="'0'"></sidebar>
        <a-col :span="20" class="content-wrapper">
          
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "../NavbarTopTeacher.vue";
import SidebarTeacher from "./Sidebar.vue";
export default {
  name: "VideoDetail",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {

    };
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
