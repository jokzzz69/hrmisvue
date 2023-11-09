import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRoutedStore = defineStore('ias', {
	state:() => ({
		initialRouted: 0
	}),
	actions: {
		setinitialrouted(newValue){
			this.initialRouted = newValue
		}
	},
	getters: {
		getinitialrouted: (state) => {
			return state.initialRouted
		}
	}	

})