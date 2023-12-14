import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useGenerateCommunications(){	

	const datagenerated = ref([]);


	const generateDTRfromData = async (data) => {	
        axios.defaults.withCredentials = true;      
        let response = await axios.post(`/v1/api/datagenerated/`,data);
        datagenerated.value = response.data.data;   
    }
    
    return{
    	
    }
}