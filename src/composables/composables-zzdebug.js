import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useDebug(){

	const router = useRouter();
	const errors = ref('');

	
	const clearAttachment = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearattachment/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const clearCommunications = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearcommunications/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const clearNotifications = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearnotifications/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const clearDrafts = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugcleardrafts/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
	const clearActionsTaken = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearactionstaken/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    return {
		errors,
		clearAttachment,
		clearCommunications,
        clearNotifications,
        clearActionsTaken,
        clearDrafts
	
	}
}

