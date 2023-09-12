import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function usePDS(){
	const downloadresponse = ref([]);
	const router = useRouter();

	const downloadPDS = async (id, name) => {
		axios.defaults.withCredentials = true;	
		await axios({
		url: `/v1/api/export/pds/${id}`,
		method: 'GET',
		responseType: 'blob',
		}).then((response) => {
			var newFname = name.replace(/\s/g,'')+'-'+Date.now().toString()+'.pdf';
		     var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
		     var fileLink = document.createElement('a');
		     fileLink.href = fileURL;
		     fileLink.setAttribute('download', newFname);
		     document.body.appendChild(fileLink);
		     fileLink.click();
		});
		// let response = await axios.get('/v1/api/biooffices');
		// offices.value = response.data.data;
	}

	const downloadArchivePDS = async (id, name) => {
		axios.defaults.withCredentials = true;	
		await axios({
		url: `/v1/api/export/archivedpds/${id}`,
		method: 'GET',
		responseType: 'blob',
		}).then((response) => {
			var newFname = name.replace(/\s/g,'')+'-'+Date.now().toString()+'.pdf';
		     var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
		     var fileLink = document.createElement('a');
		     fileLink.href = fileURL;
		     fileLink.setAttribute('download', newFname);
		     document.body.appendChild(fileLink);
		     fileLink.click();
		});
		// let response = await axios.get('/v1/api/biooffices');
		// offices.value = response.data.data;
	}

	return{
		downloadresponse,
		downloadPDS,
		downloadArchivePDS
	}
}