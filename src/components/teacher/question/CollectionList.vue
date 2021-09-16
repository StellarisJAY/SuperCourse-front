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
            <a-card title="公共题集推荐" class="table-card"></a-card>
          </a-row>

          <a-row>
            <a-card title="我的题集" class="table-card">
              <template #extra>
                <a-button type="primary" @click="()=>{addCollectionVisible = true}">添加题集</a-button>
              </template>
              <a-table :dataSource="collections" :pagination="pagination" @change="handlePageChange">
                <a-table-column title="题集标题" key="name" dataIndex="name"></a-table-column>
                <a-table-column title="私有题集">
                  <template slot-scope="collection">
                    <a-switch v-model="collection.privateCollection" @change="onSwitchChange(collection)"></a-switch>
                  </template>
                </a-table-column>
                <a-table-column title="题目总数" key="totalQuestion" dataIndex="totalQuestion"></a-table-column>
                <a-table-column title="操作">
                  <template slot-scope="row">
                    <a-button type="link" @click="showCollectionDetail(row)">详情</a-button>
                  </template>
                </a-table-column>
              </a-table>
              
            </a-card>
          </a-row>
        </a-col>
      </a-row>

      <a-modal :visible="addCollectionVisible" @cancel="()=>{addCollectionVisible = false}" @ok="addCollection">
        <a-form v-model="newCollection" layout="vertical">
          <a-form-item label="题集名称">
            <a-input v-model="newCollection.name"></a-input>
          </a-form-item>
          <a-form-item label="私人题集">
            <a-switch v-model="newCollection.privateCollection"></a-switch>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopTeacher from '../NavbarTopTeacher.vue'
import SidebarTeacher from "../course/Sidebar.vue";
import request from "../../../util/request";
import {message} from 'ant-design-vue'
export default {
  name: "CollectionList",
  components: {
    NavbarTopTeacher,
    sidebar: SidebarTeacher,
  },
  data() {
    return {
      collections:[],
      newCollection: {},
      addCollectionVisible: false,
      pagination: {
        total: 20,
        pageSize: 10,
        current: 1
      }
    };
  },
  mounted() {
    this.getCollections(1, 10)
  },
  methods: {
    handlePageChange(pag, filters, sorter){
      console.log(pag)
    },

    getCollections(pageNum, pageSize){
      let that = this
      request.get('/collection/list', {
        params:{
          pageNum: pageNum,
          pageSize: pageSize
        }
      })
      .then((response)=>{
        let result = response.data
        if(result.code === 200){
          console.log("success")
          that.pagination.total = result.data.total
          that.pagination.current = result.data.current
          that.collections = result.data.records
          that.pagination.pageSize = result.data.size
          console.log(that.collections)
        }
      })
    },

    addCollection(){
      let that = this
      this.newCollection.privateCollection = this.newCollection.privateCollection ? 1 : 0
      request.post('/collection/add', this.newCollection)
      .then((response)=>{
        let result = response.data
        if(result.code === 200){
          message.success(result.message)
          that.addCollectionVisible = false
          that.getCollections(that.pagination.current, that.pagination.pageSize)
        }
        else{
          message.error(result.message)
        }
      })
    },
    onSwitchChange(e){
      console.log(e)
      this.$confirm({
        title: '确认改变题集公开性？',
        onOk(){
          e.privateCollection = e.privateCollection ? 1 : 0
          request.post('/collection/update', e)
          .then((response=>{
            let result = response.data
            if(result.code === 200){
              message.success(result.message)
            }
          }))
        },
        onCancel(){
          e.privateCollection = e.privateCollection == 0 ? 1 : 0
        }
      })
    },

    showCollectionDetail(collection){
      this.$router.push({name: 'CollectionDetail', params:{collectionInfo: collection, collections: this.collections}})
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
