<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Office</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveOffice">
        <div class="space-y-4 rounded-md shadow-sm">                
            
            <div class="form-floating mb-2 req">                
                <input  placeholder="enter office name" type="text" :class="errors.offices_name ? 'error-input' : ''" name="offices_name"  id="offices_name" class="form-control" v-model="form.offices_name">
                <label for="offices_name" class="form-label">Office Name</label>
                <span v-if="errors.offices_name" class="text-danger m-error">{{errors.offices_name[0]}}</span> 
            </div>   

            <div class="form-floating mb-2 req">                     
                <select class="form-select" :class="errors.offices_locationid ? 'error-input' : ''" name="offices_locationid" v-model="form.offices_locationid">
                    <option disabled value="">Please select one</option>
                    <option :value="location.location_id" v-for="location in locations">{{location.location_name}}</option>
                </select>     
                <label for="offices_locationid" class="form-label">Location</label>  
                <span v-if="errors.offices_locationid" class="text-danger m-error">{{errors.offices_locationid[0]}}</span>         
            </div>   

        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'offices.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script>
    import { reactive, onMounted, inject} from "vue";
    import useOffices from "@/composables/composables-office";
    import useLocations from "@/composables/composables-location";
    import { useHead } from '@unhead/vue'

    export default {
        setup(){
            useHead({
                title: 'Settings - Add Office | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')

            const form = reactive({
                'offices_name': '',
                'offices_locationid': '',
            })

            const { errors, storeOffice } = useOffices()
            const { locations, getLocations} = useLocations()

            onMounted(getLocations)

            const saveOffice = async () => {
                await storeOffice({ ...form }).then(() => {
                    if (!errors.value) {
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
                form,
                errors,
                saveOffice,
                locations,
                getLocations
            }
        }
    }
</script>