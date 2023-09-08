import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useOffices(){
	const offices = ref([]);
	const router = useRouter();
	const office = ref([]);
	const errors = ref('');
	const customoffices = ref([]);
	
	const storeOffice = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/hrmis/api/biooffices/', data)
            await router.push({name: 'offices.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	const getOffices = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/biooffices');
		offices.value = response.data.data;
	}
	const getcustomOffices = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/customlocations');
		customoffices.value = response.data.data;
	}

	const getOffice = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/biooffice/${id}`)
        office.value = response.data.data[0]
    }
	const destroyOffice = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/hrmis/api/biooffices/' + id);
		
	}	
	const updateOffice = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/hrmis/api/biooffices/${id}`, office.value)
            await router.push({ name: 'offices.index' })
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
		office,
		offices,
		getOffice,
		getOffices,
		updateOffice,
		destroyOffice,
		getcustomOffices,
		customoffices,
		storeOffice
	}
}