import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCustomReport(){    
    const errors = ref('');
    const officerecords = ref("");

    const getOfficeRecords= async () => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get('/hrmis/api/generatecustomreport');
        officerecords.value = response.data.data;

    }

    const generateCustomReport = async (data) => {
        axios.defaults.withCredentials = true;  
        errors.value = ''
        try {
            let response = await axios.post(`/hrmis/api/generatecustomreport/`,data);
            officerecords.value = response.data.data;                
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
        
        
    }
    
  
    return{
        generateCustomReport,
        getOfficeRecords,
        errors,
        officerecords
    }
}
