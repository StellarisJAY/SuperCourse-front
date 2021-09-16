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
          <!--状态卡片-->
          <a-row>
            <a-list :grid="{ gutter: 16, column: 3 }">
              <a-list-item>
                <a-card class="card">
                  <a-row>
                    <a-col :span="11">
                      <a-statistic
                        title="播放量"
                        :value="112893"
                        style="margin-right: 50px"
                      />
                    </a-col>
                    <a-col :span="11">
                      <a-statistic
                        title="关注量"
                        :value="112893"
                        style="margin-right: 50px"
                      />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="11">
                      <a-statistic
                        :value="94"
                        :value-style="{ color: '#cf1322' }"
                      >
                        <template #prefix> ↑ </template>
                      </a-statistic>
                    </a-col>
                    <a-col :span="11">
                      <a-statistic
                        :value="96"
                        :value-style="{ color: '#cf1322' }"
                      >
                        <template #prefix> ↑ </template>
                      </a-statistic>
                    </a-col>
                  </a-row>
                </a-card>
              </a-list-item>
              <a-list-item>
                <a-card class="card">
                  <a-row>
                    <a-col :span="11">
                      <a-statistic
                        :title="'点赞'"
                        :value="1500"
                        style="margin-right: 50px"
                      />
                    </a-col>
                    <a-col :span="11">
                      <a-statistic
                        :title="'评论'"
                        :value="20"
                        style="margin-right: 50px"
                      />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="11">
                      <a-statistic
                        :value="94"
                        :value-style="{ color: '#cf1322' }"
                      >
                        <template #prefix> ↑ </template>
                      </a-statistic>
                    </a-col>
                    <a-col :span="11">
                      <a-statistic
                        :value="6"
                        :value-style="{ color: '#cf1322' }"
                      >
                        <template #prefix> ↑ </template>
                      </a-statistic>
                    </a-col>
                  </a-row>
                </a-card>
              </a-list-item>
              <a-list-item>
                <a-card
                  title="私信"
                  class="card"
                  :grid="{ gutter: 16, column: 10 }"
                >
                  <template #extra>
                    <a-button type="link">全部</a-button>
                  </template>
                  <a-row>
                    <a-col
                      style="margin: 2px"
                      :span="3"
                      v-for="(message, index) in messages"
                      :key="index"
                    >
                      <a-avatar>{{ message.from.charAt(0) }}</a-avatar>
                    </a-col>
                  </a-row>
                </a-card>
              </a-list-item>
            </a-list>
          </a-row>
          <a-row>
            <a-card title="播放量排行" class="table-card">
              <a-table :columns="tableColumns"></a-table>
            </a-card>
          </a-row>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "./NavbarTopTeacher.vue";
import SidebarTeacher from "./Sidebar.vue";
export default {
  name: "TeacherHome",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {
      tableColumns: [
        { title: "#", dataIndex: "seq", key: "seq" },
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "关注量", dataIndex: "subscribe", key: "subscribe" },
        { title: "总播放量", dataIndex: "total", key: "total" },
        { title: "平均播放量", dataIndex: "avg", key: "avg" },
      ],
      messages: [
        { from: "XXJAY" },
        { from: "User" },
        { from: "A" },
        { from: "Beach" },
        { from: "Nice" },
        { from: "XXJAY" },
        { from: "User" },
        { from: "A" },
        { from: "Beach" },
        { from: "XXJAY" },
        { from: "User" },
        { from: "A" },
        { from: "Beach" },
      ],
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
.card {
  height: 200px;
  margin: 20px;
}
.table-card {
  margin: 20px;
  height: 100%;
}
</style>
