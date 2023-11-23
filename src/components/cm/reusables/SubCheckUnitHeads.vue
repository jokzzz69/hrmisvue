<template>
	<div class="allunits">
        <ul class="list-unstyled">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="all" id="cglevel-all" @change='checkAll()' v-model="allSelected">
                <label class="form-check-label" for="cglevel-all">
                    <strong>All Organization Unit</strong>
                </label>
            </div>
        </ul>
    </div>
    <div class="unitheads"> 
		<ul class="list-unstyled" v-for="(communicationgroup,x) in communicationgroups" :class="`cg-${x}`">
	        <li>
	            <div class="form-check">
	              <input class="form-check-input" type="checkbox" :value="communicationgroup.id" :id="`cglevel-${communicationgroup.cg_code}`"  @change='chkparent(communicationgroup.id)' v-model="recipients.commgroupids">
	              <label class="form-check-label" :for="`cglevel-${communicationgroup.cg_code}`">
	                <strong>{{communicationgroup.name}}</strong>
	              </label>
	            </div>
	            <template v-if="communicationgroup.employees">
	                <ul class="listcgchilds list-unstyled ps-3">
	                    <li v-for="(employee,index) in communicationgroup.employees">
	                        <div class="form-check">
	                            <input class="form-check-input" type="checkbox" :value="employee.id" 
	                                :id="`emp-${x}-${employee.id}-${index}`"
	                                v-model="recipients.sendto" 
	                                @change='chkchild(communicationgroup.id)'>
	                            <label class="form-check-label" :for="`emp-${x}-${employee.id}-${index}`">
	                                {{employee.name}}

	                                <template v-if="communicationgroup.groupsemployeeoffice == 1 || communicationgroup.groupsemployeeunits == 1">
	                                    (<span v-if="communicationgroup.groupsemployeeoffice == 1">
	                                            <strong>{{employee.employments[0].office.offices_name}}</strong>
	                                            <template v-if="communicationgroup.groupsemployeeunits == 1">, </template>
	                                        </span>
	                                        <span v-if="communicationgroup.groupsemployeeunits == 1">
	                                            <template v-for="(unit,unitindex) in employee.units">           
	                                                <strong>{{unit.slug}}</strong><template v-if="unitindex+1 < employee.units.length">, </template>
	                                            </template>  
	                                        </span>)
	                                </template>                                                    

	                            </label>
	                        </div>
	                    </li>
	                </ul>
	            </template>
	        </li>
	    </ul>
	</div>
</template>
<script>
	import useCommunicationGroups from '@/composables/composables-communicationgroups';
	import { reactive,inject, ref, onMounted,watch} from "vue";

	import {useRecipients} from '@/stores/recipients.js'
	import { storeToRefs } from 'pinia'

	export default{

		setup(){
			const st_recipients = useRecipients();
			const {communicationgroups, getActiveCommunicationGroups} = useCommunicationGroups()

			const totalEmpinGroups = reactive({
                'total': 0
            });
            const allSelected = ref(false);
            const { allunits } = storeToRefs(st_recipients)
            const checkedallunitheads = ref(false);

            const recipients = reactive({
            	'commgroupids': [],
            	'sendto': []
            })
			onMounted(() =>{
				getActiveCommunicationGroups().then(res =>{
                    for (var i in communicationgroups.value) {
                        totalEmpinGroups.total = parseInt(totalEmpinGroups.total  + communicationgroups.value[i].employees.length);
                    }
                })
			})

			st_recipients.$subscribe((mutation, state) => {
				//setallgroups
			    if(state.allunitheads == true && state.allgroups){
			    	allSelected.value = true;
	
			    }else{
			    	allSelected.value = false;
			    }

			})



			const chkchild = async (pID) =>{

                var index = recipients.commgroupids.indexOf(pID);

                if(index !== -1){
                    recipients.commgroupids.splice(index,1);
                }

                let tempLenght = 0;
                let tmexist = 0;

                for (var x in communicationgroups.value) {
                    if(communicationgroups.value[x].id == pID){                       
                        tempLenght = communicationgroups.value[x].employees.length;

                        for (var i in communicationgroups.value[x].employees) {
                            if(recipients.sendto.includes(communicationgroups.value[x].employees[i].id)){
                                tmexist++;
                            }
                        }          

                    }
                }

                if(tempLenght == tmexist){
                    recipients.commgroupids.push(pID);
                }

                if(totalEmpinGroups.total ==  recipients.sendto.length+1){
                    checkedallunitheads.value = true;
                    st_recipients.setallunitheads(true);                    
                }else{
                	st_recipients.setallunitheads(false);
                }

                st_recipients.setselectedcommgroupsids(recipients.commgroupids);
                st_recipients.setselectedunitheads(recipients.sendto);


            }
            const chkparent = async(id) => {
                const tempP = [];
                const tempS = recipients.sendto;

                for (var x in communicationgroups.value) {
                    if(communicationgroups.value[x].id == id){
                        if(communicationgroups.value[x].employees){
                            for (var i in communicationgroups.value[x].employees) {
                                tempP.push(communicationgroups.value[x].employees[i].id);
                            }
                        }
                    }
                }

                if (recipients.commgroupids.includes(id)) {
                    const tempConcat =  [...tempS,...tempP];
                    recipients.sendto = [...new Set(tempConcat)];

                }else{                    
                    for (var i in tempP) {
                        var index = recipients.sendto.indexOf(tempP[i]);
                        if(index !== -1){
                            recipients.sendto.splice(index,1);
                        }
                    }                          
                }


                if(totalEmpinGroups.total ==  recipients.sendto.length+1){ 
                    checkedallunitheads.value = true;
                    st_recipients.setallunitheads(true);
                    
                }else{
                   checkedallunitheads.value = false;
                   st_recipients.setallunitheads(false);
                   
                }

                st_recipients.setselectedcommgroupsids(recipients.commgroupids);
                st_recipients.setselectedunitheads(recipients.sendto);

            }
          
            const checkAll = async() => {

                if(allSelected.value){

                    recipients.sendto = [];
                    let tempAllArr = [];

                    for (var x in communicationgroups.value) {
                        recipients.commgroupids.push(communicationgroups.value[x].id);
                        if(communicationgroups.value[x].employees){
                            for (var i in communicationgroups.value[x].employees) {
                                tempAllArr.push(communicationgroups.value[x].employees[i].id);
                            }
                        }
                    }

                    recipients.sendto = [...new Set(tempAllArr)];
                    st_recipients.setallunits(true);
                    st_recipients.setallunitheads(true);
                    st_recipients.setallgroups(true);
                }else{
                    recipients.sendto = [];
                    recipients.commgroupids = [];
                  
                    st_recipients.setallunits(false);
                    st_recipients.setallunitheads(false);
                    st_recipients.setallgroups(false);
                }

                st_recipients.setselectedcommgroupsids(recipients.commgroupids);
                st_recipients.setselectedunitheads(recipients.sendto);

            }

            return {
            	chkparent,
				checkAll,
				chkchild,
				communicationgroups,
				recipients,
				allSelected
            }
		}
	}
</script>