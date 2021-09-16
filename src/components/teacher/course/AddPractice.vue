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
            <h2>{{newPractice.title}}</h2>
          </a-card>
          <a-card title="题目列表" class="question-card">
              <template #extra>
                  <a-button type="primary">从题集选择</a-button>
                    <a-button type="primary">随机</a-button>
              </template>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "../NavbarTopTeacher.vue";
import SidebarTeacher from "./Sidebar.vue";
import request from "../../../util/request";
export default {
  name: "AddPractice",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {
        newPractice:{
            title: '新练习'
        }
    };
  },
  mounted() {

  },
  methods: {
    
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
  height: 100px;
  margin: 20px;
}
.question-card {
  margin: 20px;
  height: 100%;
}
</style>
