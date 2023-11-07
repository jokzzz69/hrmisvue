import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useDocumentTypes(){
	const documenttypes = ref([]);
	const documenttype = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getDocumentTypes = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/csdocumenttypes')
		documenttypes.value = response.data.data;		
	}
	const getDocumentType = async (id) => {
		axios.defaults.withCredentials = true;
        let response = await axios.get(`/v1/api/csdocumenttypes/${id}`)
        documenttype.value = response.data.data
    }
	const storeDocumentType = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/csdocumenttypes/', data)
            await router.push({name: 'documenttypes.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const updateDocumentType = async (id) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/csdocumenttypes/${id}`, documenttype.value)
            await router.push({ name: 'documenttypes.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

	const destroyDocumentType = async (id) => {
		axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/csdocumenttypes/' + id)
	}

	

	return {
		errors,
		documenttype,
		documenttypes,
		getDocumentType,
		getDocumentTypes,
		storeDocumentType,
		destroyDocumentType,
		updateDocumentType
		
		
	}
}

