import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useEmployees(){
	const employees = ref([]);
	const biousers = ref([]);
	const router = useRouter();
	const employee = ref([]);
	const errors = ref('');
	const availableids = ref();
	const availablewcids = ref();
	const getBioIDS = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/getids');
		biousers.value = response.data.data;
	}
	const getAvailableIDS = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/aid');
		availableids.value = response.data;
	}
	const getAvailableIDSwithcurrentID = async (id) => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/v1/api/caid/${id}`);
		availablewcids.value = response.data;
	}
	
	const getBioUsers = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/bioempusers');
		biousers.value = response.data.data;
	}

	const getEmployees = async () => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/bioemployees');
		employees.value = response.data.data;
	}
	const getEmployee = async (id) => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/bioemployee/${id}`)
        employee.value = response.data.data[0]
    }
    const getEmployeeOptions = async() => {   
    	axios.defaults.withCredentials = true;	 	
    	let response = await axios.get('/v1/api/bioemployeesselect');
		employees.value = response.data.data;
    }
	const destroyEmployee = async (id) => {
		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/bioemployees/' + id)
	}
	const storeEmployee = async (data) => {
		axios.defaults.withCredentials = true;	
        errors.value = ''
        try {
            await axios.post('/v1/api/bioemployees/', data)
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
            await axios.patch(`/v1/api/bioemployees/${id}`, employee.value)
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
            await axios.patch(`/v1/api/pdsemployeeupdate/${id}`, employee.value)
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
		getBioIDS,
		getAvailableIDS,
		availableids,
		getAvailableIDSwithcurrentID,
		availablewcids
	
	}
}