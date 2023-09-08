import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useGeneratedtr(){	

	const datagenerated = ref("");


	const generateDTRfromData = async (data) => {	
        axios.defaults.withCredentials = true;      
        let response = await axios.post(`/hrmis/api/datagenerated/`,data);
        datagenerated.value = response.data.data;   
    }
    const generateEmployeesDTRfromData = async (data) =>{
        axios.defaults.withCredentials = true;  
        let response = await axios.post(`/hrmis/api/employeesdtr/`,data);
        employeesdatagenerated.value = response.data.data;
    }
    return{
    	datagenerated,
    	generateDTRfromData,
        generateEmployeesDTRfromData
    }
}