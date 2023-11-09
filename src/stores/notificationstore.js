import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

export const useNotificationStore = defineStore('nsn', {
	state:() => ({
		total: {
			__nc:0,
			__rc:0
		}
	}),
	actions: {
		async fetchNotification(){

			axios.get('/v1/api/gur',{
            	headers: {
            		'xlr': 1
            	}
            }).then((response) => {
            	this.total.__nc = response.data.__nc;
            	this.total.__rc = response.data.__rc;
            	console.log(response);
            });
		}
	},
	getters: {
		getnrc: (state) => {
			return state.total
		},
		
	},
	persist: true,
	

})