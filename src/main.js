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
import directives from "./directives/index";
import screenResize from "./directives/screenResize";
import clickOutside from "@/directives/clickOutside";

import Echo from 'laravel-echo';


axios.defaults.baseURL = import.meta.env.VITE_BFAR_BASE


const {screenresizedirective} = screenResize()


const head = createHead()
const app = createApp(App)

directives(app);
screenresizedirective(app);
app.directive('click-outside',clickOutside);

const pinia = createPinia()
const ls = new SecureLS({encodingType: 'des',isCompression: false, encryptionSecret: 'x7i55ebK@aS!Sgzx'});

pinia.use(piniaPluginPersistedstate);
// pinia.use(createPersistedState({

// 	key: id => `__bfarhrmis__${id}`,
// 	storage: {
//     getItem: key => ls.get(key),
//     setItem: (key, value) => ls.set(key, value),
//     removeItem: key => ls.removeAll()
//   }
// }))


window.Echo = new Echo({
	broadcaster: 'pusher',
    key: import.meta.env.VITE_BFAR_PUSHER,
    cluster: 'ap1',
    forceTLS: true,
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          axios.defaults.withCredentials = true;
          axios.post(import.meta.env.VITE_BFAR_SUB_BROADCASTING+'/broadcasting/auth',{
              socket_id: socketId,
              channel_name: channel.name,
            }).then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    }
});


app.use(pinia)
.use(VueSweetalert2)
.use(router)
.use(head)
.component('Datepicker', Datepicker)
.component("v-select", vSelect)



app.mount('#app')

axios.interceptors.request.use(config => {
  if(!config.headers.xlr){
		//nProgress.start()
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