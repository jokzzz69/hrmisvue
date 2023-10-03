import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useOffices(){
	const offices = ref([]);
	const router = useRouter();
	const office = ref([]);
	const errors = ref('');

	
	const storeOffice = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/offices/', data)
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
		let response = await axios.get('/v1/api/offices');
		offices.value = response.data.data;
	}


	const getOffice = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/offices/${id}`)
        office.value = response.data.data[0]
    }
	const destroyOffice = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/offices/' + id);
		
	}	
	const updateOffice = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/v1/api/offices/${id}`, office.value)
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
		storeOffice
	}
}