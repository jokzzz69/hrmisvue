<template>
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Location</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saveLocation">
        <div class="space-y-4 rounded-md shadow-sm">                
            
            <div class="form-floating mb-2 req">                
                <input type="text" placeholder="enter location name" name="location_name" :class="errors.location_name ? 'error-input' : ''" id="location_name" class="form-control" v-model="location.location_name">
                <label for="location_name">Location Name</label>
            </div>   
            <span v-if="errors.location_name" class="text-danger m-error">{{errors.location_name[0]}}</span> 
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'locations.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-save">Save</button>
            </div>
        </div>
  
    </form>
</template>

<script setup>
import useLocations from '@/composables/composables-location';
import { onMounted, inject, ref } from 'vue';
import { useHead } from '@unhead/vue'
import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';


const pageLoader = ref(true);

useHead({
    title: 'Settings - Edit Office Location | '+import.meta.env.VITE_BFAR_AGENCY
})
const swal = inject('$swal')
const { errors, location, updateLocation, getLocation } = useLocations()

const props = defineProps({
    id: {
        required: true,
        type: String
    }
})

onMounted(() => getLocation(props.id).then(
        () => {pageLoader.value =false}))

const saveLocation = async () => {    
    await updateLocation(props.id).then(() => {
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
</script>