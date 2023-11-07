import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCommunicationGroups(){
	const communicationgroups = ref([]);
	const communicationgroup = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getCommunicationGroups = async () => {
        axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/csgroups')
		communicationgroups.value = response.data.data;		
	}
	const getCommunicationGroup = async (id) => {
        axios.defaults.withCredentials = true;
        let response = await axios.get(`/v1/api/csgroups/${id}`)
        communicationgroup.value = response.data.data
    }
	const storeCommunicationGroup = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''

        await axios.post('/v1/api/csgroups/', data).then(() =>{
            router.push({name: 'communicationgroups.index'})
        }).catch((e) =>{
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        })

    }
    const updateCommunicationGroup = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''

            await axios.patch(`/v1/api/csgroups/${id}`, communicationgroup.value).then(() =>{
                router.push({ name: 'communicationgroups.index' })
            }).catch((e) => {
                if (e.response.status === 422) {
                    for (const key in e.response.data.errors) {
                        errors.value = e.response.data.errors
                    }
                }
            })
            
       
    }
    const updateCommunicationGroupDisplay = async(id,data) =>{
        axios.defaults.withCredentials = true;
        errors.value = ''

        await axios.patch(`/v1/api/csgroupsdisplay/${id}`, data).catch((e) =>{
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        })
    }
    const updateCommunicationGroupEmployees = async (id,data) => {
        axios.defaults.withCredentials = true;
    	errors.value = ''

        await axios.patch(`/v1/api/csgroupsemployees/${id}`, data).then(() =>{
            router.push({ name: 'communicationgroups.index' }) 
        }).catch((e) =>{
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        })

    }

	const destroyCommunicationGroup = async (id) => {
        axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/csgroups/' + id)
	}

	

	return {
		errors,
		communicationgroups,
		communicationgroup,
		getCommunicationGroups,
		getCommunicationGroup,
		storeCommunicationGroup,
		updateCommunicationGroup,
		destroyCommunicationGroup,
		updateCommunicationGroupEmployees,
        updateCommunicationGroupDisplay
		
		
	}
}

