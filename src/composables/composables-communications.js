import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useCommunications(){
	const communications = ref([]);
	const communication = ref([]);
	const communicationLinks = ref([]);
	const communicationMeta = ref([]);
	const router = useRouter();
	const errors = ref('');
	
	const getAllCommunications = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/allcommunications')
		communicationLinks.value = response.data.links;
		communicationMeta.value = response.data.meta;		
		communications.value = response.data.data;	
	}
	const getCommunications = async (cf) => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/communications',cf);
		communicationLinks.value = response.data.links;
		communicationMeta.value = response.data.meta;		
		communications.value = response.data.data;	

	}
	const getCommunication = async (id) => {
		axios.defaults.withCredentials = true;

		await axios.get(`/v1/api/communications/${id}`).then((response) => {
			communication.value = response.data.data
		}).catch((e) =>{
			if (e.response.status === 403) {
			    router.push({ name: 'forbidden.index' });
			}else if(e.response.status === 404){
					router.push({ name: 'force.index' });
			}else if(e.response.status === 307){
					router.push({name: 'communications-routed.show', params: { id: id }});
			}
		})
    }

        

    const storeCommunication = async (data) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''
        await axios.post('/v1/api/communications/', data).then(() =>{            	
            router.push({name: 'communications-routed.index'})	  
        }).catch((e) => {
        	console.log(e);
        	if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        })
    }    
    const updateCommunication = async (id,data) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''

        await axios.patch(`/v1/api/communications/${id}`, data).catch((e) => {
	        if (e.response.status === 422) {
	            for (const key in e.response.data.errors) {
	                errors.value = e.response.data.errors
	            }
	        }
    	});
    }

    const destroyCommunication = async (id) => {
    	axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/communications/' + id)
	}
	const search = async (data,config) => {
		axios.defaults.withCredentials = true;
		let response = await axios.get(`/v1/api/communicationsearch/${data}`,config);		
		communications.value = response.data.data;
	}
	const bulkactions = async (data) =>{
		axios.defaults.withCredentials = true;
		errors.value = ''
        try {
            await axios.post('/v1/api/communicationsbulkactions/', data)
            await router.push({ name: 'communications.index' })
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
	}
	const setPage = async(id,config) =>{
		axios.defaults.withCredentials = true;
		let response = await axios.get(`/v1/api/communicationspage/${id}`,config);				
		communications.value = response.data.data;
		communicationLinks.value = response.data.links;
		communicationMeta.value = response.data.meta;
	}
	const pincommunication = async(id) => {

		axios.defaults.withCredentials = true;
		await axios.patch(`/v1/api/communicationspin/${id}`, '',{
			headers: {
        		'xlr': 1
        	}
		});
	}
	
	return {
		errors,
		communication,
		communications,
		getCommunication,
		getCommunications,
		storeCommunication,
		destroyCommunication,
		updateCommunication,
		communicationLinks,
		communicationMeta,
		getAllCommunications,
		search,
		bulkactions,
		setPage,
		pincommunication
	}
}

