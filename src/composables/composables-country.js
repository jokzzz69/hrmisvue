import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCountry(){
	const countries = ref([]);
	const country = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getCountries = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/countries')
		countries.value = response.data.data;		
	}
	const getCountry = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/countries/${id}`)
        country.value = response.data.data
    }
	

	
	return {
		errors,
		country,
		countries,
		getCountries,
		getCountry,	
		
	}
}

