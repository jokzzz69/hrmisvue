<template>
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Holiday</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveHoliday">
        <div class="form-row">
            <div class="space-y-4 rounded-md shadow-sm">               
                <div class="form-floating mb-2 req">                
                    <input  placeholder="enter name" type="text" name="name"  id="name" :class="errors.name ? 'error-input' : ''" class="form-control" v-model="holiday.name">
                    <label for="name" class="form-label">Holiday Name</label>
                </div>   
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
            </div>
        </div>

        <div class="form-row">
            <div class="col mb-2 date-form-floating">
                <Datepicker v-model="holiday.eventdate" auto-apply :format="format" :clearable="false" :enable-time-picker="false" name="startdate" placeholder="Holiday Date (mm/dd/yyyy)"></Datepicker> 
            </div>
            <span v-if="errors.date" class="text-danger m-error">{{errors.date[0]}}</span> 
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'holidays.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>  
    </form>
</template>
<script>
    import { reactive ,inject, onMounted,ref} from "vue";
    import useHolidays from '@/composables/composables-holidays';
    import moment from 'moment'
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';




    export default {
        components: {
            LoadingComponentDiv
        },
        props : {
            id: {
                required: true,
                type : String
            }
        },
        setup(props){
            useHead({
                title: 'Settings - Edit Holiday | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'name': '',
                'date': new Date()
            })

            const swal = inject('$swal')

            const { errors, getHoliday, holiday, updateHoliday} = useHolidays()

            const pageLoader = ref(true);
            onMounted(() => {
                getHoliday(props.id).then(() => {
                    pageLoader.value = false;
                })

            })


            const format = (date) => {
                return moment(date).format('MMMM DD, Y');
            }


            const saveHoliday = async () => {                
                await updateHoliday(props.id).then(() => {
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
                                container: 'swaltopright'
                            }
                        })
                    }
                })
            }
            
            return{
                holiday,
                errors,
                saveHoliday,
                format,
                pageLoader
            }
        }
    }
</script>


