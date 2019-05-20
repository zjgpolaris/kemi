import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = process.env.VUE_APP_BaseURL;

axios.interceptors.request.use(function (config) {
    var token = localStorage.getItem("token");
    config.headers.common['Authorization'] = "Bearer "+token;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

//jgaxios本体
var jgaxios = {
    get(url,params){
        return axios.get(url,{params})
    },
    post(url,params){
        return axios.post(url,params)
    }
}

Vue.prototype.$http = jgaxios;

export default jgaxios