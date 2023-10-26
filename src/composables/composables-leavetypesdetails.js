import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useLeaveTypesDetails(){

	const leavetypesdetails = ref([]);
	const leavetypesdetail = ref([]);
	const router = useRouter();
	
	const errors = ref('');

	const getLeaveTypesDetails = async () => {
		axios.defaults.withCredentials = true;	
		await axios.get('/v1/api/leavetypesdetails').then((response) => {
			leavetypesdetails.value = response.data.data;
		})
		
	}
	const getLeaveTypesDetail = async (id) => {
		axios.defaults.withCredentials = true;	
        	await axios.get(`/v1/api/leavetypesdetails/${id}`).then((response) => {
	        	leavetypesdetail.value = response.data.data;
	        })

      
   	}
	const destroyLeaveTypesDetail = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/leavetypesdetails/' + id)
	}

	const storeLeaveTypesDetail = async (data) => {
		axios.defaults.withCredentials = true;	
	        errors.value = ''
	 
	        await axios.post('/v1/api/leavetypesdetails/', data).then(() => {
	        	router.push({name: 'leavetypesdetails.index'})
	        }).catch((e) => {
	        	if (e.response.status === 422) {
	                errors.value = e.response.data.errors
	            }
	        })

    }

	const updateLeaveTypesDetail = async (id,data) => {

		axios.defaults.withCredentials = true;			
		errors.value = ''

		await axios.patch(`/v1/api/leavetypesdetails/${id}`, data).then(() =>{
			router.push({ name: 'leavetypesdetails.index' })
		}).catch((e) => {
			if (e.response.status === 422) {
		        for (const key in e.response.data.errors) {
		            errors.value = e.response.data.errors
		        }
		    }
		})

    }
	return{
		errors,
		leavetypesdetail,
		leavetypesdetails,
		getLeaveTypesDetails,
		getLeaveTypesDetail,
		destroyLeaveTypesDetail,
		storeLeaveTypesDetail,
		updateLeaveTypesDetail
	}
}