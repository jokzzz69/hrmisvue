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
		let response = await axios.get('/hrmis/api/bioemployeestatus');
		employeestatuses.value = response.data.data;
	}
	const getEmployeeStatus = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/bioemployeestatus/${id}`)
        employeestatus.value = response.data.data
      
    }
	const destroyEmployeeStatus = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/hrmis/api/bioemployeestatus/' + id)
	}

	const storeEmployeeStatus = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/hrmis/api/bioemployeestatus/', data)
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
            await axios.patch(`/hrmis/api/bioemployeestatus/${id}`, employeestatus.value)
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