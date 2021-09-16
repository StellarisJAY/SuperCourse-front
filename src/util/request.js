import axios from "axios";
import app from "../main"
const request = axios.create({
    baseURL: 'http://localhost:8001',
    timeout: 3000,
    withCredentials:true
})

request.interceptors.response.use(response => {
        let result = response.data
        if(result.code == 500103){
            app.$router.push({path:"/login"})
        }
        else{
            return response
        }
    },error => {
    // Do something with response error
    return Promise.reject(error);
});

export default request