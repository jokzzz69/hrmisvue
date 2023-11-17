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
                    <span class="rff fs-5">Other Information</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">               
                <template v-if="officerecord.pdsotherinformation">
                    <div class="pPDSwrap container-fluid pb-4">
                        <div class="row mt-3 mb-3 headingtitle">
                            <div class="c_p col pPDSwrap-title text-left">
                                <h2>Special Skills and Hobbies</h2>                                
                            </div>
                        </div>                   
                        <template v-if="officerecord.pdsotherinformation">
                            <template v-for="(div, key) in divs">      
                                <template v-if="officerecord.pdsotherinformation[key].oi_type == 1">                           
                                    <div class="row mb-2 mt-2 cmpads sss" >                                        
                                        <div class="col c_p">
                                            <div class="form-floating">                                    
                                                <input type="text" :id="`o-hob-${key}`" name="oi_description" class="form-control" placeholder="enter organization" v-model="officerecord.pdsotherinformation[key].oi_description">   
                                                <label :for="`o-hob-${key}`" class="form-label">Skills & Hobbies</label>
                                            </div>
                                        </div>                                        
                                        
                                        <div class="col-auto pt-2">
                                            <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                        </div>                                    
                                    </div>       
                                </template>  
                            </template>   
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addhobbies">+ Add Skill / Hobby</button>
                                </div>
                            </div>             
                        </template>  
               
                        <div class="row mt-3 mb-3 headingtitle">
                            <div class="c_p col pPDSwrap-title text-left">
                                <h2>Non-academic Distinctions / Recognition</h2>                                
                            </div>
                        </div>                   
                        <template v-if="officerecord.pdsotherinformation">
                            <template v-for="(div, key) in divs">       
                                <template v-if="officerecord.pdsotherinformation[key].oi_type == 2">                          
                                    <div class="row mb-2 mt-2 cmpads" >                                
                                        <div class="col c_p">
                                            <div class="form-floating">                                    
                                                <input :id="`o-rec-${key}`" type="text" name="oi_description" class="form-control" placeholder="enter organization" v-model="officerecord.pdsotherinformation[key].oi_description">   
                                                <label :for="`o-rec-${key}`" class="form-label">Distinction / Recognition</label>
                                            </div>
                                        </div>
                                        <div class="col-auto pt-2">
                                            <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                        </div>                                                                       
                                     </div> 
                                </template>  
                            </template>   
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addrecognition">+ Add Distinction / Recognition</button>
                                </div>
                            </div>             
                        </template>  
                        <div class="row mt-3 mb-3 headingtitle">
                            <div class="c_p col pPDSwrap-title text-left">
                                <h2>Membership In Association/organization</h2>                                
                            </div>
                        </div>                   
                        <template v-if="officerecord.pdsotherinformation">
                            <template v-for="(div, key) in divs">     
                                <template v-if="officerecord.pdsotherinformation[key].oi_type == 3">
                                <div class="row mb-2 mt-2 cmpads" >                                    
                                    <div class="col c_p">
                                        <div class="form-floating">                                    
                                            <input :id="`o-mem-${key}`" type="text" name="oi_description" class="form-control" placeholder="enter organization" v-model="officerecord.pdsotherinformation[key].oi_description">   
                                            <label :for="`o-mem-${key}`" class="form-label">Membership</label>
                                        </div>
                                    </div>
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>                                  
                                </div>
                                </template>   
                            </template>   
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addmembership">+ Add Membership</button>
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
            title: 'PDS Other Information | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsOtherInformation, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]); //vocational

        const add = ref(0); //vocational


        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                for(let x in officerecord.value.pdsotherinformation){
   
                    divs.push({
                        id: x,
                    })

                }                

                add.value = divs.length;
            })
        })
        const savepds = async () => {
            await updateMypdsOtherInformation(id.value).then(() => {
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

        const addhobbies =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;
            officerecord.value.pdsotherinformation.push({
                'id': '',
                'employee_id' : '',
                'oi_type' : '1',
                'oi_description' : '',
            });

        }
        const addrecognition =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;
            officerecord.value.pdsotherinformation.push({
                'id': '',
                'employee_id' : '',
                'oi_type' : '2',
                'oi_description' : '',
            });

        }
        const addmembership =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;
            officerecord.value.pdsotherinformation.push({
                'id': '',
                'employee_id' : '',
                'oi_type' : '3',
                'oi_description' : '',
            });

        }
        
        const removerow = async(index) =>{
            officerecord.value.pdsotherinformation.splice(index,1);
            divs.splice(index,1);
        }

        


        return{
            errors,
            savepds,
            officerecord,
            moment,
            addhobbies,
            removerow,
            divs,
            addrecognition,
            addmembership,
            id
        
        }
    }
}


</script>