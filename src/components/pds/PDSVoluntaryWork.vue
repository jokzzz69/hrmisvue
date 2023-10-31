<template>	 
    <div class="row w-right-nav">
        <div class="col leftpdscontent ptpb">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="rff fs-3 mb-0">Personal Data</h2>
                    <p class="d-block mb-2 fs-6 text-muted"><small>* Leave blank if not applicable</small></p>
                    <div class="pdsupdatedtime mb-2">
                        <template v-if="officerecord.pdspersonalinformation">
                            <span v-if="officerecord.pdspersonalinformation.updated_at">
                                Updated as of {{moment(officerecord.pdspersonalinformation.updated_at).format('MMMM D, YYYY [at] h:mm A')}}
                            </span>
                        </template>
                    </div>                   
                </div>
            </div>   
            <div class="row">
                <div class="col pds-group-title">
                    <span class="rff fs-5">Voluntary Work or Involvement in Civic / Non-Government / People / Voluntary Organization/s</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">               

                <template v-if="officerecord.pdsvoluntarywork">
                    <div class="pPDSwrap container-fluid pb-4 pdsVoluntary">
                        <div class="row mt-3 mb-4 headingtitle">
                            <div class="c_p col-3 pPDSwrap-title text-center  align-items-center">
                                <h2>Name & Addresses of Organization<span>(Write in full)</span></h2>                                
                            </div>
                            <div class="c_p col-4 pPDSwrap-title text-center align-items-center">
                                <h2>Inclusive Dates <span>(mm/dd/yyyy)</span></h2>                                
                            </div>                            
                            <div class="c_p col-1 pPDSwrap-title text-center align-items-center">
                                <h2>Number of Hours</h2>
                            </div>
                            <div class="c_p col-3 pPDSwrap-title text-center align-items-center">
                                <h2>Position / Nature of Work</h2>
                            </div>
                            <div class="col-auto "><span class="noContent"></span></div>
                        </div>                    
                        <template v-if="officerecord.pdsvoluntarywork">
                            <template v-for="(div, key) in divs">  
                                <div class="row mb-2 mt-2 cmpads" >
                                    <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input :id="`volname-${key}`" type="text" name="voluntary_organizationname" class="form-control" placeholder="enter organization" v-model="officerecord.pdsvoluntarywork[key].voluntary_organizationname">   
                                            <label :for="`volname-${key}`" class="form-label">Name & Address</label>
                                        </div>
                                    </div>       

                                    <div class="col-2 c_p">
                                        <template v-if="key < 1">
                                            <div  class="form-text floatinghelp">FROM</div>  
                                        </template>
                                        <div class="input-group cicH">
                                            <span class="input-group-text p-0" title="Select Date">                                            
                                                <Datepicker :teleport="true" auto-apply :enable-time-picker="false" v-model="officerecord.pdsvoluntarywork[key].voluntary_from" @update:model-value="hfrom(key)" class="date-form-floating">
                                                    <template #trigger>
                                                        <p class="cic m-0 p-15"><i class="fa-solid fa-calendar-days"></i></p>
                                                    </template>
                                                </Datepicker>                                          
                                            </span>
                                            <input type="text" :id="`volfrom-${key}`" class="form-control"  v-model="officerecord.pdsvoluntarywork[key].voluntary_from">
                                        </div>                               
                                    </div>

                                    <div class="col-2 c_p">
                                        <template v-if="key < 1">
                                            <div  class="form-text floatinghelp">TO</div>  
                                        </template>
                                        <div class="input-group cicH">
                                            <span class="input-group-text p-0" title="Select Date">                                            
                                                <Datepicker :teleport="true" auto-apply :enable-time-picker="false" v-model="officerecord.pdsvoluntarywork[key].voluntary_to" @update:model-value="hto(key)" class="date-form-floating">
                                                    <template #trigger>
                                                        <p class="cic m-0 p-15"><i class="fa-solid fa-calendar-days"></i></p>
                                                    </template>
                                                </Datepicker>                                          
                                            </span>
                                            <input type="text" :id="`volto-${key}`" class="form-control"  v-model="officerecord.pdsvoluntarywork[key].voluntary_to">
                                        </div>                               
                                    </div>




                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="number" :id="`volhours-${key}`" name="voluntary_numberofhours" step="0.01" class="form-control" placeholder="enter number of hours"  v-model="officerecord.pdsvoluntarywork[key].voluntary_numberofhours">   
                                            <label :for="`volhours-${key}`" class="form-label">Hours</label>
                                        </div>
                                    </div>
                                    <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input :id="`volposition-${key}`" type="text" name="voluntary_position" class="form-control" placeholder="enter position" v-model="officerecord.pdsvoluntarywork[key].voluntary_position">   
                                            <label :for="`volposition-${key}`" class="form-label">Nature of Work</label>
                                        </div>
                                    </div>
                                    
 
                                    <div class="col col-sm-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div>
                            </template>  
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addeligibility">+ Add Voluntary Work</button>
                                </div>
                            </div>                           

                        </template>  
                    </div>

                </template>
            

            
            <div class="form-row">
                <div class="col mt-3 text-end">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>
      
        </form>
        </div>
        <RightNavigation :id="id" />

        

    </div>
</template>

<script>

import useOfficerecord from '@/composables/composables-record';
import RightNavigation from '@/components/navigation/RightNavigation.vue';
import { onMounted, ref, inject, onUpdated, reactive} from 'vue';
import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'

export default{
    components: {
        RightNavigation
    },
    setup (){
        useHead({
            title: 'PDS Voluntary Work | BFAR - CAR HRMIS'
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsVoluntaryWork, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]); //vocational
        const divsC = reactive([]); //college
        const add = ref(0); //vocational
        const addC = ref(0); //college

        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                for(let x in officerecord.value.pdsvoluntarywork){
   
                    divs.push({
                        id: x,
                    })

                }                

                add.value = divs.length;
            })
        })
        const savepds = async () => {
            await updateMypdsVoluntaryWork(id.value).then(() => {
                if(!errors.value){
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        title: 'Successfully Updated',
                        showConfirmButton: false,            
                        icon: 'success',
                        width: '300',
                        padding: '.5em 1em',
                        timerProgressBar: true,
                        timer:1500,
                        customClass: {
                            container: 'swaltopright'
                        }
                    })
                }

            })
            await getPersonalRecord(id.value)
        }

        const addeligibility =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;
            officerecord.value.pdsvoluntarywork.push({
                'id': '',
                'employee_id' : '',
                'voluntary_organizationname' : '',
                'voluntary_from' : '',
                'voluntary_to' : '',
                'voluntary_numberofhours' : '',
                'voluntary_position' : ''
            });

        }
        
        const removerow = async(index) =>{
            officerecord.value.pdsvoluntarywork.splice(index,1);
            divs.splice(index,1);
        }

        const hfrom = (key) => {
            officerecord.value.pdsvoluntarywork[key].voluntary_from = moment(officerecord.value.pdsvoluntarywork[key].voluntary_from).format('MM/DD/YYYY');

        }
        const hto = (key) => {
            officerecord.value.pdsvoluntarywork[key].voluntary_to = moment(officerecord.value.pdsvoluntarywork[key].voluntary_to).format('MM/DD/YYYY');
        }


        return{
            errors,
            savepds,
            officerecord,
            moment,
            addeligibility,
            removerow,
            divs,
            hfrom,
            hto,
            id
        
        }
    }
}


</script>