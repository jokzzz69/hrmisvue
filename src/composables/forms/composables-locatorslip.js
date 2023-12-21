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


	return{
		getMyLocatorSlips,
		locatorslips
	}
}