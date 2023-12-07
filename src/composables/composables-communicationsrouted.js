import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCommunicationsRouted(){
	const communications = ref([]);
	const communication = ref([]);
	const communicationLinks = ref([]);
	const communicationMeta = ref([]);

	const router = useRouter();
	const errors = ref('');


	const getCommunicationRouted = async (id) => {
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/routedcommunications/${id}`).then((response) =>{
			communication.value = response.data.data;

		}).catch((e) => {

			if (e.response.status === 403) {
			    router.push({ name: 'forbidden.index' });
			}else if(e.response.status === 404){
				router.push({ name: 'force.index' });
			}else if(e.response.status === 307){
				router.push({name: 'communications.show', params: { id: id }});
			}
		});       	

    }


	const getCommunicationsRouted = async (cf) => {
		axios.defaults.withCredentials = true;
		await axios.get('/v1/api/routedcommunications',cf).then((response) => {

			communicationLinks.value = response.data.links;
			communicationMeta.value = response.data.meta;		
			communications.value = response.data.data;	
		});
		
	}

	const bulkactionsRouted = async (data) =>{
		axios.defaults.withCredentials = true;
		errors.value = ''

        await axios.post('/v1/api/routedcommunicationsbulkactions/', data).then(() => {
        	router.push({ name: 'communications-routed.index' })
        }).catch((e) => {
        	if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        })
	}
	const searchroutedfile = async (search) => {
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/routedcommunicationssearch/`,{params:{search}}).then((response) => {
			communications.value = response.data.data
		});		
		
	}
	const setPageRouted = async(id) =>{
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/routedcommunicationspage/${id}`).then((response) => {
			communications.value = response.data.data;
			communicationLinks.value = response.data.links;
			communicationMeta.value = response.data.meta;
		});
	}

	const updateRoutedCommunication = async(id,data) => {
		axios.defaults.withCredentials = true;

		await axios.patch(`/v1/api/updateroutedcommunications/${id}`, data).then(() =>{
			router.go(-1);
		}).catch((e) => {
			if (e.response.status === 422) {
		        for (const key in e.response.data.errors) {
		            errors.value = e.response.data.errors
		        }
		    }
		})
	}
	//draft
	const pinrouted = async(id) => {
		axios.defaults.withCredentials = true;
		await axios.patch(`/v1/api/pinrouted/${id}`, '',{
			headers: {
        		'xlr': 1
        	}
		});
	}
    

	

	return {
		errors,
		communication,
		communications,
		communicationLinks,
		communicationMeta,
		bulkactionsRouted,
		getCommunicationRouted,
		getCommunicationsRouted,
		setPageRouted,		
		searchroutedfile,
		updateRoutedCommunication,
		pinrouted


		
		
	}
}

