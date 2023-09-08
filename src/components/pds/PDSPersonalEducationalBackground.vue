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
                    <span class="rff fs-5">Educational Background</span>
                </div>
            </div>
            <form v-on:submit.prevent="savepds">              
                <template v-if="officerecord.pdseducationalbackground">
                    <div class="pPDSwrap container-fluid pb-4">
                        <div class="row mt-3 headingtitle">
                            <div class="c_p col-3 pPDSwrap-title text-center d-flex align-items-center">
                                <h2>Name of School <span>Write in full</span></h2>
                                
                            </div>
                            <div class="c_p col-3 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Basic Education / Degree / Course <span>Write in full</span></h2>                                
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Period of Attendance</h2>
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Highest Level / Units Earned</h2>
                            </div>
                            <div class="c_p col-1 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Year Graduated</h2>
                            </div>
                            <div class="c_p col-2 pPDSwrap-title text-center  d-flex align-items-center">
                                <h2>Scholarship / Academic Honors Received</h2>
                            </div>
                        </div>  
                        <div class="row mt-2">
                            <div class="col pPDSwrap-title">
                                <h2>Elementary</h2>
                            </div>
                        </div>
                        <div class="row mb-3 cmpads">
                            <div class="col-3 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="elementary_school" class="form-control" placeholder="enter name of school"  v-model="officerecord.pdseducationalbackground.elementary_school">   
                                    <label class="form-label">Name of School</label>
                         
                                </div>
                            </div>
                           <div class="col-3 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="elementary_course" class="form-control" placeholder="enter basic education" v-model="officerecord.pdseducationalbackground.elementary_course">   
                                    <label class="form-label">Basic Education / Degree / Course</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="number" name="elementary_from" class="form-control" placeholder="enter from" v-model="officerecord.pdseducationalbackground.elementary_from">   
                                    <label class="form-label">From</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="number" name="elementary_to" class="form-control" placeholder="enter to" v-model="officerecord.pdseducationalbackground.elementary_to">   
                                    <label class="form-label">To</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="elementary_unitsearned" class="form-control" placeholder="enter units earned" v-model="officerecord.pdseducationalbackground.elementary_unitsearned">   
                                    <label class="form-label">Units</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="elementary_yeargraduated" class="form-control" placeholder="enter year graduated" v-model="officerecord.pdseducationalbackground.elementary_yeargraduated">   
                                    <label class="form-label">Year</label>
                                </div>
                            </div>
                            <div class="col-2 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="elementary_awards" class="form-control" placeholder="enter elementary awards" v-model="officerecord.pdseducationalbackground.elementary_awards">   
                                    <label class="form-label">Awards Received</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col pPDSwrap-title">
                                <h2>Secondary</h2>
                            </div>
                        </div>
                        <div class="row mb-3 cmpads">
                            <div class="col-3 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="secondary_school" class="form-control" placeholder="enter name of school" v-model="officerecord.pdseducationalbackground.secondary_school">   
                                    <label class="form-label">Name of School</label>
                                    <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                </div>
                            </div>
                           <div class="col-3 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="secondary_course" class="form-control" placeholder="enter secondary" v-model="officerecord.pdseducationalbackground.secondary_course">   
                                    <label class="form-label">Basic Education / Degree / Course</label>
                                    <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="number" name="secondary_from" class="form-control" placeholder="enter from" v-model="officerecord.pdseducationalbackground.secondary_from">   
                                    <label class="form-label">From</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="number" name="secondary_to" class="form-control" placeholder="enter to" v-model="officerecord.pdseducationalbackground.secondary_to">   
                                    <label class="form-label">To</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="secondary_unitsearned" class="form-control" placeholder="enter units earned" v-model="officerecord.pdseducationalbackground.secondary_unitsearned">   
                                    <label class="form-label">Units</label>
                                </div>
                            </div>
                            <div class="col-1 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="secondary_yeargraduated" class="form-control" placeholder="enter year graduated" v-model="officerecord.pdseducationalbackground.secondary_yeargraduated">   
                                    <label class="form-label">Year</label>
                                </div>
                            </div>
                            <div class="col-2 c_p">
                                <div class="form-floating">                                    
                                    <input type="text" name="secondary_awards" class="form-control" placeholder="enter awards" v-model="officerecord.pdseducationalbackground.secondary_awards">   
                                    <label class="form-label">Awards Received</label>
                                </div>
                            </div>
                        </div>      


                        
                        <template v-if="officerecord.pdseducationalbackgroundtertiary">
                            <div class="row mt-3">
                                <div class="col pPDSwrap-title">
                                    <h2>Vocational</h2>
                                </div>
                            </div>
                            <template v-for="(div, key) in divs">  
                                <div v-if="officerecord.pdseducationalbackgroundtertiary[key].tertiary_type == 1" class="row mb-1 cmpads">
                                    <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_school" class="form-control" placeholder="enter name of school" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_school">   
                                            <label class="form-label">Name of School</label>
                                            <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                        </div>
                                    </div>
                                   <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_course" class="form-control" placeholder="enter vocational" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_course">   
                                            <label class="form-label">Basic Education / Degree / Course</label>
                                            <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="number" name="secondary_from" class="form-control" placeholder="enter from" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_from">   
                                            <label class="form-label">From</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_to" class="form-control" placeholder="enter to" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_to">   
                                            <label class="form-label">To</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_unitsearned" class="form-control" placeholder="enter units earned" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_unitsearned">   
                                            <label class="form-label">Units</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_yeargraduated" class="form-control" placeholder="enter year" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_yeargraduated">   
                                            <label class="form-label">Year</label>
                                        </div>
                                    </div>
                                    <div class="col c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_awards" class="form-control" placeholder="enter awards received" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_awards">   
                                            <label class="form-label">Awards Received</label>
                                        </div>
                                    </div>
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div> 
                            </template>  
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addvocational">+ Add Vocational</button>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col pPDSwrap-title">
                                    <h2>College</h2>
                                </div>
                            </div>
                            <template v-for="(div, key) in divs">  
                                <div v-if="officerecord.pdseducationalbackgroundtertiary[key].tertiary_type == 2" class="row mb-1 cmpads">
                                    <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_school" class="form-control" placeholder="enter name of school" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_school">   
                                            <label class="form-label">Name of School</label>
                                            <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                        </div>
                                    </div>
                                   <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_course" class="form-control" placeholder="enter college" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_course">   
                                            <label class="form-label">Basic Education / Degree / Course</label>
                                            <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="number" name="secondary_from" class="form-control" placeholder="enter from" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_from">   
                                            <label class="form-label">From</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_to" class="form-control" placeholder="enter to" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_to">   
                                            <label class="form-label">To</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_unitsearned" class="form-control" placeholder="enter units earned" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_unitsearned">   
                                            <label class="form-label">Units</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_yeargraduated" class="form-control" placeholder="enter year" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_yeargraduated">   
                                            <label class="form-label">Year</label>
                                        </div>
                                    </div>
                                    <div class="col c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_awards" class="form-control" placeholder="enter awards received" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_awards">   
                                            <label class="form-label">Awards Received</label>
                                        </div>
                                    </div>
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div> 
                            </template>
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addcollege">+ Add College</button>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col pPDSwrap-title">
                                    <h2>Graduate Studies</h2>
                                </div>
                            </div>
                            <template v-for="(div, key) in divs">  
                                <div v-if="officerecord.pdseducationalbackgroundtertiary[key].tertiary_type == 3" class="row mb-1 cmpads">
                                    <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_school" class="form-control" placeholder="enter name of school" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_school">   
                                            <label class="form-label">Name of School</label>
                                            <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                        </div>
                                    </div>
                                   <div class="col-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_course" class="form-control" placeholder="enter vocational" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_course">   
                                            <label class="form-label">Basic Education / Degree / Course</label>
                                            <small id="emailHelp" class="form-text text-muted">Write in full</small>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="number" name="secondary_from" class="form-control" placeholder="enter from" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_from">   
                                            <label class="form-label">From</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_to" class="form-control" placeholder="enter to" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_to">   
                                            <label class="form-label">To</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_unitsearned" class="form-control" placeholder="enter units earned" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_unitsearned">   
                                            <label class="form-label">Units</label>
                                        </div>
                                    </div>
                                    <div class="col-1 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_yeargraduated" class="form-control" placeholder="enter year" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_yeargraduated">   
                                            <label class="form-label">Year</label>
                                        </div>
                                    </div>
                                    <div class="col c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="secondary_awards" class="form-control" placeholder="enter awards received" v-model="officerecord.pdseducationalbackgroundtertiary[key].tertiary_awards">   
                                            <label class="form-label">Awards Received</label>
                                        </div>
                                    </div>
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>
                                </div> 
                            </template>
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addgraduate">+ Add Graduate Studies</button>
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

export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },
    components: {
        RightNavigation
    },
    setup (props){
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsEducationalBackground, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]); //vocational
        const divsC = reactive([]); //college
        const add = ref(0); //vocational
        const addC = ref(0); //college

        onMounted(() => {   
            getPersonalRecord(props.id).then(() => {
                for(let x in officerecord.value.pdseducationalbackgroundtertiary){
   
                    divs.push({
                        id: x,
                    })

                }                

                add.value = divs.length;
            })
        })

        const savepds = async () => {
            await updateMypdsEducationalBackground(props.id).then(() => {
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
            await getPersonalRecord(props.id)
        }
        
        const addvocational =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;

            officerecord.value.pdseducationalbackgroundtertiary.push({
                'id': '',
                'employee_id': '',
                'tertiary_type': 1,
                'tertiary_school' : '',
                'tertiary_course' : '',
                'tertiary_from' : '',
                'tertiary_to' : '',
                'tertiary_unitsearned' : '',
                'tertiary_yeargraduated' : '',
                'tertiary_awards' : '',
            });
        }
        const addcollege =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;

            officerecord.value.pdseducationalbackgroundtertiary.push({
                'id': '',
                'employee_id': '',
                'tertiary_type': 2,
                'tertiary_school' : '',
                'tertiary_course' : '',
                'tertiary_from' : '',
                'tertiary_to' : '',
                'tertiary_unitsearned' : '',
                'tertiary_yeargraduated' : '',
                'tertiary_awards' : '',
            });
   
        }
        const addgraduate =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;

            officerecord.value.pdseducationalbackgroundtertiary.push({
                'id': '',
                'employee_id': '',
                'tertiary_type': 3,
                'tertiary_school' : '',
                'tertiary_course' : '',
                'tertiary_from' : '',
                'tertiary_to' : '',
                'tertiary_unitsearned' : '',
                'tertiary_yeargraduated' : '',
                'tertiary_awards' : '',
            });
   
        }
        const removerow = async(index) =>{
            officerecord.value.pdseducationalbackgroundtertiary.splice(index,1);
            divs.splice(index,1);
        }

        


        return{
            errors,
            savepds,
            officerecord,
            moment,
            addvocational,
            removerow,
            addcollege,
            addgraduate,
            divs
            
        
        }
    }
}


</script>