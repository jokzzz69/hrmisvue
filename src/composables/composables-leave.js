import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useLeaveRecords(){
	const leaverecords = ref([]);
	const leaverecord = ref([]);

	const router = useRouter();
	
	const errors = ref('');

	const getLeaveRecords = async () => {
		axios.defaults.withCredentials = true;	
		await axios.get('/v1/api/leaverecords').then((response) => {
			leaverecords.value = response.data.data;
		})		
	}
	const getEmployeeLeaveRecords = async() =>{
		axios.defaults.withCredentials = true;
		await axios.get('/v1/api/employeeleaverecords').then((response) =>{
			leaverecords.value = response.data.data;
		});
	}
	const getLeaveRecord = async (id) => {
		axios.defaults.withCredentials = true;	
		    await axios.get(`/v1/api/leaverecords/${id}`).then((response) => {
		    	leaverecord.value = response.data.data
		    })	      
		}
	const storeLeaveRecord = async(data) => {
		axios.defaults.withCredentials = true;
		await axios.post('/v1/api/leaverecords',data).then(() =>{
			router.go(-1);
		}).catch((e) => {
			if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
		})
	}

	const updateLeaveRecord = async (id,data) => {
		axios.defaults.withCredentials = true;	
		
        errors.value = ''

        await axios.patch(`/v1/api/leaverecords/${id}`, data).then(() =>{
        	router.go(-1);
        }).catch((e) => {
        	if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        })
    }
	const destroyLeaveRecord = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/leaverecords/' + id)
	}

	return{
		getLeaveRecords,
		getLeaveRecord,
		storeLeaveRecord,
		getEmployeeLeaveRecords,
		updateLeaveRecord,
		destroyLeaveRecord,
		leaverecords,
		leaverecord,
		errors
	}
}