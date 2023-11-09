import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCommunicationsDraft(){
	const drafts = ref([]);
	const draft = ref([]);
	const draftcount = ref(null);
	const draftLinks = ref([]);
	const draftMeta = ref([]);

	const router = useRouter();
	const errors = ref('');

   
    const getCommunicationsDraft = async () => {
    	axios.defaults.withCredentials = true;
    	
		await axios.get('/v1/api/draftcommunications').then((response) => {
			drafts.value = response.data.data;
			draftLinks.value = response.data.links;
			draftMeta.value = response.data.meta;
		});
		
	}
	const setPageDraft = async(id) =>{
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/draftcommunicationspage/${id}`).then((response) => {
			drafts.value = response.data.data;
			draftLinks.value = response.data.links;
			draftMeta.value = response.data.meta;
		});		
		
	}

	const storeAsDraft = async (data) =>{
		axios.defaults.withCredentials = true;
		errors.value = ''
	    await axios.post('/v1/api/draftcommunications/', data);
	}
	const searchDraft = async (data) => {
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/draftcommunicationssearch/${data}`).then((response) => {
			drafts.value = response.data.data;
		});
	}
	
	const updateCommunicationDraft = async (id,data) => {
		axios.defaults.withCredentials = true;    	
		errors.value = ''
		await axios.patch(`/v1/api/draftcommunications/${id}`, data);

	} //
    const sendCommunicationDraft = async (id,data) => {
		axios.defaults.withCredentials = true;    	
		errors.value = ''

		await axios.patch(`/v1/api/draftcommunicationsend/${id}`, data).then(() =>{
			router.push({name: 'communications-archive.index'});
		}).catch((e) => {
			console.log(e);
			if (e.response.status === 422) {
		        for (const key in e.response.data.errors) {
		            errors.value = e.response.data.errors
		        }
		    }
		})	  
	}
	const getCommunicationDraft = async (id) => {
		axios.defaults.withCredentials = true;    
		await axios.get(`/v1/api/draftcommunications/${id}`).then((response) => {
			draft.value = response.data.data
		}).catch((e) => {
			if (e.response.status === 403) {
				router.push({ name: 'forbidden.index' });
			}else if(e.response.status === 404){
				router.push({ name: 'force.index' });
			}
		})
    	}
	
	const bulkactionsDraft = async (data) =>{
		axios.defaults.withCredentials = true;
		errors.value = ''

	        await axios.post('/v1/api/draftcommunicationsbulkactions/', data).then(() => {
	        	router.push({ name: 'communications-draft.index' })
	        }).catch((e) => {
	        	if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
	        })
	}

	const getUserDraftCount = async () => {
		axios.defaults.withCredentials = true;
		await axios.get('/v1/api/draftcommunicationscount/').then((response) => {
			draftcount.value = response.data;
		})
	}
	

	return {
		errors,
		getCommunicationDraft,
		getCommunicationsDraft,
		bulkactionsDraft,
		updateCommunicationDraft,
		sendCommunicationDraft,
		getUserDraftCount,
		searchDraft,
		storeAsDraft,
		setPageDraft,
		drafts,
		draftLinks,
		draftMeta,
		draft,
		draftcount
		
	}
}

