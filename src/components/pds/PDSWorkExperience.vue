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
                    <span class="rff fs-5">Work Experience</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">               

                <template v-if="officerecord.pdsworkexperience">
                    <div class="pPDSwrap container-fluid pb-4 pdsWork">
                        <div class="row mt-3 mb-2 headingtitle">
                            <div class="c_p col-3 pPDSwrap-title text-center  align-items-center">
                                <h2>Inclusive Dates <span>(mm/dd/yyyy)</span></h2>                                
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  align-items-center">
                                <h2>Position Title<span>(Write in full/Do not abbreviate)</span></h2>                                
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  align-items-center">
                                <h2>Department / Agency / Office /Company</h2>
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  align-items-center">
                                <h2>Monthly Salary</h2>
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  align-items-center">
                                <h2>Salary / Job / Pay Grade <span>(if applicable)& STEP (Format "00-0")/ From INCREMENT</span></h2>
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  align-items-center">
                                <h2>Status of Appointment</h2>
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  align-items-center">
                                <h2>Gov't Service (Yes / No)</h2>
                            </div>
                            <div class="col-auto "><span class="noContent"></span></div>
                        </div>                    
                        <template v-if="officerecord.pdsworkexperience">
                            <template v-for="(div, key) in divs">  
                                <div class="row mb-2 mt-2 cmpads" >
                                    <div class="col c_p">
                                        <template v-if="key < 1">
                                            <div  class="form-text floatinghelp">FROM</div>  
                                        </template>
                                        <div class="input-group cicH">
                                            <span class="input-group-text p-0" title="Select Date">                                            
                                                <Datepicker :teleport="true" auto-apply :enable-time-picker="false" v-model="officerecord.pdsworkexperience[key].workexp_from" @update:model-value="hfrom(key)" class="date-form-floating">
                                                    <template #trigger>
                                                        <p class="cic m-0 p-15"><i class="fa-solid fa-calendar-days"></i></p>
                                                    </template>
                                                </Datepicker>                                          
                                            </span>
                                            <input type="text" class="form-control" :id="`expfrom-${key}`"  v-model="officerecord.pdsworkexperience[key].workexp_from">
                                        </div>

                               
                                    </div>
                                    <div class="col c_p">                                         
                                        <template v-if="key < 1">
                                            <div  class="form-text floatinghelp">TO</div>   
                                        </template>
                                        <div class="input-group cicH">
                                            <span class="input-group-text p-0" title="Select Date">                                            
                                                <Datepicker :teleport="true" auto-apply :enable-time-picker="false" v-model="officerecord.pdsworkexperience[key].workexp_to" @update:model-value="hto(key)" class="date-form-floating">
                                                    <template #trigger>
                                                        <p class="cic m-0 p-15"><i class="fa-solid fa-calendar-days"></i></p>
                                                    </template>
                                                </Datepicker>                                          
                                            </span>
                                            <input type="text" class="form-control" :id="`expto-${key}`" v-model="officerecord.pdsworkexperience[key].workexp_to">
                                        </div>                                    
                                            
                                    </div>                    
                                    <div class="col-2 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" :id="`exppostitle-${key}`" name="workexp_positiontitle" class="form-control" placeholder="enter title" v-model="officerecord.pdsworkexperience[key].workexp_positiontitle">   
                                            <label :for="`exppostitle-${key}`" class="form-label">Title</label>
                                        </div>
                                    </div>
                                    <div class="col-2 c_p">
                                        <div class="form-floating">                                    
                                            <input :id="`expagency-${key}`" type="text" name="workexp_agency" class="form-control" placeholder="enter agency" v-model="officerecord.pdsworkexperience[key].workexp_agency">   
                                            <label :for="`expagency-${key}`" class="form-label">Agency</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input :id="`expsalary-${key}`" type="number" name="workexp_monthlysalary" step="0.01" class="form-control" placeholder="enter monthly salary"  v-model="officerecord.pdsworkexperience[key].workexp_monthlysalary">   
                                            <label :for="`expsalary-${key}`" class="form-label">Salary</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" :id="`expsgrade-${key}`" name="workexp_salarygrade" class="form-control" placeholder="enter salary grade"  v-model="officerecord.pdsworkexperience[key].workexp_salarygrade">   
                                            <label :for="`expsgrade-${key}`" class="form-label">Grade</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input :id="`expstatusofappoinment-${key}`" type="text" name="workexp_statusofappointment" class="form-control" placeholder="enter salary grade"  v-model="officerecord.pdsworkexperience[key].workexp_statusofappointment">   
                                            <label :for="`expstatusofappoinment-${key}`" class="form-label">Status</label>
                                        </div>
                                    </div>
                                    <div class="col c_p mb-2">
                                        <div class="form-floating">
                                            <select class="form-select" :id="`expsv-${key}`" placeholder="select Option" v-model="officerecord.pdsworkexperience[key].workexp_governmentservice">
                                                <option value="" disabled>Options</option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </select>
                                            <label :for="`expsv-${key}`">Gov't Service</label>
                                        </div>
                                    </div>
 
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div>
                            </template>  
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addeligibility">+ Add Work Experience</button>
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
            title: 'PDS Work Experience | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsWorkExperience, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]); //vocational
        const divsC = reactive([]); //college
        const add = ref(0); //vocational
        const addC = ref(0); //college

        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                for(let x in officerecord.value.pdsworkexperience){
   
                    divs.push({
                        id: x,
                    })

                }                

                add.value = divs.length;
            })
        })
        const savepds = async () => {
            await updateMypdsWorkExperience(id.value).then(() => {
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
            officerecord.value.pdsworkexperience.push({
                'id': '',
                'employee_id': '',
                'workexp_from' : '',
                'workexp_to' : '',
                'workexp_fromtemp' : '',
                'workexp_positiontitle' : '',
                'workexp_agency' : '',
                'workexp_monthlysalary' : '',
                'workexp_salarygrade' : '',
                'workexp_statusofappointment' : '',
                'workexp_governmentservice' : ''
            });

        }
        
        const removerow = async(index) =>{
            officerecord.value.pdsworkexperience.splice(index,1);
            divs.splice(index,1);
        }


        const hfrom = (key) => {
            officerecord.value.pdsworkexperience[key].workexp_from = moment(officerecord.value.pdsworkexperience[key].workexp_from).format('MM/DD/YYYY');

        }
        const hto = (key) => {
            officerecord.value.pdsworkexperience[key].workexp_to  = moment(officerecord.value.pdsworkexperience[key].workexp_to).format('MM/DD/YYYY');
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