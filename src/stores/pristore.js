import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const usePrivacyStore = defineStore('ps', {
	state:() => ({
		dil: false
	}),
	actions: {
		setdil(newValue){
			this.dil = newValue
		}
	},
	getters: {
		getdil: (state) => {
			return state.dil
		}
	},
	persist: true,
	

})