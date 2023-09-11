import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

import { useAuthStore } from '@/stores/store.js'
import { useNavigationStore } from '@/stores/navigationstore.js'
import useEventsBus from '@/components/helper/Eventbus';
import nProgress from "nprogress";

export default function useAuthenticate(){

	const {emit}=useEventsBus()
	const errors = ref('');
	const router = useRouter();
	const desc = ref([]);
	const store = useAuthStore()
	const navigationstore = useNavigationStore();

	const currentUser = async() => {
		axios.defaults.withCredentials = true;	
		await axios.get('/hrmis/api/cu').then(response =>{
			desc.value = [response.data.data.employee_id,response.data.data.roles[0].slug, true];
			store.setdetails(desc.value);
			emit('isLoggedin', true);
			if(response.data.data.userinformation){
				navigationstore.setname(response.data.data.userinformation.cname);
				emit('userLoggedIn', response.data.data.userinformation.cname);
			}
		});     	
		await router.push({name: 'recordpersonal.show'});
	}
	const login = async (data) => {
        errors.value = ''
        axios.defaults.withCredentials = true;		
		await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {

			axios.post('http://localhost:8000/login', data).then(res => {
			 	currentUser();
			}).catch(e => {
				nProgress.done();
			 	if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
			})	        
		});
    }
    const checkIfLogin = async() => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
    		currentUser();
    	
    	});
    }
    const logout = async () => {
    	axios.defaults.withCredentials = true;
    	try {

		 	await axios.post('/logoutuser');
		 	localStorage.clear()
		 	store.setdetails(null);
		 	await router.push({name: 'login.index'})
		 	

		 }catch(e){
		 	console.error(e);
		 	if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
		 }
    }


	

	return {
		login,
		errors,
		logout,
		checkIfLogin
		
	}
}

