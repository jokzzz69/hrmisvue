import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useTravels(){
	const travels = ref([]);
	const router = useRouter();
	const travel = ref([]);
	const errors = ref('');

	const getTravels = async () => {
        axios.defaults.withCredentials = true; 
		let response = await axios.get('/hrmis/api/travels');
		travels.value = response.data.data;
	}
	const getTravel = async (id) => {
        axios.defaults.withCredentials = true; 
        try {
            let response = await axios.get(`/hrmis/api/travels/${id}`)
            travel.value = response.data.data;
        } catch (e) {
            if (e.response.status === 403) {
                router.push({ name: 'forbidden.index' })
           }
        }
     
    }
    const getMyTravels = async(id) => {     
    axios.defaults.withCredentials = true;    
        let response = await axios.get(`/hrmis/api/mytravels/${id}`);
        travels.value = response.data.data;   
    }
    const updateTravel= async (id,data) => {
    axios.defaults.withCredentials = true; 		
        errors.value = ''
        try {
            await axios.patch(`/hrmis/api/travels/${id}`, data)
            await router.push({ name: 'travels.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const storeTravel = async (data) => {
        axios.defaults.withCredentials = true; 
        errors.value = ''
        try {
            await axios.post('/hrmis/api/travels/', data)
            await router.push({name: 'travels.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const destroyTravel = async (id) => {
        axios.defaults.withCredentials = true; 
        await axios.delete('/hrmis/api/travels/' + id)
    }
    const getfilteredTravels = async(data) => {
        axios.defaults.withCredentials = true; 
        let newData = null;
        if(data.date){
            newData = `${data.type}-${data.date.month}-${data.date.year}`;
        }else{
            newData = `${data.type}-all`;
        }        

        let response = await axios.get(`/hrmis/api/getfilteredtravel/${newData}`);
        travels.value = response.data.data;        
    }

	return{
		errors,
		travels,
		travel,
		getTravels,
		getTravel,
        getMyTravels,
        getfilteredTravels,
		updateTravel,
		storeTravel,
        destroyTravel
	}
}