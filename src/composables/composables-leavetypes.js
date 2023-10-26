import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useLeaveTypes(){

	const leavetypes = ref([]);
	const leavetype = ref([]);
	const router = useRouter();
	
	const errors = ref('');

	const getLeaveTypes = async () => {
		axios.defaults.withCredentials = true;	
		await axios.get('/v1/api/leavetypes').then((response) => {
			leavetypes.value = response.data.data;
		})
		
	}
	const getLeaveType = async (id) => {
		axios.defaults.withCredentials = true;	
        await axios.get(`/v1/api/leavetypes/${id}`).then((response) => {
        	leavetype.value = response.data.data
        })

      
    }
	const destroyLeaveType = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/leavetypes/' + id)
	}

	const storeLeaveType = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
 
        await axios.post('/v1/api/leavetypes/', data).then(() => {
        	router.push({name: 'leavetypes.index'})
        }).catch((e) => {
        	if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        })

    }

	const updateLeaveType = async (id) => {
		axios.defaults.withCredentials = true;	
		
        errors.value = ''

        await axios.patch(`/v1/api/leavetypes/${id}`, leavetype.value).then(() =>{
        	router.push({ name: 'leavetypes.index' })
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
		leavetype,
		leavetypes,
		getLeaveTypes,
		getLeaveType,
		destroyLeaveType,
		storeLeaveType,
		updateLeaveType
	}
}