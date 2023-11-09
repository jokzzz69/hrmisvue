import {ref} from "vue";
import axios from "axios";
import {useRouter} from 'vue-router'

export default function useActionsTaken(){
	const actionstaken = ref([]);
	const actiontaken = ref([]);
	const actiontakenLinks = ref([]);
	const actiontakenMeta = ref([]);
	const errors = ref('');
	const router = useRouter();

	const getUserActionsTaken = async() => {
		axios.defaults.withCredentials = true;
		await axios.get('/v1/api/actionstakenemployee').then((response) => {
			actionstaken.value = response.data.data;
			actiontakenLinks.value = response.data.links;
			actiontakenMeta.value = response.data.meta;
		});
	}
	const editActionTaken = async (id) =>{
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/editactiontaken/${id}`).then((response) => {
			actiontaken.value = response.data.data;
		});		
	}
	const getActionTaken = async (id) =>{
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/actionstaken/${id}`).then((response) => {
			actionstaken.value = response.data.data;
		});		
	}


	const storeActionTaken = async (data) => {
		axios.defaults.withCredentials = true;
		await axios.post('/v1/api/actionstaken/',data).catch((e) =>{
			if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
		});        
	}
	const updateActionTaken = async (id,data) => {
		axios.defaults.withCredentials = true;
		await axios.patch(`/v1/api/actionstaken/${id}`,data).then(() =>{
			router.push({name: 'actionstaken.index'});
		}).catch((e) =>{

			if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
		});
	}
	const updateCommunicationActionTaken = async(id,data) => {
		axios.defaults.withCredentials = true;
		await axios.patch(`/v1/api/updatecat/${id}`,data).catch((e) =>{
			if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
		});
	}
	const destroyActionTaken = async (id) => {
		axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/actionstaken/' + id)
	}
	const bulkactionsAC = async(data) => {
		axios.defaults.withCredentials = true;
		errors.value = ''
	        await axios.post('/v1/api/actionstakenbulkactions/', data).then(() => {
	        	router.push({ name: 'actionstaken.index' })
	        }).catch((e) => {
	        	if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
	        })
	}
	const getUserActionsTakenPage = async(id) => {
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/actionstakenpage/${id}`).then((response) => {
			actionstaken.value = response.data.data;
			actiontakenLinks.value = response.data.links;
			actiontakenMeta.value = response.data.meta;
		});
	}
	const getUserActionsTakenSearch = async (data,config) => {
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/actionstakensearch/${data}`,config).then((response) =>{
			actionstaken.value = response.data.data;
		});		
		
	}

	return {

		errors,
		actionstaken,
		actiontaken,
		getActionTaken,
		storeActionTaken,
		destroyActionTaken,
		getUserActionsTaken,
		getUserActionsTakenPage,
		getUserActionsTakenSearch,
		actiontakenLinks,
		actiontakenMeta,
		editActionTaken,
		updateActionTaken,
		updateCommunicationActionTaken,
		bulkactionsAC
	}
}