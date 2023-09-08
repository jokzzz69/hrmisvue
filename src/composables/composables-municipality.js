import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useMunicipality(){
	const municipalities = ref([]);
	const municipality = ref([]);
	const router = useRouter();
	const errors = ref('');
	const provmun = ref([]);
	const perprovmun = ref([]);

	const getMunicipalities = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/municipalities')
		provmun.value = response.data.data;		
	}
	const getMunicipality = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/municipalities/${id}`)
        municipality.value = response.data.data
    }
	const getProvMun = async (id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/hrmis/api/provmunicipalities/${id}`);
		provmun.value = response.data.data;
	}
	const getperProvMun = async (id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/hrmis/api/provmunicipalities/${id}`);
		perprovmun.value = response.data.data;
	}
	

	return {
		errors,
		municipality,
		municipalities,
		getMunicipalities,
		getMunicipality,
		provmun,
		perprovmun,
		getProvMun,
		getperProvMun,
		
		
	}
}

