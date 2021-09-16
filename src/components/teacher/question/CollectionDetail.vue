<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="logo">Teacher</div>
      <navbar-top-teacher></navbar-top-teacher>
    </a-layout-header>
    <a-layout-content class="content">
      <a-row class="main">
        <sidebar :active="'2'"></sidebar>
        <a-col :span="20" class="content-wrapper">
          <a-row>
            <a-card class="question-card" title="题目集详情">
                <template #extra>
                    <a-button type="primary" @click="showAddQuestionModal">添加题目</a-button>
                    <a-button type="primary" @click="showAddQuestionsPage">批量导入</a-button>
                </template>
              <a-descriptions>
                <a-descriptions-item label="题集名称">{{
                  collectionInfo.name
                }}</a-descriptions-item>
                <a-descriptions-item label="公开性">{{
                  collectionInfo.privateCollection ? "私有" : "公开"
                }}</a-descriptions-item>
              </a-descriptions>

              <a-divider></a-divider>

              <a-table
                :dataSource="questions"
                :pagination="pagination"
                @change="handlePageChange"
              >
                <a-table-column
                  title="题干"
                  key="content"
                  dataIndex="content" width="80%"
                ></a-table-column>
                <a-table-column
                  title="类型"
                  key="type"
                  dataIndex="type"
                >
                    <template slot-scope="type">
                        {{questionTypes[type]}}
                    </template>
                </a-table-column>
                <a-table-column title="操作">
                  <template slot-scope="row">
                    <a-button
                      type="link"
                      size="small"
                      @click="
                        () => {
                          row;
                        }
                      "
                      >详情</a-button
                    >
                    <a-button
                      type="danger"
                      size="small"
                      @click="
                        () => {
                          row;
                        }
                      "
                      >删除</a-button
                    >
                  </template>
                </a-table-column>
              </a-table>
            </a-card>
          </a-row>
        </a-col>
      </a-row>


      <a-modal :visible="addQuestionVisible" @cancel="hideAddQuestionModal" @ok="addQuestion" cancel-text="取消" ok-text="添加">
          <a-form v-model="newQuesion">
              <a-form-item label="题干">
                  <a-textarea v-model="newQuestion.content"></a-textarea>
              </a-form-item>
              <a-form-item label="类型">
                  <a-select v-model="newQuestion.type">
                      <a-select-option value="1">选择题</a-select-option>
                      <a-select-option value="3">填空题</a-select-option>
                  </a-select>
              </a-form-item>
              <div v-if="newQuestion.type == 1">
                  <a-form-item label="选项A">
                      <a-input v-model="newQuestion.selectionA"></a-input>
                  </a-form-item>
                  <a-form-item label="选项B">
                      <a-input v-model="newQuestion.selectionB"></a-input>
                  </a-form-item>
                  <a-form-item label="选项C">
                      <a-input v-model="newQuestion.selectionC"></a-input>
                  </a-form-item>
                  <a-form-item label="选项D">
                      <a-input v-model="newQuestion.selectionD"></a-input>
                  </a-form-item>
                  <a-form-item label="答案">
                      <a-checkbox-group v-model="newQuestion.answers" :options="options"></a-checkbox-group>
                  </a-form-item>
              </div>
              <div v-else>
                  <a-form-item label="答案">
                      <a-input v-model="newQuestion.answers"></a-input>
                  </a-form-item>
              </div>
          </a-form>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from "../NavbarTopTeacher.vue";
import SidebarTeacher from "../course/Sidebar.vue";
import request from "../../../util/request";
import { message } from "ant-design-vue";
export default {
  name: "CollectionDetail",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {
        questionTypes: ['', '单选题','多选题','填空题'],
    options:[{label: 'A', value: 1},{label: 'B', value: 2},{label: 'C', value: 3},{label: 'D', value: 4}],
      collectionInfo: {},
      questions: [],
      newQuestion: {type:'3'},
      addQuestionVisible: false,
     collections: [],
      pagination: {
        pageSize: 6,
        current: 1,
      },
    };
  },
  mounted() {
    if (this.$route.params.collectionInfo) {
      this.collectionInfo = this.$route.params.collectionInfo;
      this.collections = this.$route.params.collections
      this.getQuestions(1, this.pagination.pageSize)
    } else {
      this.$router.back();
    }
  },
  methods: {
    handlePageChange(pag, filters, sorter) {
      console.log(pag);
      this.getQuestions(pag.current, pag.pageSize)
    },
    hideAddQuestionModal(){
        this.addQuestionVisible = false
    },
    showAddQuestionModal(){
        this.addQuestionVisible = true
    },
    addQuestion(){
        let api = '/question/add'
        this.newQuestion.collectionId = this.collectionInfo.id
        if(typeof this.newQuestion.answers == 'string'){
            let answer = this.newQuestion.answers
            this.newQuestion.answers = []
            this.newQuestion.answers.push(answer)
            console.log(this.newQuestion)
        }
        if(this.newQuestion.answers.length > 1){
            this.newQuestion.type = 2
        }
        let that = this
        request.post(api, this.newQuestion)
        .then((response)=>{
            let result = response.data
            if(result.code === 200){
                message.success(result.message)
                that.addQuestionVisible = false
            }
            else{
                message.error(result.message)
            }
        })
    },
    getQuestions(pageNum, pageSize){
        let that = this
        request.get('/question/list', {
            params:{
                pageNum: pageNum,
                pageSize: pageSize,
                collectionId: this.collectionInfo.id
            }
        })
        .then((response)=>{
            let result = response.data
            if(result.code === 200){
                that.questions = result.data.records
                that.pagination.current = result.data.current
                that.pagination.total = result.data.total
            }
        })
    },
    showAddQuestionsPage(){
        this.$router.push({name: 'AddQuestions', params: {collectionInfo: this.collectionInfo, collections: this.collections}})
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
.operation-card {
  margin: 20px;
}

.question-card {
  margin: 20px;
}
</style>
