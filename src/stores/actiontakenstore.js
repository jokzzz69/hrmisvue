import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useActionTakenStore = defineStore('acs', {
	state:() => ({
		initialActionTaken: 0
	}),
	actions: {
		setinitialac(newValue){
			this.initialActionTaken = newValue
		}
	},
	getters: {
		getinitialac: (state) => {
			return state.initialActionTaken
		}
	}	

})