import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useGenerateCommunications(){	

	const generated = ref([]);
    const errors = ref([]);

	const generateCommunication = async (data) => {	
        axios.defaults.withCredentials = true;      

        await axios.post(`/v1/api/generatecommunications/`,data)
            .then((response) => {
                generated.value = response.data.data;   
            }).catch((e) => {
                console.error(e.response.data);
                if (e.response.status === 422) {
                    errors.value = e.response.data.errors
                }
            });
    }

    const downloadExcel = async(data) =>{
        axios.defaults.withCredentials = true;  
        await axios.post('/v1/api/dlgeneratedcommunications/', data, {responseType: 'arraybuffer'})        
        .then((response) => {
             var newFname = 'Communications-'+Date.now().toString()+'.xlsx';
             var fileURL = window.URL.createObjectURL(new Blob([response.data]));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', newFname);
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }
    return{
    	generated,
        errors,
        generateCommunication,
        downloadExcel
    }
}