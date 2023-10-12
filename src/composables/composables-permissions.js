import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function usePermissions(){
	const permissions = ref([]);
	const router = useRouter();
	const role = ref([]);
	const errors = ref('');

	const getPermissionsbyRole = async (roleid) => {
        axios.defaults.withCredentials = true;  
		await axios.get(`/v1/api/getrolepermissions/${roleid}`).then((response) => {
            permissions.value = response.data.data
        });

	}
	const getPermission = async (id) => {
        axios.defaults.withCredentials = true;  
        let response = await axios.get(`/v1/api/role/${id}/roleedit`)
        role.value = response.data.data[0]
    }
   
	return{
		getPermissionsbyRole,
		getPermission,
        permissions
	       
	}
}