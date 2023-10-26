import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
export const useAuthStore = defineStore('ua', {
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
	persist: {
		persist: true
	}
	

})