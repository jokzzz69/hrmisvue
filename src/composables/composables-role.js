import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useRoles(){
	const roles = ref([]);
	const router = useRouter();
	const role = ref([]);
	const errors = ref('');

	const getRoles = async () => {
        axios.defaults.withCredentials = true;  
		let response = await axios.get('/v1/api/roles');
		roles.value = response.data.data;
	}
	const getRole = async (id) => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get(`/v1/api/role/${id}/roleedit`)
        role.value = response.data.data[0]
    }
    const updateRole= async (id) => {	
        axios.defaults.withCredentials = true;  	
        errors.value = ''
        try {
            await axios.patch(`/v1/api/roles/${id}`, role.value)
            await router.push({ name: 'roles.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const storeRole = async (data) => {
        axios.defaults.withCredentials = true;  
        errors.value = ''
        try {
            await axios.post('/v1/api/roles/', data)
            await router.push({name: 'roles.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
	return{
		errors,
		roles,
		role,
		getRoles,
		getRole,
		updateRole,
		storeRole
	}
}