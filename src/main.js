import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/app.css'
import './assets/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createPersistedState } from 'pinia-plugin-persistedstate'

import { createHead } from '@unhead/vue'

import VueSweetalert2 from 'vue-sweetalert2';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';

import router from './router/router.js'
import axios from 'axios';
import nProgress from "nprogress";
import SecureLS from "secure-ls";
import App from './App.vue'

import vSelect from 'vue-select'

axios.defaults.baseURL = 'http://localhost:8000'
//axios.defaults.baseURL = 'https://hrmis.bfarcar.da.gov.ph'

const head = createHead()
const app = createApp(App)
const pinia = createPinia()
const ls = new SecureLS({encodingType: 'des',isCompression: false, encryptionSecret: 'x7i55ebK@aS!Sgzx'});
//pinia.use(piniaPluginPersistedstate);
pinia.use(createPersistedState({

	key: id => `__bfarhrmis__${id}`,
	storage: {
    getItem: key => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: key => ls.removeAll()
  }
}))

app.use(pinia)
.use(VueSweetalert2)
.use(router)
.use(head)
.component('Datepicker', Datepicker)
.component("v-select", vSelect)



app.mount('#app')



// app.config.globalProperties.userrole = userslug;
// app.config.globalProperties.authid = usercont;



axios.interceptors.request.use(config => {
  if(!config.headers.xlr){
		nProgress.start()
	}  
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
	else if(error.response.status === 403){
		window.location.href = "/403";
	}
	nProgress.done();
	return Promise.reject(error);
});