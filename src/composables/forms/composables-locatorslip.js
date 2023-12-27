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
	const getLocatorSlip = async(id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/v1/api/locatorslips/${id}`);
		locatorslip.value = response.data.data;
	}
	const storeLocatorSlip = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/locatorslips/', data);
            router.go(-1);
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const updateLocatorSlip = async (id,data) => {
    	axios.defaults.withCredentials = true; 		
        errors.value = ''
        try {
            await axios.patch(`/v1/api/locatorslips/${id}`, data)
            router.go(-1);
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const destroyLocatorSlip = async (id) => {
    	axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/locatorslips/' + id)	
    }

	return{
		getMyLocatorSlips,
		locatorslips,
		getLocatorSlip,
		locatorslip,
		storeLocatorSlip,
		errors,
		destroyLocatorSlip,		
		updateLocatorSlip,

	}
}