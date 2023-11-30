import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useNotifications(){
	const notifications = ref([]);
	const totalunviewed = ref();
	const totalunread = ref();
	const router = useRouter();
	const errors = ref('');	

	const notificationsMeta = ref([]);
	const pagenotifications = ref([]);

	const getUnviewed = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/guv',{
            	headers: {
            		'xlr': 1
            	}
            })
		totalunviewed.value = response.data;
	}
	const getUnread = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/gur',{
            	headers: {
            		'xlr': 1
            	}
            })
		totalunread.value = response.data;
	}
	const getLimitedNotifications = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/gn',{
            	headers: {
            		'xlr': 1
            	}
            })
		notifications.value = response.data.data;
	}

	const updateUnviewed = async () => {
		axios.defaults.withCredentials = true;
		errors.value = ''
		let response = '';
        try {
            response = await axios.post(`/v1/api/uuv/`, '',{
            	headers: {
            		'xlr': 1
            	}
            });
            totalunviewed.value = response.data;
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
	}
	const getAllMyNotifications = async () => {
		axios.defaults.withCredentials = true;
		await axios.get('/v1/api/allmynotifications',{
        	headers: {
        		'xlr': 1
        	}
        }).then(() => {
        	notifications.value = response.data.data;
        })
		
	}
	const getMyMainPageNotification = async () => {
		axios.defaults.withCredentials = true;
		await axios.get('/v1/api/umpgnotif',{
        	headers: {
        		'xlr': 1
        	}
        }).then((response) => {
        	notifications.value = response.data.data;
        	notificationsMeta.value = response.data.meta;
        })		
	}
	
	const getMyPageNotifications = async(pageid, config) => {
		axios.defaults.withCredentials = true;
		await axios.get(`/v1/api/upgnotif/${pageid}`,config).then((response) => {
			pagenotifications.value = response.data.data;
		});
	}

	return {
		errors,		
		getLimitedNotifications,
		updateUnviewed,
		getUnviewed,
		getUnread,
		totalunviewed,
		totalunread,
		notifications,
		getAllMyNotifications,
		getMyMainPageNotification,
		notificationsMeta,
		getMyPageNotifications,
		pagenotifications
		
		
	}
}

