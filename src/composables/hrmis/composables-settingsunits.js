import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useUnits(){
	const units = ref([]);
	const unit = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getUnits = async () => {
        axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/hrmisunits')
		units.value = response.data.data;		
	}
	const getUnit = async (id) => {
        axios.defaults.withCredentials = true;
        let response = await axios.get(`/v1/api/hrmisunits/${id}`)
        unit.value = response.data.data
    }
	const storeUnit = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''

        await axios.post('/v1/api/hrmisunits/', data).then(() =>{
            router.push({name: 'units.index'})
        }).catch((e) =>{
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        })
    }
    const updateUnit = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''

            await axios.patch(`/v1/api/hrmisunits/${id}`, unit.value).then(() =>{
                router.push({ name: 'units.index' })
            }).catch((e) => {
                if (e.response.status === 422) {
                    for (const key in e.response.data.errors) {
                        errors.value = e.response.data.errors
                    }
                }
            })            
       
    }

	const destroyUnit = async (id) => {
        axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/hrmisunits/' + id)
	}
    const updateUnitEmployees = async (id,data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''

        await axios.patch(`/v1/api/hrmisunitsemployees/${id}`, data).then(() =>{
            router.push({ name: 'units.index' }) 
        }).catch((e) =>{
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        })

    }

	

	return {
		errors,
        units,
        unit,
		getUnits,
        getUnit,
        storeUnit,
        updateUnit,
        destroyUnit,
        updateUnitEmployees
		
		
	}
}

