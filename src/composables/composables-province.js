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
		await axios.get('/v1/api/provinces',{
		    headers: {
		        'xlr': 1
		    }
		}).then((response) => {
			provinces.value = response.data.data;
		})
				
	}
	const getProvince = async (id) => {
		axios.defaults.withCredentials = true;	
        await axios.get(`/v1/api/provinces/${id}`,{
	        headers: {
	            'xlr': 1
	        }
	    }).then((response) => {
	    	province.value = response.data.data
	    })
        
    }
	

	
	return {
		errors,
		province,
		provinces,
		getProvinces,
		getProvince,	
		
	}
}

