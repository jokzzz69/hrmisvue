import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCommunicationStore = defineStore('ics', {
	state:() => ({
		initialCommunication: 0
	}),
	actions: {
		setinitialcomm(newValue){
			this.initialCommunication = newValue
		}
	},
	getters: {
		getinitialcomm: (state) => {
			return state.initialCommunication
		}
	}	

})