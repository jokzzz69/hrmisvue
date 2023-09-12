import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useOfficerecord(){
	const officerecords = ref([]);
    const officerecord = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getOfficerecords = async () => { //employees information
        axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/officerecords');
		officerecords.value = response.data.data;
	}
    const getOfficerecordsMonitoring = async () => {
        
        axios.defaults.withCredentials = true;
        let response = await axios.get('/v1/api/officerecordsmonitoring');
        officerecords.value = response.data.data;
    }
    const getOfficeemployeesMonitoring = async () => {
        axios.defaults.withCredentials = true;
        let response = await axios.get('/v1/api/officeemployeesmonitoring');
        officerecords.value = response.data.data;
    } 
	const getOfficerecord = async (id) => {
        axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/officerecords/'+id);
		officerecord.value = response.data.data;
	}
    const getPersonalRecord = async (id) => {
        axios.defaults.withCredentials = true;
        let response = await axios.get('/v1/api/officerecords/personal/'+id);
        officerecord.value = response.data.data;

    }
	const destroyOfficerecord = async (id) => {
        axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/officerecords/' + id);
	}

	const storeOfficerecord = async (data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/officerecords/', data)
            await router.push({name: 'record.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
	const updateOfficerecord = async (id,formdata) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/officerecords/${id}`, officerecord.value)
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
    const updatePersonalOfficerecord = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/personalrecord/${id}`, officerecord.value)
            await router.push({ name: 'recordpersonal.show'})
        } catch (e) {
            console.log(e);
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateBinfo = async(id,data) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try{
            await axios.patch(`/v1/api/personalrecordbns/${id}`, data)
            await router.push({ name: 'recordpersonal.show'})
        }catch (e) {
            console.log(e);
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateEmergencyContact = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/personalrecordemergency/${id}`, officerecord.value)
            await router.push({ name: 'recordpersonal.show'})
        } catch (e) {
            console.log(e);
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateContact = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/personalrecordmycontact/${id}`, officerecord.value)
            await router.push({ name: 'recordpersonal.show'})
        } catch (e) {
            console.log(e);
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateActiveemployment = async(id) => {
        axios.defaults.withCredentials = true;
        errors.value = '';

        try{
            await axios.patch(`/v1/api/personalemployment/${id}`)         
        }catch(e){
            console.log(e);
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
//pds
    const updateMypds = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/${id}`, officerecord.value);
            await router.push({ name: 'pdspersonal.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsFamilyBackground = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/familybackground/${id}`, officerecord.value);
            await router.push({ name: 'pdspersonalfamilybackground.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsEducationalBackground = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/educationalbackground/${id}`, officerecord.value);
            await router.push({ name: 'pdspersonaleducationalbackground.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsEligibility = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/eligibility/${id}`, officerecord.value);
            await router.push({ name: 'pdseligibility.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsWorkExperience = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/workexperience/${id}`, officerecord.value);
            await router.push({ name: 'pdsworkexperience.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsVoluntaryWork = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/voluntarywork/${id}`, officerecord.value);
            await router.push({ name: 'pdsvoluntarywork.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsLearningandDevelopment = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/learninganddevelopment/${id}`, officerecord.value);
            await router.push({ name: 'pdslearninganddevelopment.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsOtherInformation = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/otherinformation/${id}`, officerecord.value);
            await router.push({ name: 'pdsotherinformation.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const updateMypdsLastInformationReference = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/pds/lastinformation/${id}`, officerecord.value);
            await router.push({ name: 'pdslastinformation.show' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }
    const resetMyPds = async (id) => {
        axios.defaults.withCredentials = true;
        errors.value = ''

        try {
            await axios.patch(`/v1/api/pds/reset/${id}`);
            await router.push({ name: 'pdsmydata.show' })
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
		getOfficerecords,
        getOfficerecord,
        officerecords,
        officerecord,
        destroyOfficerecord,
        storeOfficerecord,
        updateOfficerecord,
        updatePersonalOfficerecord,
        updateEmergencyContact,
        getPersonalRecord,
        updateBinfo,
        updateMypds,
        updateMypdsFamilyBackground,
        updateMypdsEducationalBackground,
        updateMypdsEligibility,
        updateMypdsWorkExperience,
        updateMypdsVoluntaryWork,
        updateMypdsLearningandDevelopment,
        updateMypdsOtherInformation,
        updateMypdsLastInformationReference,
        resetMyPds,
        getOfficerecordsMonitoring,
        getOfficeemployeesMonitoring,
        updateContact,
        updateActiveemployment
	}
}