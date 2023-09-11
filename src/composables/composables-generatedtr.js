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

    

    const downloadpdfDTR = async (data) =>{
        axios.defaults.withCredentials = true;  
        await axios({
        url: `/hrmis/api/export/employeesdtr/${data}`,
        method: 'GET',
        responseType: 'blob',
        }).then((response) => {     
             var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', 'test.pdf');
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }
    return{
    	datagenerated,
    	generateDTRfromData,
        generateEmployeesDTRfromData,
        downloadpdfDTR
    }
}