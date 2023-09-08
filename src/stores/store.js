import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authenticate', {
	state:() => ({
		details: null
	}),
	actions: {
		setdetails(newValue){
			this.details = newValue
		}
	},
	getters: {
		getdetails: (state) => {
			return state.details
		}
	},
	persist: true,
	

})