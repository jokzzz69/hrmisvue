<template> 

    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>

    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Unit Employees</h2>
        </div>
    </div>
    <form @submit.prevent="saveUnitEmployees" class="bg-light tblWrap mb-3 py-3 px-3">
            <div class="row">
                <div class="col">
                    <div class="form-floating  mb-2 lblformcontrol">
                        <span class="form-control border-bottom no-border-radius">{{form.name}}</span>
                        <span class="sp-label">Name</span> 
                    </div>
                </div>
                <div class="col-1">
                    <div class="form-floating  mb-2 lblformcontrol">                             
                        <span class="form-control border-bottom no-border-radius">{{form.slug}}</span>
                        <span class="sp-label">Slug</span> 
                    </div>
                </div>
            </div>
            
            <span for="mu" class="mb-2 f-left w-100 mt-2">Employees</span>
            <v-select class="sp2wrap sl2-floating" name="mu" multiple placeholder="Select Employees" 
                v-model="form.employees" 
                :reduce="employees => employees.id" 
                :options="employees" 
                :class="errors.employees ? 'error-inputsl' : ''"/>




        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'units.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-save"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
    import { reactive, onMounted, ref, inject} from "vue";
    import 'vue-select/dist/vue-select.css';
    import useUnits from "@/composables/hrmis/composables-settingsunits";

    import useEmployees from '@/composables/composables-employees';
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';


    export default {
        components: {
            LoadingComponentDiv
        },
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            useHead({
                title: 'Settings - Update Communication Group Employees | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')

            const { errors, getUnit, unit, updateUnitEmployees} = useUnits()
            const { employees, getEmployeeOptions} = useEmployees()

            const form = reactive({
                'name':'',
                'slug':'',
                'employees': []
            });


            const pageLoader = ref(true);

            onMounted(() => {
                
                getUnit(props.id).then(res =>{
                    form.name = unit.value.name;
                    form.slug = unit.value.slug;

                    if(unit.value.employees){
                        for (var i = 0; i < unit.value.employees.length; i++) {
                           form.employees.push(parseInt(unit.value.employees[i].id));
                        }
                    }

                    if(form.employees){
                        getEmployeeOptions().then(() => {
                            pageLoader.value = false;
                        })
                    }else{
                        pageLoader.value = false;
                    }
                    

                })
                
                
            })
            const saveUnitEmployees = async (id) => {

                await updateUnitEmployees(props.id, form).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Communication Group Successfully Updated',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-up'
                            }
                        })
                    }
                })
            }
            
            return{
                errors,
                form,
                saveUnitEmployees,
                employees,
                pageLoader
                
            }
        }
    }
</script>