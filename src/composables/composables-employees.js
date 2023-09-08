import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useEmployees(){
	const employees = ref([]);
	const biousers = ref([]);
	const router = useRouter();
	const employee = ref([]);
	const errors = ref('');

	const getBioIDS = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/getids');
		biousers.value = response.data.data;
	}
	const getBioUsers = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/bioempusers');
		biousers.value = response.data.data;
	}

	const getEmployees = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/hrmis/api/bioemployees');
		employees.value = response.data.data;
	}
	const getEmployee = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/hrmis/api/bioemployee/${id}`)
        employee.value = response.data.data[0]
    }
    const getEmployeeOptions = async() => {   
    	axios.defaults.withCredentials = true;	 	
    	let response = await axios.get('/hrmis/api/bioemployeesselect');
		employees.value = response.data.data;
    }
	const destroyEmployee = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/hrmis/api/bioemployees/' + id)
	}
	const storeEmployee = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/hrmis/api/bioemployees/', data)
            await router.push({name: 'record.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
	const updateEmployee = async (id) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.patch(`/hrmis/api/bioemployees/${id}`, employee.value)
            await router.push({ name: 'record.index'})
        } catch (e) {
        	console.log(e);
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateEmployeePDS = async (id) => {
    	axios.defaults.withCredentials = true;	
    	errors.value = ''
        try {
            await axios.patch(`/hrmis/api/pdsemployeeupdate/${id}`, employee.value)
            await router.push({ name: 'pds.index' })
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
		employee,
		employees,
		getEmployee,
		getEmployees,
		updateEmployee,
		destroyEmployee,
		storeEmployee,
		biousers,
		getBioUsers,
		updateEmployeePDS,
		getEmployeeOptions,
		getBioIDS
	
	}
}