import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRecipients = defineStore('selun', {
	state:() => ({
		recipients: {
			specificemployees: null,
			selectedunitheads: null,
			selectedunitheadgroups: null,
			selectedunitgroups: null,
			allunits: null,
			allgroups: null

		}
	}),
	actions: {
		setspecificemployees(val){
			this.recipients.specificemployees = val
		},
		setselectedunitheads(val){
			this.recipients.selectedunitheads = val
		},
		setselectedunitheadgroups(val){
			this.recipients.selectedunitheadgroups = val
		},
		setselectedunitgroups(val){
			this.recipients.selectedunitgroups = val
		},
		setallunits(val){
			this.recipients.allunits = val
		},
		setallgroups(val){
			this.recipients.allgroups = val
		}


	},
	getters: {
		getspecificemployees: (state) => {
			return state.recipients.specificemployees
		},
		getselectedunitheads: (state) => {
			return state.recipients.selectedunitheads
		},
		getselectedunitheadgroups: (state) => {
			return state.recipients.selectedunitheadgroups
		},
		getselectedunitgroups: (state) => {
			return state.recipients.selectedunitgroups
		},
		getallunits: (state) => {
			return state.recipients.allunits
		},
		getallgroups: (state) => {
			return state.recipients.allgroups
		}
	},
	persist: true,
})