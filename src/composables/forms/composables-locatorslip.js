import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useLocatorSlips(){
	const locatorslips = ref([]);
	const locatorslip = ref([]);
	const router = useRouter();	
	const errors = ref('');

	const getMyLocatorSlips = async() => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/mylocatorslips');
		locatorslips.value = response.data.data;
	}
	const storeLocatorSlip = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/locatorslips/', data)
       		
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	return{
		getMyLocatorSlips,
		locatorslips,
		storeLocatorSlip,
		errors
	}
}