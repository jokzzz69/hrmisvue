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

	const hc = {
        headers: {
            'xlr': 1
        }
    };

	const getMunicipalities = async () => {
		axios.defaults.withCredentials = true;	
		await axios.get('/v1/api/municipalities',hc).then((response) => {
			provmun.value = response.data.data;
		})
		
	}
	const getMunicipality = async (id) => {
		axios.defaults.withCredentials = true;	
        await axios.get(`/v1/api/municipalities/${id}`,hc).then((response) => {
        	municipality.value = response.data.data
        })
        
    }
	const getProvMun = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.get(`/v1/api/provmunicipalities/${id}`,hc).then((response) => {
			provmun.value = response.data.data;
		})
		
	}
	const getperProvMun = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.get(`/v1/api/provmunicipalities/${id}`,hc).then((response) => {
			perprovmun.value = response.data.data;
		});
		
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

