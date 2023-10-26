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

	const storeLeaveRecord = async(data) => {
		axios.defaults.withCredentials = true;
		await axios.post('/v1/api/leaverecords',data).then(() =>{
			router.push({name: 'leaverecords.index'});
		}).catch((e) => {
			if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
		})
	}

	return{
		getLeaveRecords,
		storeLeaveRecord,
		leaverecords,
		errors
	}
}