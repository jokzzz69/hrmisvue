import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePasswordChange = defineStore('passwordchanged', {
	state:() => ({
		passwordstate: false
	}),
	actions: {
		setstate(newValue){
			this.passwordstate = newValue
		}
	},
	getters: {
		getstate: (state) => {
			return state.passwordstate
		}
	},
	persist: true,
	

})