import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useArchive(){
	const router = useRouter();
	const errors = ref('');
	const archives = ref([]);
    const archive = ref([]);

 
	const getArchives = async () => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get('/v1/api/archives');
		archives.value = response.data.data;
    }
   	
   	const setArchive = async(id,data) => {
        axios.defaults.withCredentials = true;  
   		errors.value = ''
        try {
            await axios.patch(`/v1/api/archives/${id}`, data)
            await router.push({name: 'archives.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
        
    }
   	const deleteArchived = async() => {
        axios.defaults.withCredentials = true;  
   		errors.value = ''
        try {
            await axios.post('/v1/api/archives/', 'test')
            await router.push({name: 'archives.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
   	}
    const getArchiveEmployee = async (id) => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get(`/v1/api/archives/${id}`);
        archive.value = response.data.data;
    }
    const getArchivePDS = async(id) => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get(`/v1/api/archives/pds/${id}`);
        archive.value = response.data.data;
    }
    const restoreArchived = async (id, data) => {
        axios.defaults.withCredentials = true;  
        errors.value = ''

        try {
            await axios.patch(`/v1/api/archives/restore/${id}`, data)
            await router.push({name: 'record.index'})
            
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    

	return {
		getArchives,
		archives,
        archive,
		setArchive,
		errors,
		deleteArchived,
        getArchiveEmployee,
        getArchivePDS,
        restoreArchived
	}
}

