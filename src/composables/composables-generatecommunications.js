import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useGenerateCommunications(){	

	const generated = ref([]);


	const generateCommunication = async (data) => {	
        axios.defaults.withCredentials = true;      
        await axios.post(`/v1/api/generatecommunications/`,data).then((response) => {
            genCommunications.value = response.data.data;   
        });        
    }

    
    return{
    	generated,
        generateCommunication
    }
}