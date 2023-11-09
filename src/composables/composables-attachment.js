import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useAttachments(){
	const attachments = ref([]);
	const router = useRouter();
	const errors = ref('');

	const downloadAttached = async(data) =>{
        axios.defaults.withCredentials = true;  
        axios.post('/v1/api/downloadattachment', data,  {responseType: 'blob'}).then((response) =>{
        	var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        	var fileLink = document.createElement('a');
        	fileLink.href = fileURL;
        	fileLink.setAttribute('download', data.filename);
        	document.body.appendChild(fileLink);
        	fileLink.click();
        })

    }

    const getAttachment = async(id) =>{
    	axios.defaults.withCredentials = true;  
    	
    	await axios.get('/v1/api/cucmdts',{
            	headers: {
            		'xlr': 1
            	}
            }).then(response =>{		
				attachments.value = response.data.data;
			});     
    }

	return {
		downloadAttached
		
	}
}

