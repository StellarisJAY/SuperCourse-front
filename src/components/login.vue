<template>
  <div>
      <a-card class="login-card">
        <a-form v-model="loginForm" :layout="'vertical'">
            <a-form-item label="手机号">
                <a-input type="text" v-model="loginForm.id" class="form-input" placeholder="请输入注册的手机号码"></a-input>
            </a-form-item>
            <a-form-item label="密码">
                <a-input type="password" v-model="loginForm.password" class="form-input" placeholder="请输入密码"></a-input>
            </a-form-item>
            <a-button type="primary" class="login-button" block @click="login">登录</a-button>
            <a-button type="link" class="register-button" block>注册</a-button>
        </a-form>
      </a-card>
  </div>
</template>

<script>
import md5 from 'js-md5'
import request from '../util/request'
import {message} from 'ant-design-vue'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
          id: null,
          password: null
      }
    }
  },
  methods:{
    login(){
      let that = this
      // validation here
      if(this.loginForm.id == null || this.loginForm.password == null){
        console.log("enter id and pwd please")
      }
      // md5 preprocess
      let password = md5(this.loginForm.password)
      request.post('/login', {id: this.loginForm.id, password: password})
      .then((response)=>{
        let result = response.data
        if(result.code == 200){
          message.success("登录成功，欢迎您")
          if(result.data == 1){
            that.$router.push({path:'/teacher/course'})
          }
          else if(result.data == 0){
            that.$router.push({path:'/study/index'})
          }
        }
        else if(result.code === 500101){
          message.warning(result.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.login-card{
    position:absolute;
    width: 30%;
    left: 35%;
    top: 10%;
    float: left;
    box-shadow: 0 2px 8px #f0f1f2;
}
.register-button{
    margin-top: 10px;
}
</style>
