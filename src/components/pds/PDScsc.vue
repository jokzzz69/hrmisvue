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
                    <span class="rff fs-5">Civil Service Eligibility</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">               

                <template v-if="officerecord.pdseducationalbackground">
                    <div class="pPDSwrap container-fluid pb-4 pdsCSCWRAP">
                        <div class="row mt-3 mb-2 headingtitle">
                            <div class="c_p col-2 pPDSwrap-title text-center d-flex align-items-center">
                                <h2>Career Service/ Ra 1080 (Board/ Bar) Under Special Laws/ Ces/ Csee Barangay Eligibility / Driver's License</h2>                                
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Rating<span>(If Applicable)</span></h2>                                
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Date Of Examination / Conferment</h2>
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Place Of Examination / Conferment</h2>
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>License Number</h2>
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Date of Validity</h2>
                            </div>
                          </div>                    
                
                        <template v-if="officerecord.pdscsc">
                            <template v-for="(div, key) in divs">  
                                <div class="row mb-2 mt-2 cmpads" >
                                    <div class="col-2 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="csc_licensename" :id="`csc_licensename-`+key" class="form-control" placeholder="enter license name" v-model="officerecord.pdscsc[key].csc_licensename">   
                                            <label :for="`csc_licensename-`+key" class="form-label">License Name</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="csc_rating" :id="`csc_rating-`+key" class="form-control" placeholder="enter rating" v-model="officerecord.pdscsc[key].csc_rating">   
                                            <label :for="`csc_rating-`+key" class="form-label">Rating</label>
                                        </div>
                                    </div>
                                    <div class="col-2 c_p">
                                        <Datepicker :teleport="true" week-start="0" auto-apply :enable-time-picker="false" v-model="officerecord.pdscsc[key].csc_dateofexamination" @update:model-value="dateexam(key)" name="csc_dateofexamination" class="date-form-floating" placeholder="Date of Examination"></Datepicker>  
                                    </div>
                                    <div class="col-2 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="csc_placeofexamination" :id="`csc_placeofexamination-`+key" class="form-control" placeholder="enter place of examination" v-model="officerecord.pdscsc[key].csc_placeofexamination">   
                                            <label :for="`csc_placeofexamination-`+key" class="form-label">Place of Examination</label>
                                        </div>
                                    </div>
                                    <div class="col-2 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="csc_licensenumber" :id="`csc_licensenumber-`+key" class="form-control" placeholder="enter license number"  v-model="officerecord.pdscsc[key].csc_licensenumber">   
                                            <label :for="`csc_licensenumber-`+key" class="form-label">License Number</label>
                                        </div>
                                    </div>
                                    <div class="col-2 c_p">
                                        <Datepicker :teleport="true" week-start="0" auto-apply :enable-time-picker="false" v-model="officerecord.pdscsc[key].csc_dateofvalidity" @update:model-value="datevalidity(key)" name="csc_dateofvalidity" class="date-form-floating" placeholder="Validity"></Datepicker>  
                                    </div>
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div>
                            </template>  
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addeligibility">+ Add Eligibility</button>
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
            title: 'PDS CSC | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsEligibility, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]); //vocational
        const divsC = reactive([]); //college
        const add = ref(0); //vocational
        const addC = ref(0); //college

        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                for(let x in officerecord.value.pdscsc){
   
                    divs.push({
                        id: x,
                    })

                }                

                add.value = divs.length;
            })
        })

        const savepds = async () => {
            await updateMypdsEligibility(id.value).then(() => {
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

            officerecord.value.pdscsc.push({
                'id': '',
                'employee_id': '',
                'csc_licensename': '',
                'csc_rating': '',
                'csc_dateofexamination': '',
                'csc_placeofexamination': '',
                'csc_licensenumber': '',
                'csc_dateofvalidity': ''
            });

        }
        
        const removerow = async(index) =>{
            officerecord.value.pdscsc.splice(index,1);
            divs.splice(index,1);
        }
        const dateexam = (key) => {
            officerecord.value.pdscsc[key].csc_dateofexamination = moment(officerecord.value.pdscsc[key].csc_dateofexamination).format('MM/DD/YYYY');

        }
        const datevalidity = (key) => {
            officerecord.value.pdscsc[key].csc_dateofvalidity = moment(officerecord.value.pdscsc[key].csc_dateofvalidity).format('MM/DD/YYYY');
        }
        return{
            errors,
            savepds,
            officerecord,
            moment,
            addeligibility,
            removerow,
            divs,
            id,
            dateexam,
            datevalidity
        
        }
    }
}


</script>