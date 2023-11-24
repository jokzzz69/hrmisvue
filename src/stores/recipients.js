import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRecipients = defineStore('selun', {
	state:() => ({
		recipients: {			
			selectedunitheads: null,
			selectedunitheadgroups: null,
			selectedunitgroups: null,
		}
	}),
	actions: {
		setselectedunitheads(val){
			this.recipients.selectedunitheads = val
		},
		setselectedunitheadgroups(val){
			this.recipients.selectedunitheadgroups = val
		},
		setselectedunitgroups(val){
			this.recipients.selectedunitgroups = val
		},

	},
	getters: {
		getselectedunitheads: (state) => {
			return state.recipients.selectedunitheads
		},
		getselectedunitheadgroups: (state) => {
			return state.recipients.selectedunitheadgroups
		},
		getselectedunitgroups: (state) => {
			return state.recipients.selectedunitgroups
		}
	}
})