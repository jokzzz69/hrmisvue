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
    
    const downloadcustomPDF = async(data) =>{
        axios.defaults.withCredentials = true;  
        await axios.post('/hrmis/api/export/customreportpdf/', data, { responseType: 'blob'})
        .then((response) => {
             var newFname = 'CustomReport-'+Date.now().toString()+'.pdf';
             var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', newFname);
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }
    const downloadcustomExcel = async(data) =>{
        axios.defaults.withCredentials = true;  
        await axios.post('/hrmis/api/export/customreportexcel/', data, {responseType: 'arraybuffer'})
        
        .then((response) => {
             var newFname = 'CustomReport-'+Date.now().toString()+'.xlsx';
             var fileURL = window.URL.createObjectURL(new Blob([response.data]));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', newFname);
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }
  
    return{
        generateCustomReport,
        getOfficeRecords,
        errors,
        officerecords,
        downloadcustomPDF,
        downloadcustomExcel
    }
}
