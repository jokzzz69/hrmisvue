<template>
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Office</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveOffice">
        <div class="space-y-4 rounded-md shadow-sm">               
            
            <div class="form-floating req mb-2">                
                <input type="text" placeholder="enter office name" :class="errors.offices_name ? 'error-input' : ''" name="offices_name"  id="offices_name" class="form-control" v-model="office.offices_name">
                <label for="offices_name">Office Name</label>
                <span v-if="errors.offices_name" class="text-danger m-error">{{errors.offices_name[0]}}</span> 
            </div>   
            <div class="form-floating mb-2 req">                
                <select class="form-select" name="offices_locationid" :class="errors.offices_locationid ? 'error-input' : ''" v-model="office.offices_locationid">
                    <option disabled value="">Please select one</option>
                    <option :value="location.location_id"  v-for="location in locations">{{location.location_name}}</option>
                </select>      
                <label for="offices_locationid">Location</label>
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
    

    import useOffices from '@/composables/composables-office';
    import { onMounted , inject, ref} from 'vue';
    import useLocations from "@/composables/composables-location";
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
    export default{
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
                title: 'Settings - Edit Office | BFAR - CAR HRMIS'
            })           
            const swal = inject('$swal')
            const { errors, office, updateOffice, getOffice } = useOffices()
            const { locations, getLocations} = useLocations()
            const pageLoader = ref(true);

            onMounted(() => {getOffice(props.id),getLocations().then(() => {
                pageLoader.value = false;
            })})

            const saveOffice = async () => {

                await updateOffice(props.id).then(() => {
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
            }

            return{
                errors,
                office,
                locations,
                getLocations,
                saveOffice,
                pageLoader
            }
        }    
    }



</script>