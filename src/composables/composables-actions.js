import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useActions(){
	const actions = ref([]);
	const action = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getActions = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/csactions')
		actions.value = response.data.data;		
	}
	const getAction = async (id) => {
		axios.defaults.withCredentials = true;
        let response = await axios.get(`/v1/api/csactions/${id}`)
        action.value = response.data.data
    }
	const storeAction = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/csactions/', data)
            await router.push({name: 'actions.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const updateAction = async (id) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/csactions/${id}`, action.value)
            await router.push({ name: 'actions.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

	const destroyAction = async (id) => {
		axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/csactions/' + id)
	}

	

	return {
		errors,
		action,
		actions,
		getAction,
		getActions,
		storeAction,
		destroyAction,
		updateAction
		
		
	}
}

