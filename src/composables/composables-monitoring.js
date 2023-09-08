import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useMonitoring(){
	const monitoringbiometrics = ref([]);
	const router = useRouter();
	const monitoringbiometric = ref([]);
	const biometricsData = ref([]);
	const errors = ref('');

	const getEmployeebiometrics = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/biodtr/');
		monitoringbiometrics.value = response.data.data;
	}
	const getEmployeebiometric = async (id) => {		
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/hrmis/api/biodtr/${id}`)
		monitoringbiometric.value = response.data.data
	}
	const getOfficeEmployeeBio = async (id) => {	
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/biodtrofficeemployee/${id}`).catch(function(e){
        	if(e.response.status === 401){
        		router.push({name: 'force.index'})
        	}
        })
        monitoringbiometric.value = response.data.data
	}
	const getEmployeemonthBio = async (id,data) => {	
		axios.defaults.withCredentials = true;		
		try {
            let response = await axios.get(`/hrmis/api/biodtrperemp/${id}/${data}`)
			biometricsData.value = response.data.data
        } catch (e) {
            if (e.response.status === 403) {
                router.push({ name: 'forbidden.index' })
           }
        }
	}
	return{
		errors,
		monitoringbiometric,
		monitoringbiometrics,
		getEmployeebiometrics,
		getEmployeebiometric,
		getOfficeEmployeeBio,
		getEmployeemonthBio,
		biometricsData
	}
}