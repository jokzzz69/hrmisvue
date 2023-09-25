import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useBiolog(){
	const router = useRouter();
	const biolog = ref([]);
	const errors = ref('');

	const getBiolog = async (id,month) => {		
		axios.defaults.withCredentials = true;	
		await axios.get(`/v1/api/biodtremplog/${id}/${month}`).then((response) => {
			biolog.value = response.data.data;
		}).catch((e) => {
			if (e.response.status === 403) {
                router.push({ name: 'forbidden.index' })
           }else if(e.response.status === 404){
           		router.push({ name: 'force.index' })
           }
		});
	}
	const saveEdited = async(id,data) =>{
		axios.defaults.withCredentials = true;
		await axios.patch(`/v1/api/saveedited/${id}`, data).catch((e) => {
			if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
		});

	}

	return{
		errors,
		biolog,
		getBiolog,
		saveEdited
	}
}