import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

import { useAuthStore } from '@/stores/store.js'
import { useNavigationStore } from '@/stores/navigationstore.js'
import { usePasswordChange } from '@/stores/changepasswordstore.js'
import { usePrivacyStore } from '@/stores/pristore.js'
import useEventsBus from '@/components/helper/Eventbus';
import nProgress from "nprogress";


export default function useAuthenticate(){

	const {emit}=useEventsBus()
	const errors = ref('');
	const router = useRouter();
	const desc = ref([]);
	const store = useAuthStore()
	const noPassChange = ref(false);
	const navigationstore = useNavigationStore();
	const changepasswordstore = usePasswordChange();
	const pristore = usePrivacyStore();
	const info = ref();


	const currentUser = async() => {
		axios.defaults.withCredentials = true;	
		const pluck = (arr, key) => arr.map(i => i[key]);
		await axios.get('/v1/api/cu',{
            	headers: {
            		'xlr': 1
            	}
            }).then(response =>{

            	if(response.data.data.userinformation){
            		desc.value = [
            			response.data.data.employee_id,
            			pluck(response.data.data.roles,'slug'),
            			true,
            			response.data.data.employments[0].type_id,
            			response.data.data.permissions,
            			response.data.data.userinformation.cname
            		];
            	}else{
            		desc.value = [response.data.data.employee_id,pluck(response.data.data.roles,'slug'),'Guest'];
            	}


			store.setdetails(desc.value);

			emit('isLoggedin', true);

			if(response.data.data.userinformation){
				navigationstore.setname(response.data.data.userinformation.cname);
				emit('userLoggedIn', response.data.data.userinformation.cname);
			}

			if(response.data.data.password_changed != 1){	
				changepasswordstore.setstate(false);
				emit('isChanged', false);
				router.push({name: 'changepasswordlogin.index'});

			}else{
				changepasswordstore.setstate(true);		
				emit('isChanged', true);
				router.push({name: 'recordpersonal.show'});
			}
		});     	
		
	}
	const login = async (data) => {
        errors.value = ''
        axios.defaults.withCredentials = true;		
		await axios.get(import.meta.env.VITE_BFAR_SUBLINK+'/sanctum/csrf-cookie').then(response => {
			axios.post(import.meta.env.VITE_BFAR_SUBLINK+'/login', data).then(res => {
			 	currentUser();
			 	nProgress.start();
			}).catch(e => {
				nProgress.done();
			 	if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
			})	        
		});
    }
    const logout = async () => {
    	axios.defaults.withCredentials = true;
    		nProgress.start();
		 	await axios.post('/v1/api/logoutuser').then((res) => {
		 		nProgress.done();
		 		store.setdetails(null);
		 		navigationstore.setname(null);
		 		changepasswordstore.setstate(false);
		 		pristore.setdil(false); 		
		 	}).catch((e) => {
		 		nProgress.done();
		 		if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
		 	});
		 	
			await router.push({name: 'login.index'})
		 
    }

    const getinfo = async () => {
    	axios.defaults.withCredentials = true;

    	await axios.get('v1/api/info').then((res) => {
    		info.value = res.data;
    	});
    }
	

	return {
		login,
		errors,
		logout,
		info,
		getinfo
		
	}
}

