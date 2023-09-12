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

    const downloadperEmployeeDTR = async (data, name) => {
        axios.defaults.withCredentials = true;  
        await axios.post('/hrmis/api/export/peremployeedtr/', data, { responseType: 'blob'})
        .then((response) => {     
             var newFname = name.replace(/\s/g,'')+'-'+Date.now().toString()+'.pdf';
             var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', newFname);
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }


    const downloadAllEmployeesDTR = async (data, name) =>{
        axios.defaults.withCredentials = true;  
        await axios.post('/hrmis/api/export/allemployeesdtr/', data, { responseType: 'blob'})
        .then((response) => {
            var newFname = '';
             if(name == 1){
                newFname = 'JobOrder-'+Date.now().toString()+'.pdf';
             }else if(name == 0){
                newFname = 'Permanent-'+Date.now().toString()+'.pdf';
             }else{
                newFname = 'AllEmployees-'+Date.now().toString()+'.pdf';
             }
             var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', newFname);
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }
    return{
    	datagenerated,
    	generateDTRfromData,
        generateEmployeesDTRfromData,
        downloadAllEmployeesDTR,
        downloadperEmployeeDTR
    }
}