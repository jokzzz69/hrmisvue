import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRecipients = defineStore('selun', {
	state:() => ({
		allunits: false,
		allunitheads: false,
		allgroups: false,
		recipients: {			
			selectedunits: null,
			selectedunitheads: null,
			selectedcommgroupsids: null
		}
	}),
	actions: {
		setallunits(val){
			this.allunits = val
		},
		setallunitheads(val){
			this.allunitheads = val
		},
		setallgroups(val){
			this.allgroups = val
		},
		setallgroupfalse(){
			this.allgroups = false
		},
		setselectedunits(val){
			this.recipients.selectedunits = val
		},
		setselectedunitheads(val){
			this.recipients.selectedunitheads = val
		},
		setselectedcommgroupsids(val){
			this.recipients.selectedcommgroupsids = val
		}
	},
	getters: {
		getallunits: (state) => {
			return state.allunits
		},
		getunitheads: (state) => {
			return state.allunitheads
		},
		getallgroups: (state) => {
			return state.allgroups
		},
		getselectedunits: (state) => {
			return state.recipients.selectedunits
		},
		getselectedunitheads: (state) => {
			return state.recipients.selectedunitheads
		},
		getselectedcommgroupsids: (state) => {
			return state.recipients.selectedcommgroupsids
		}
	}
})