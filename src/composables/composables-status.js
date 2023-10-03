import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useEmployeeStatus(){

	const employeestatuses = ref([]);
	const router = useRouter();
	const employeestatus = ref([]);
	const errors = ref('');

	const getEmployeeStatuses = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/employeestatus');
		employeestatuses.value = response.data.data;
	}
	const getEmployeeStatus = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/employeestatus/${id}`)
        employeestatus.value = response.data.data
      
    }
	const destroyEmployeeStatus = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/employeestatus/' + id)
	}

	const storeEmployeeStatus = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/employeestatus/', data)
            await router.push({name: 'employeestatus.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	const updateEmployeeStatus = async (id) => {
		axios.defaults.withCredentials = true;			
        errors.value = ''
        try {
            await axios.patch(`/v1/api/employeestatus/${id}`, employeestatus.value)
            await router.push({ name: 'employeestatus.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
	return{
		errors,
		employeestatuses,
		employeestatus,
		getEmployeeStatuses,
		getEmployeeStatus,
		updateEmployeeStatus,
		destroyEmployeeStatus,
		storeEmployeeStatus
	}
}