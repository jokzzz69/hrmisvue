import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCM(){
	const router = useRouter();
	const errors = ref('');
	const selectedBio =ref('');
	const newResponse = ref('');
	const storeBio = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/cm/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const getthisBio = async (data) => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.patch(`/v1/api/cm/getBio/${data.id}`,data);
		selectedBio.value = response.data.data;	
    }
   

	const setArchivedID = async (data) => { 
		axios.defaults.withCredentials = true;	   	
    	let response = await axios.patch(`/v1/api/cm/setarchived/${data.id}`);

    }
    const setEmployeeID = async (data) => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.patch(`/v1/api/cm/setemployeeid/${data.id}`);
    }
    const updateID = async (data) => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.patch(`/v1/api/cm/changeemployeeid/${data.oldid}`,data);
    	newResponse.value = response.data.success;
    }
	return {
		errors,
		storeBio,
		getthisBio,
		selectedBio,
		setArchivedID,
		setEmployeeID,
		updateID,
		newResponse
	}
}

