import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useNavigationStore = defineStore('nd', {
	state:() => ({
		name: null
	}),
	actions: {
		setname(newValue){
			this.name = newValue
		}
	},
	getters: {
		getname: (state) => {
			return state.name
		}
	},
	persist: true,
	

})