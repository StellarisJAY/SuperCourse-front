<template>
  <a-layout class="layout">
    <a-layout-header class="header">
        <div class="logo">Super Course</div>
      <navbar-top></navbar-top>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">

    </a-layout-content>
  </a-layout>
</template>

<script>
import NavbarTop from './NavbarTop.vue'
export default {
  name: 'Home',
  components:{
      NavbarTop
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.header{
    background-color: #f0f2f5;
    padding: 0px;
}
.logo{
    position:absolute;
    left: 20px;
    top:0px;
    font-size: 20px;
    font-weight: 700;
    color:white;
}
</style>
