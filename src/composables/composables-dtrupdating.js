import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useBiolog(){
	const router = useRouter();
	const biolog = ref([]);
	const errors = ref('');

	const getBiolog = async (id) => {		
		axios.defaults.withCredentials = true;	
		try {
            let response = await axios.get(`/hrmis/api/biodtremplog/${id}`);
            biolog.value = response.data.data;
        } catch (e) {
            if (e.response.status === 403) {
                router.push({ name: 'forbidden.index' })
           }else if(e.response.status === 404){
           		router.push({ name: 'force.index' })
           }
        }
	}

	return{
		errors,
		biolog,
		getBiolog
	}
}