<template>	
    <div class="chk__aunits w-100" v-if="!props.isDisplayed">
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
                <input class="form-check-input" type="checkbox" :disabled="props.isDisplayed" :name="`ou-${i}`" :value="unit.id" :id="`ou-${i}`" v-model="selectedunits" @change="checkunit()">
                <label class="form-check-label pr" :for="`ou-${i}`" @mouseover="groupidhover = unit.id" @mouseleave="groupidhover = null">
                    <strong>{{unit.slug}}</strong>
                    <template v-if="unit.id == groupidhover">
	                    <TooltipLeft :arr="unit.employees" :msg="'TO'"/>
	                </template>                   
                </label>
                
            </div>
        </li>
    </ul>
    
</template>
<script>
	import {onMounted ,ref, computed, reactive,watch, defineAsyncComponent} from 'vue';
	import useUnits from '@/composables/hrmis/composables-settingsunits';
	import useEventsBus from '@/components/helper/Eventbus';
	import {useRecipients} from "@/stores/recipients.js"

	const TooltipLeft = defineAsyncComponent(() => 
        import('@/components/cm/reusables/TooltipLeft.vue')
    );

	//import TooltipLeft from "@/components/cm/reusables/TooltipLeft.vue";

	export default {
		components: {
			TooltipLeft
		},
		props: {
			isDisplayed: {
				type: Boolean,
				required: true
			}
		},
		setup(props){
			const {units, getActiveUnits } = useUnits()
			const allgroups =  ref(false);	
			const selectedunits = ref([]);
			const pushData = ref(false);
			const {emit,bus}=useEventsBus()
			const allcheckedstatus = ref(false);
			const st_recipients = useRecipients();
			const groupidhover = ref(false);

			watch(()=>bus.value.get('allcheckedtriggered'), (val) => {
				[allgroups.value] = val ?? [] //based on all org unit chk

				if(allgroups.value){
		            selectedunits.value = [];
		            for (var unit of units.value) {
		                 selectedunits.value.push(unit.id);
		            }

		        }else{
		        	selectedunits.value = [];	        
		        }
		        emit('selectedgroups', selectedunits.value);
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
		        emit('allgroupsstatus',allgroups.value);
		        emit('selectedgroups', selectedunits.value);
		    }
		    const checkunit = () => {
		    	const tempr = selectedunits.value;
		        if(units.value.length == selectedunits.value.length){		        	
		            allgroups.value = true;
		        }else{		
		            allgroups.value = false;		            
		        }
		        emit('allgroupsstatus',allgroups.value);
		        emit('selectedgroups', selectedunits.value);
		    }

		    onMounted(() =>{
		    	getActiveUnits().then(() => {
		    		if(st_recipients.getselectedunitgroups){
		    			selectedunits.value = st_recipients.getselectedunitgroups;
		    		}		    		
		    	})


		    }) 
		    return {
		    	checkallgroups,
		        checkunit,
		        selectedunits,
		        allgroups,
		        units,
		        props,
		        groupidhover
		    }
		}
	}
</script>