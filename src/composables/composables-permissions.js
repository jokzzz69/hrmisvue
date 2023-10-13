import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function usePermissions(){
	const permissions = ref([]);
	const permission = ref([]);
	const router = useRouter();
	const role = ref([]);
	const errors = ref('');


	const getPermissions = async() =>{
		axios.defaults.withCredentials = true;
		await axios.get('v1/api/permissions').then((response) => {
			permissions.value = response.data.data;
		});
	}
	const getPermissionsbyRole = async (roleid) => {
        axios.defaults.withCredentials = true;  
		await axios.get(`/v1/api/getrolepermissions/${roleid}`).then((response) => {
            permissions.value = response.data.data
        });

	}
	const getPermission = async (id) => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get(`/v1/api/permissions/${id}`).then((response) => {
        	permission.value = response.data.data;
        })
        
    }

    const storePermission = async(data) => {
    	axios.defaults.withCredentials = true;
    	await axios.post('/v1/api/permissions',data).then(() =>{
    		router.push({name: 'permissions.index'})
    	}).catch((e) => {
    		if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
    	})
    }
    const updatePermission = async(id,data) => {
    	axios.defaults.withCredentials = true;
    	await axios.patch(`/v1/api/permissions/${id}`,data).then(() =>{
    		router.push({name: 'permissions.index'})
    	}).catch((e) => {
    		if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
    	})
    }
   	const destroyPermission = async(id) => {
   		axios.defaults.withCredentials = true;	
		await axios.delete('/v1/api/permissions/' + id)
   	}
	return{
		getPermissionsbyRole,
		getPermissions,
		getPermission,
        permissions,
        permission,
        storePermission,
        updatePermission,
        errors,
        destroyPermission

	       
	}
}