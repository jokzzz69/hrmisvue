import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useSalaryGrade(){

	const salarygrades = ref([]);
	const router = useRouter();
	const salarygrade = ref([]);
	const errors = ref('');
	
	
	const getSalaryGrades = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/salarygrades');
		salarygrades.value = response.data.data;
	}
	const getSalaryGrade = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/salarygrades/${id}`)
        salarygrade.value = response.data.data
      
    }
	const destroySalaryGrade = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/salarygrades/' + id)
	}

	const storeSalaryGrade = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/salarygrades/', data)
            await router.push({name: 'employeestatus.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	const updateEmployeeStatus = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/v1/api/salarygrades/${id}`, salarygrade.value)
            await router.push({ name: 'employeestatus.index' })
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
		salarygrades,
		salarygrade,
		getSalaryGrades,
		getSalaryGrade,
		updateEmployeeStatus,
		destroySalaryGrade,
		storeSalaryGrade
	}
}