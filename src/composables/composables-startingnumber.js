import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useStartingNumber(){
	const startingnumber = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getStartingNumber = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/csstartingnumber');
		startingnumber.value = response.data.data;		
	}

    const updateStartingNumber = async (id) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/csstartingnumber/${id}`, startingnumber.value)
            
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }


	

	return {
		errors,
		startingnumber,
		getStartingNumber,
		updateStartingNumber
		
		
	}
}

