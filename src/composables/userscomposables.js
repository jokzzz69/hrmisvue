import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useUsers(){
	const users = ref([]);
	const router = useRouter();
	const user = ref([]);
	const authuser = ref([]);
	const errors = ref('');
	const profile = ref([]);

	const privacy = ref([]);


	const getUserProfile = async (id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/v1/api/profile/${id}`);
		profile.value = response.data.data;
	}
	const getUserLoginProfile = async (id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/v1/api/profile/${id}`);
		profile.value = response.data.data;
		if(profile.value.password_changed){
			await router.push({ name: 'profile.edit'})
		}
	}

	const updatePasswordonLogin = async(id,data,slug) => {
		axios.defaults.withCredentials = true;	
		errors.value = ''

	    try {
	        await axios.patch(`/v1/api/changepassword/${id}`, data)
	        if(slug == 'super-admin'){
	        	await router.push({ name: 'dashboard.index'})
	        	await router.go({ force:true })
	        }else{
	        	await router.push({ name: 'recordpersonal.show'})
	        	await router.go({ force:true })
	        }
	        

	    } catch (e) {
	        if (e.response.status === 422) {
	            for (const key in e.response.data.errors) {
	                errors.value = e.response.data.errors
	            }
	        }
	    }
	}
	const updateProfile = async (id,data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''

	    try {
	        await axios.patch(`/v1/api/updateprofile/${id}`, data)
	        await router.push({ name: 'recordpersonal.show' })
	    } catch (e) {
	        if (e.response.status === 422) {
	            for (const key in e.response.data.errors) {
	                errors.value = e.response.data.errors
	            }
	        }
	    }
    }
	const getUsers = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/users');
		users.value = response.data.data;
	}
	const getUser = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/user/${id}`).then((response) => {
        	user.value = response.data.data
        })
        
    }
    const getAuthuser = async() => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/cu`)
    	authuser.value = response.data.data;
    }
    const activateUser = async (id) => {	
    	axios.defaults.withCredentials = true;	
        let response = await axios.post(`/v1/api/user/activate/${id}`)
    }
    const rebootPass = async (id) => {	
    	axios.defaults.withCredentials = true;	
        let response = await axios.patch(`/v1/api/user/rebootpass/${id}`)
    }

    const updateUser = async (id,data) => {	
    	axios.defaults.withCredentials = true;		
        errors.value = ''
        try {
            await axios.patch(`/v1/api/users/${id}`, data)
            await router.push({ name: 'users.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const deactivate = async(id) => {
    	axios.defaults.withCredentials = true;	
    	await axios.delete('/v1/api/users/' + id);
    }

    const logoutuser = async (data) => {
    	axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/logoutuser/',data);
            window.location.href = "/hrmis/login"
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }

    }
    const acceptPrivacy = async(data) => {
    	axios.defaults.withCredentials = true;	
    	errors.value = ''

		await axios.post('/v1/api/acceptprivacy/','',{
            	headers: {
            		'xlr': 1
            	}
            }).catch((e) => {
			if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
		})

    		

    }
    const getPrivacy = async () => {
    	axios.defaults.withCredentials = true;	
		await axios.get('/v1/api/privacy',{
            	headers: {
            		'xlr': 1
            	}
            }).then((response) => {
			privacy.value = response.data;
		});
		
	}
	const bulkActionUser = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''

        axios.post('/v1/api/bulkactionsuser/', data)
        .catch((e) => {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        })
    }
	return{
		errors,
		users,
		user,
		deactivate,
		activateUser,
		updateUser,
		getUsers,
		getUser,
		profile,
		getUserProfile,
		updateProfile,
		updatePasswordonLogin,
		getUserLoginProfile,
		logoutuser,
		acceptPrivacy,
		rebootPass,
		getPrivacy,
		privacy,
		getAuthuser,
		authuser,
		bulkActionUser
	}
}