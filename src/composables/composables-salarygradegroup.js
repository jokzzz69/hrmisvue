import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useSalaryGradeGroup(){

	const salarygradegroups = ref([]);
	const router = useRouter();
	const salarygradegroup = ref([]);
	const salarygradenames = ref([]);
	const salarygradesteps = ref([]);
	const errors = ref('');
	

	const getSalaryGradeGroups = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/salarygradegroups');
		salarygradegroups.value = response.data.data;
	}
	const getSalaryGradeGroup = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/salarygradegroups/${id}`)
        salarygradegroup.value = response.data.data      
    }

    const getSalaryGradeName = async(id) => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/hrmis/api/salarygradegroups/salarygrade/${id}`)
    	salarygradenames.value = response.data.data;
    }
    const getSalaryGradeSteps = async(id) => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/hrmis/api/salarygradegroups/salarygradesteps/${id}`)
    	salarygradesteps.value = response.data.data;
    }

	const destroySalaryGradeGroup = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/hrmis/api/salarygradegroups/' + id)
	}

	const storeSalaryGradeGroup = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/hrmis/api/salarygradegroups/', data)
            await router.push({name: 'salarygradegroup.index'})
            
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

	const updateSalaryGradeGroup = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/hrmis/api/salarygradegroups/${id}`, salarygradegroup.value)
            await router.push({ name: 'salarygradegroup.index' })
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
		updateSalaryGradeGroup,
		destroySalaryGradeGroup,
		storeSalaryGradeGroup,		
		getSalaryGradeGroups,
		salarygradegroups,
		getSalaryGradeGroup,
		salarygradegroup,			
		getSalaryGradeName,
		salarygradenames,
		getSalaryGradeSteps,
		salarygradesteps
	}
}