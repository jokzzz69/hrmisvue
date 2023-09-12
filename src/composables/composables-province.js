import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useProvince(){
	const provinces = ref([]);
	const province = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getProvinces = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/provinces')
		provinces.value = response.data.data;		
	}
	const getProvince = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/provinces/${id}`)
        province.value = response.data.data
    }
	

	
	return {
		errors,
		province,
		provinces,
		getProvinces,
		getProvince,	
		
	}
}

