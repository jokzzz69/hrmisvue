import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/app.css'
import './assets/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueSweetalert2 from 'vue-sweetalert2';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';

import router from './router/router.js'
import axios from 'axios';
import nProgress from "nprogress";

import App from './App.vue'

import vSelect from 'vue-select'



axios.defaults.baseURL = 'http://localhost:8000'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
.use(VueSweetalert2)
.use(router)
.component('Datepicker', Datepicker)
.component("v-select", vSelect)



app.mount('#app')



// app.config.globalProperties.userrole = userslug;
// app.config.globalProperties.authid = usercont;



axios.interceptors.request.use(config => {
  nProgress.start()
  return config
})

axios.interceptors.response.use(function (response) {
	nProgress.done()
	return response;

}, function (error) {

	if(error.response.status === 401) {
	    // redirect to login page
	   localStorage.clear()
     window.location.href = "/login";
	}else if(error.response.status === 422){
		nProgress.done()
	}
	nProgress.done();
	return Promise.reject(error);
});