import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useLocations(){
	const locations = ref([]);
	const router = useRouter();
	const location = ref([]);
	const errors = ref('');
	const customlocations = ref([]);

	const storeLocation = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/biolocations/', data)
            await router.push({name: 'locations.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const getcustomLocations = async () => {
    	axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/customlocations');
		customlocations.value = response.data.data;
	}
	const getLocations = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/biolocations');
		locations.value = response.data.data;
	}
	const getLocation = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/biolocation/${id}`)
        location.value = response.data.data[0]
    }
	const destroyLocation = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/biolocations/' + id);
		
	}	
	const updateLocation = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/v1/api/biolocations/${id}`, location.value)
            await router.push({ name: 'locations.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
	return{
		errors,
		location,
		locations,
		getLocation,
		getLocations,
		updateLocation,
		destroyLocation,
		storeLocation,
		customlocations,
		getcustomLocations
	}
}