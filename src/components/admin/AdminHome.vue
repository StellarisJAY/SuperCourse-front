<template>
  <a-layout class="layout">
    <a-layout-header class="header">
        <div class="logo">Admin</div>
      <navbar-top-admin></navbar-top-admin>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
        <a-row>
            <a-col :span="4">
                <a-menu mode="inline">
                    <a-sub-menu>
                        <template #title>课程管理</template>
                        <a-menu-item-group>
                            <a-menu-item key="1">
                                <span>我的课程</span>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <span>发布课程</span>
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                </a-menu>
            </a-col>
            <a-col :span="20">

            </a-col>
        </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTopAdmin from './NavbarTopAdmin.vue'
export default {
  name: 'AdminHome',
  components:{
      NavbarTopAdmin
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.header{
    background-color: white;
    padding: 0px;
}
.logo{
    position:absolute;
    left: 20px;
    top:0px;
    font-size: 20px;
    font-weight: 700;
}
</style>
