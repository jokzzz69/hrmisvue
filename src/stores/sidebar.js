import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarChange = defineStore('sb', {
	state:() => ({
		isOpen: false
	}),
	actions: {
		setstate(newValue){
			this.isOpen = newValue
		}
	},
	getters: {
		getstate: (state) => {
			return state.isOpen
		}
	}
})