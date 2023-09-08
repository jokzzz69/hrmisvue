import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useEmployeePosition(){

	const employeepositions = ref([]);
	const router = useRouter();
	const employeeposition = ref([]);
	const errors = ref('');

	const getEmployeePositions = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/bioemployeepositions');
		employeepositions.value = response.data.data;
	}
	const getEmployeePosition = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/bioemployeepositions/${id}`)
        employeeposition.value = response.data.data      
    }
	const destroyEmployeePosition = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/hrmis/api/bioemployeepositions/' + id)
	}

	const storeEmployeePosition = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/hrmis/api/bioemployeepositions/', data)
            await router.push({name: 'employeeposition.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	const updateEmployeePosition = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/hrmis/api/bioemployeepositions/${id}`, employeeposition.value)
            await router.push({ name: 'employeeposition.index' })
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
		employeepositions,
		employeeposition,
		getEmployeePositions,
		getEmployeePosition,
		updateEmployeePosition,
		destroyEmployeePosition,
		storeEmployeePosition
	}
}