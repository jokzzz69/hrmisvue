import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useHolidays(){
	const holidays = ref([]);
	const router = useRouter();
	const holiday = ref([]);
	const errors = ref('');
	
	const storeHoliday= async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/hrmis/api/holidays/', data)
            await router.push({name: 'holidays.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
	const getHolidays = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/holidays');
		holidays.value = response.data.data;
	}
	const getHoliday = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/holidays/${id}`)
        holiday.value = response.data.data[0]
    }
	const destroyHoliday = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/hrmis/api/holidays/' + id);		
	}	
	const updateHoliday = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/hrmis/api/holidays/${id}`, holiday.value)
            await router.push({ name: 'holidays.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
	return{
		errors,
		holiday,
		holidays,
		getHolidays,
		getHoliday,
		updateHoliday,
		destroyHoliday,
		storeHoliday,
	}
}