<template>	
    <div class="chk__aunits w-100">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="chkunits" id="chkunits" @change='checkallgroups()' v-model="allgroups">
            <label for="chkunits">
                <strong>All Groups</strong>
            </label>
        </div>
    </div>
    <ul class="listchchilds list-unstyled ps-3">
        <li v-for="(unit,i) in units">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :name="`ou-${i}`" :value="unit.id" :id="`ou-${i}`" v-model="selectedunits" @change="checkunit()">
                <label class="form-check-label" :for="`ou-${i}`">
                    <strong>{{unit.slug}}</strong>
                </label>
            </div>
        </li>
    </ul>
    
</template>
<script>
	import {onMounted ,ref, computed, reactive,watch} from 'vue';
	import useUnits from '@/composables/hrmis/composables-settingsunits';
	import {useRecipients} from '@/stores/recipients.js'
	import { storeToRefs } from 'pinia'

	export default {
		setup(){
			const {units, getActiveUnits } = useUnits()
			const allgroups =  ref(false);
			const st_recipients = useRecipients();
			const selectedunits = ref([]);
			const pushData = ref(false);

			st_recipients.$subscribe((mutation, state) => {
				console.log(state);
				if(state.allunits){
					for (var unit of units.value) {
		                 selectedunits.value.push(unit.id);
		            }		            
		                        
				}else{
					selectedunits.value = [];
				}
				allgroups.value = state.allgroups;
			})




			const checkallgroups = () => {	
				selectedunits.value = [];		
		        if(allgroups.value){
		            selectedunits.value = [];
		            for (var unit of units.value) {
		                 selectedunits.value.push(unit.id);
		            }		  

		        }else{
		        	selectedunits.value = [];	        
		        }



		    }
		    const checkunit = () => {
		    	const tempr = selectedunits.value;
		        if(units.value.length == selectedunits.value.length){		        	
		            allgroups.value = true;
		        }else{		
		            allgroups.value = false;
		            
		        }

		        

		    }
		    const callback = () => {
		
		    	st_recipients.setallgroups(false);
		    }
		    onMounted(() =>{
		    	getActiveUnits()
		  
		    }) 
		    return {
		    	checkallgroups,
		        checkunit,
		        selectedunits,
		        allgroups,
		        units
		    }
		}
	}
</script>