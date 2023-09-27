<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Travel</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveTravel">
        <div class="row">
            <div class="col">
                <div class="req">
                    <span class="form-label mb-1">Employees <i class="text-danger">*</i></span>
                       <v-select class="sp2wrap  sl2-floating" multiple placeholder="Select Employees" v-model="form.employees" :reduce="employees => employees.id" :options="employees" :class="errors.employees ? 'error-inputsl' : ''"/>
                </div>
                <span v-if="errors.employees" class="text-danger m-error">{{errors.employees[0]}}</span> 
            </div>
        </div>
        <div class="row mt-3"> 
            <div class="col">
                <div class="form-floating mb-2 req">                
                    <input  placeholder="enter  travel order number" @keydown.space.prevent type="text" name="travelordernumber"  id="travelordernumber" :class="errors.travelordernumber ? 'error-input' : ''" class="form-control" v-model="form.travelordernumber">
                    <label for="travelordernumber" class="form-label">Travel Order #</label>
                </div>
                <span v-if="errors.travelordernumber" class="text-danger m-error">{{errors.travelordernumber[0]}}</span> 
            </div>
            <div class="col">
                <div class="form-floating mb-2 req">                
                    <input  placeholder="enter travel location"  type="text" name="location"  id="location" :class="errors.location ? 'error-input' : ''" class="form-control" v-model="form.location">
                    <label for="location" class="form-label">Location</label>
                </div>
                <span v-if="errors.location" class="text-danger m-error">{{errors.location[0]}}</span> 
            </div>
            <div class="col">
                <div class="form-floating mb-2 req">                
                    <input  placeholder="enter travel purpose"  type="text" name="purpose"  id="purpose" :class="errors.purpose ? 'error-input' : ''" class="form-control" v-model="form.purpose">
                    <label for="purpose" class="form-label">Purpose</label>
                </div>
                <span v-if="errors.purpose" class="text-danger m-error">{{errors.purpose[0]}}</span> 
            </div>           
        </div>
        <div class="row">
            <div class="col mt-2 mb-3 req">
                <span class="d-block">Date of Travel <i class="text-danger">*</i></span>
                <Datepicker class="date-form-floating highlights-weekend" id="dts" week-start="0" range v-model="form.travelrange" placeholder="Date Range" :enable-time-picker="false"  :clearable="false"  :class="errors.travelrange ? 'error-input' : ''" :highlight-week-days="[0, 6]"></Datepicker>
                <span v-if="errors.travelrange" class="text-danger m-error">{{errors.travelrange[0]}}</span>  
                <small>(mm/dd/yy - mm/dd/yy)</small>
                
            </div>
        </div>

        <div class="form-row">
            <div class="col text-end">             

                <router-link :to="{name: 'travels.index'}" class="btn btn-secondary me-1">Cancel</router-link>     
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>

    import { reactive ,inject, onMounted,ref} from "vue";
    import useRoles from '../../composables/composables-role';
    import useEmployees from '@/composables/composables-employees';
    import {useRouter} from 'vue-router'
   

    import useTravels from '@/composables/composables-travel';
    import 'vue-select/dist/vue-select.css';
    import { useHead } from '@unhead/vue'

    export default {

        setup(){  
            useHead({
                title: 'Create Travel | BFAR - CAR HRMIS'
            })
            const form = reactive({
                'location': '',
                'purpose': '',
                'travelrange': '',
                'travelordernumber': '',
                'employees': [],
            })

            const swal = inject('$swal')

            const {errors, storeTravel} = useTravels()

            const {employees, getEmployeeOptions} = useEmployees()

            onMounted(() => {
                getEmployeeOptions()
            })

        

            const saveTravel = async () => {               
     
                await storeTravel({ ...form }).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Created',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-success'
                            }
                        })
                    }
                })
            }

            return{
                form,
                errors,
                saveTravel,
                employees,
                
            }
        }
    }
</script>