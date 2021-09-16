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
          <a-row>
            <a-list :grid="{ gutter: 16, column: 3 }">
              <a-list-item>
                <a-card title="课程热度" class="status-card">
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
                <a-card title="课程收益" class="status-card">
                  <a-row>
                    <a-col :span="11">
                      <a-statistic
                        title="昨日收益"
                        :value="'￥' + 11.24"
                        style="margin-right: 50px"
                      />
                    </a-col>
                    <a-col :span="11">
                      <a-statistic
                        title="累计收益"
                        :value="'￥' + 1023.42"
                        style="margin-right: 50px"
                      />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="11">
                      <a-statistic
                        :value="'￥' + 1.04"
                        :value-style="{ color: '#cf1322' }"
                      >
                        <template #prefix> ↑ </template>
                      </a-statistic>
                    </a-col>
                  </a-row>
                </a-card>
              </a-list-item>
              <a-list-item>
                <a-card title="练习概况" class="status-card">
                  <a-statistic title="做题人数" :value="1000"></a-statistic>
                </a-card>
              </a-list-item>
            </a-list>
          </a-row>

          <a-row>
            <a-card title="我的课程" class="table-card">
              <template #extra>
                <a-button type="primary" @click="showAddCourseModal"
                  >发布课程</a-button
                >
              </template>
              <a-table :data-source="courses">
                <a-table-column
                  title="名称"
                  key="name"
                  dataIndex="name"
                ></a-table-column>
                <a-table-column title="状态" key="status" dataIndex="status">
                  <template slot-scope="scope">
                    <a-tag :color="status[scope].type">{{
                      status[scope].name
                    }}</a-tag>
                  </template>
                </a-table-column>
                <a-table-column
                  title="关注人数"
                  key="subscribeCount"
                  dataIndex="subscribeCount"
                ></a-table-column>
                <a-table-column
                  title="开始时间"
                  key="startTime"
                  dataIndex="startTime"
                ></a-table-column>
                <a-table-column
                  title="结束时间"
                  key="endTime"
                  dataIndex="endTime"
                >
                  <template slot-scope="scope">
                    <p v-if="scope != null && scope != ''">
                      {{ scope }}
                    </p>
                    <p v-else>无</p>
                  </template>
                </a-table-column>
                <a-table-colum title="操作" key="id" dataIndex="id">
                  <template slot-scope="course">
                    <a-button type="link" @click="showCourseDetail(course)"
                      >详情</a-button
                    >
                  </template>
                </a-table-colum>
              </a-table>
            </a-card>
          </a-row>
        </a-col>
      </a-row>
      <a-modal
        :visible="addCourseVisible"
        title="添加课程"
        @ok="addCourse" @cancel="hideAddCourseModal"
      >
        <a-form v-model="newCourse">
          <a-form-item label="课程名">
            <a-input
              v-model="newCourse.name"
              placeholder="请输入课程名"
            ></a-input>
          </a-form-item>
          <a-form-item label="价格">
            <a-checkbox v-model="newCourse.free" @change="onPriceFreeChange">免费</a-checkbox>
            <a-input-number
              v-model="newCourse.price"
              :disabled="newCourse.free" 
              :min="0"
              :max="1000"
              :step="0.01"
              :formatter="
                (value) => {
                  return '￥' + value;
                }
              "
            ></a-input-number>
          </a-form-item>
          <a-form-item label="课程时间">
            <a-range-picker v-model="datePickerTime"
              show-time
              :placeholder="['开始时间', '结束时间']"
            ></a-range-picker>
          </a-form-item>
          <a-form-item label="封面图片(可选)">
            <a-upload list-type="picture-card" :show-upload-list="false" @change="handleUploadChange">
              <img v-if="newCourse.image" :src="newCourse.image" alt="avatar" />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "../NavbarTopTeacher.vue";
import SidebarTeacher from "./Sidebar.vue";
import request from "../../../util/request";
import {message} from 'ant-design-vue'
export default {
  name: "TeacherCourse",
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
      courses: [],
      newCourse: {
        name: null,
        image: null,
        price: 0.0,
        startTime: null,
        endTime: null,
        free:false
      },
      addCourseVisible: false,
      datePickerTime: null
    };
  },
  mounted() {
    this.getCourseList();
  },
  methods: {
    showCourseDetail(course) {
      this.$router.push({ name: "TeacherCourseDetail", params: {course: course} });
    },
    getCourseList() {
      let that = this;
      request
        .get("/course/teacher/list")
        .then((response) => {
          let result = response.data;
          if (result.code === 200) {
            that.courses = result.data;
          }
        })
        .catch((error) => {});
    },
    addCourse() {
      let that = this;
      this.newCourse.startTime = this.datePickerTime[0].format('YYYY-MM-DD HH:mm:ss')
      this.newCourse.endTime = this.datePickerTime[1].format('YYYY-MM-DD HH:mm:ss')

      request.post("/course/add", this.newCourse).then((response) => {
        let result = response.data;
        if (result.code === 200) {
          that.addCourseVisible=false
          let course = result.data
          course.subscribeCount = 0
          that.courses.push(course)
          message.success("添加成功")
          //that.$forceUpdate()
        }
        else{
          message.warning(result.message)
        }
      });
    },
    onPriceFreeChange(event){
      if(event.target.checked){
        this.newCourse.price = 0
      }
    },
    handleUploadChange(event){
      console.log(this.newCourse.image)
    },
    showAddCourseModal(){
      this.addCourseVisible = true
    },
    hideAddCourseModal(){
      this.addCourseVisible = false
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
.status-card {
  height: 200px;
  margin: 20px;
}
.table-card {
  margin: 20px;
}
</style>
