<template>
	<div class="allunits" v-if="!props.isDisplayed">
        <ul class="list-unstyled">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="all" id="cglevel-all" @change='checkAll()' v-model="allgroupsNunits">
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
                    <template v-if="!props.isDisplayed">
                        <input class="form-check-input" type="checkbox" :value="communicationgroup.id" :id="`cglevel-${communicationgroup.cg_code}`"  @change='chkparent(communicationgroup.id)' v-model="recipients.commgroupids">
                        <label class="form-check-label" :for="`cglevel-${communicationgroup.cg_code}`">
                            <strong>{{communicationgroup.name}}</strong>
                        </label>
                    </template>	              
                    <template v-else>
                        <span class="sp-label-inline">
                            <strong>{{communicationgroup.name}}</strong>
                        </span>
                    </template>
	            </div>                
	            <template v-if="communicationgroup.employees">
	                <ul class="listcgchilds list-unstyled">
	                    <li v-for="(employee,index) in communicationgroup.employees">
	                        <div class="form-check">
	                            <input class="form-check-input" type="checkbox" :value="employee.id" 
	                                :id="`emp-${x}-${employee.id}-${index}`"
	                                v-model="recipients.sendto" 
	                                @change='chkchild(communicationgroup.id)' :disabled="props.isDisplayed">
	                            <label class="form-check-label" :for="`emp-${x}-${employee.id}-${index}`">
	                                {{employee.name}}
	                                <template v-if="communicationgroup.groupsemployeeoffice == 1 || communicationgroup.groupsemployeeunits == 1">
	                                    <span class="lbl-unitsTitle">(
                                             <span v-if="communicationgroup.groupsemployeeoffice == 1">
                                                    <strong>{{employee.employments[0].office.offices_name}}</strong>
                                                    <template v-if="communicationgroup.groupsemployeeunits == 1">, </template>
                                                </span>
                                                <span v-if="communicationgroup.groupsemployeeunits == 1">
                                                    <template v-for="(unit,unitindex) in employee.units">           
                                                        <strong>{{unit.slug}}</strong><template v-if="unitindex+1 < employee.units.length">, </template>
                                                    </template>  
                                                </span>   
                                        )</span>
	                                </template> 
	                            </label>
	                        </div>
	                    </li>
	                </ul>
	            </template>
	        </li>
	    </ul>
        <!-- <div class="specificreceiver">
            <span class="sp-frmtitle d-block"><strong>Other Employees:</strong></span>
            <SubCheckCustom/>
        </div> -->
	</div>
</template>
<script>
	import useCommunicationGroups from '@/composables/composables-communicationgroups';
	import { reactive,inject, ref, onMounted, watch, nextTick, defineAsyncComponent} from "vue";

    import useEventsBus from '@/components/helper/Eventbus';

    import {useRecipients} from "@/stores/recipients.js"

    const SubCheckCustom = defineAsyncComponent(() => 
        import('@/components/cm/reusables/SubCheckCustom.vue')
    );
	export default{
        components: {
            SubCheckCustom
        },
        props: {
            isDisplayed: {
                type: Boolean,
                required: true
            }
        },
		setup(props){
            const {emit,bus}=useEventsBus()
            const st_recipients = useRecipients();

			const {communicationgroups, getActiveCommunicationGroups} = useCommunicationGroups()
			const totalEmpinGroups = reactive({
                'total': 0
            });
            const allgroupsNunits = ref(false);
            const allgroups = ref(false);
            const allunitheads = ref(false);
            const emittedSelectedUnits = ref([]);




            const recipients = reactive({
            	'commgroupids': [],
            	'sendto': []
            })

            watch(()=>bus.value.get('emitterselectedUnits'), (val) => {
                [emittedSelectedUnits.value] = val ?? []
                setStoreValue();
            })


            watch(()=>bus.value.get('allgroupsstatus'), (val) => {
                [allgroups.value] = val ?? [] 
                checkStatusall()
                setStoreValue();
            })

			onMounted(() =>{
                
				getActiveCommunicationGroups().then(res =>{
                    for (var i in communicationgroups.value) {
                        totalEmpinGroups.total = parseInt(totalEmpinGroups.total  + communicationgroups.value[i].employees.length);
                    }
                    
                    if(st_recipients.getselectedunitgroups){
                        emittedSelectedUnits.value = st_recipients.getselectedunitgroups;
                    }  

                    if(st_recipients.getselectedunitheads){

                        recipients.sendto = st_recipients.getselectedunitheads;
                    }


                    if(st_recipients.getselectedunitheadgroups){
                        recipients.commgroupids = st_recipients.getselectedunitheadgroups;
                    }
                    if(st_recipients.getallunits){
                        allgroupsNunits.value = true;
                        allgroups.value = true;
                    }



                })
			})


            const setStoreValue = async() => {
 
                st_recipients.setselectedunitheads(recipients.sendto);
                st_recipients.setselectedunitheadgroups(recipients.commgroupids);
                st_recipients.setselectedunitgroups(emittedSelectedUnits.value);

                st_recipients.setallunits(allgroupsNunits.value);


                st_recipients.setallgroups(allgroups.value);


            }
            const checkStatusall = async() =>{
                if(allgroups.value == true && allunitheads.value == true){
                    allgroupsNunits.value = true;
                }else{
                    allgroupsNunits.value = false;
                }
            }


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
                    allunitheads.value = true;                   
                }else{
                    allunitheads.value = false;
                }
                checkStatusall();
                setStoreValue();

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
                    allunitheads.value = true;                    
                }else{
                    allunitheads.value = false;              
                }

                checkStatusall()
                setStoreValue();
            }
          
            const checkAll = async() => {
                recipients.sendto = [];
                if(allgroupsNunits.value){
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
                }else{
                    recipients.sendto = [];
                    recipients.commgroupids = [];
                }

                emit('allcheckedtriggered', allgroupsNunits.value);
                allgroups.value = allgroupsNunits.value;
                allunitheads.value = allgroupsNunits.value;

            }

            return {
            	chkparent,
				checkAll,
				chkchild,
				communicationgroups,
				recipients,
				allgroupsNunits,
                props
            }
		}
	}
</script>