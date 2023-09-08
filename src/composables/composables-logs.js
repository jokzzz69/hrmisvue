import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useActivityLogs(){
	const activitylogs = ref([]);
	const activitylog = ref([]);
	const router = useRouter();

	const getLogs = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/activitylogs')
		activitylogs.value = response.data.data;		
	}
	const getLog = async (id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/hrmis/api/activitylog/${id}`)
		activitylog.value = response.data.data;		
	}
	return {
		getLogs,
		activitylogs,
		activitylog,
		getLog
	}
}

