import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useEmployeeTypes(){

	const employeetypes = ref([]);
	const router = useRouter();
	const employeetype = ref([]);
	const errors = ref('');

	const getEmployeeTypes = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/bioemployeetypes');
		employeetypes.value = response.data.data;
	}
	const getEmployeeType = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/bioemployeetypes/${id}`)
        employeetype.value = response.data.data
      
    }
	const destroyEmployeeType = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/bioemployeetypes/' + id)
	}

	const storeEmployeeType = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/bioemployeetypes/', data)
            await router.push({name: 'employeetype.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	const updateEmployeeType = async (id) => {
		axios.defaults.withCredentials = true;	
		
        errors.value = ''
        try {
            await axios.patch(`/v1/api/bioemployeetypes/${id}`, employeetype.value)
            await router.push({ name: 'employeetype.index' })
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
		employeetype,
		employeetypes,
		getEmployeeTypes,
		getEmployeeType,
		updateEmployeeType,
		destroyEmployeeType,
		storeEmployeeType
	}
}