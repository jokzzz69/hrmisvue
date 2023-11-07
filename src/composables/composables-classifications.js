import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useClassfications(){
	const classifications = ref([]);
	const classification = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getClassifications = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/csclassifications')
		classifications.value = response.data.data;		
	}
	const getClassification = async (id) => {
		axios.defaults.withCredentials = true;
        let response = await axios.get(`/v1/api/csclassifications/${id}`)
        classification.value = response.data.data
    }
	const storeClassification = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/csclassifications/', data)
            await router.push({name: 'classifications.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const updateClassification = async (id) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/csclassifications/${id}`, classification.value)
            await router.push({ name: 'classifications.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

	const destroyClassification = async (id) => {
		axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/csclassifications/' + id)
	}

	

	return {
		errors,
		classifications,
		classification,
		getClassifications,
		getClassification,
		storeClassification,
		updateClassification,
		destroyClassification
		
		
	}
}

