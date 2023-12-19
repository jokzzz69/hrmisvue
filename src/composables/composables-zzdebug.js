import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'
import nProgress from "nprogress";

export default function useDebug(){

	const router = useRouter();
	const errors = ref('');
    const smstatus = ref([]);

	const updateSMSStatus = async(data) => {
        
        const id = 1;

        try {
            await axios.patch(`/v1/api/smssettingupdate/${id}`, data)
            await router.push({ name: 'cmi.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const getSMSStatus = async(data) => {
        axios.defaults.withCredentials = true;
        await axios.get('/v1/api/smssettings').then((response) => {
            smstatus.value  = response.data;
        });

    }
	const clearAttachment = async (data) => {
        nProgress.start();
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
        nProgress.start();
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
        nProgress.start();
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
        nProgress.start();
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
        nProgress.start();
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
    } //
    const clearUnattached = async (data) => {
        nProgress.start();
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearunattached/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const clearRevisions = async (data) => {
        nProgress.start();
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearclearrevisions/', data)
            await router.push({name: 'cmi.index'})
            
        } catch (e) {
            console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const clearTrash = async (data) => {
        nProgress.start();
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/debugclearcleartrash/', data)
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
        clearDrafts,
        clearUnattached,
        clearRevisions,
        clearTrash,
        updateSMSStatus,
        getSMSStatus,
        smstatus
	
	}
}

