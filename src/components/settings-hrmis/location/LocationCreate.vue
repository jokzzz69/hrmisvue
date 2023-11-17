<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New Location</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveLocation">
        <div class="space-y-4 rounded-md shadow-sm">               
            <div class="form-floating mb-2 req">                
                <input  placeholder="enter location name" type="text" name="location_name"  id="location_name" :class="errors.location_name ? 'error-input' : ''" class="form-control" v-model="form.location_name">
                <label for="location_name" class="form-label">Location Name</label>
            </div>   
            <span v-if="errors.location_name" class="text-danger m-error">{{errors.location_name[0]}}</span> 
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'locations.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>  
    </form>
</template>
<script>
    import { reactive ,inject} from "vue";
    import useLocations from "@/composables/composables-location";
    import { useHead } from '@unhead/vue'

    export default {
        setup(){
            useHead({
                title: 'Settings - Create Office Location | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const form = reactive({
                'location_name': '',
            })

            const swal = inject('$swal')
            const { errors, storeLocation } = useLocations()
            const saveLocation = async () => {                
                await storeLocation({ ...form }).then(() => {
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
                form,
                errors,
                saveLocation
            }
        }
    }
</script>