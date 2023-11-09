import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useManageFile(){
	const attachedtemp = ref([]);
	const router = useRouter();
	const errors = ref('');


	const uploadTempAttachment = async (data,config) => {
		axios.defaults.withCredentials = true;
		errors.value = ''
	        await axios.post('/v1/api/uploadtempattachment/', data, config).then((response) => {
	        	attachedtemp.value = response.data.data;
	        }).catch((e) => {
	        	if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
	        })
	}

	return{
		attachedtemp,
		uploadTempAttachment
	}
}

