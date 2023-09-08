<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Role</h2>
        </div>
    </div>
    <form v-on:submit.prevent="saverole">
        <div class="space-y-4 rounded-md shadow-sm"> 
            <div class="form-floating mb-2 req">                
                <input type="text" placeholder="enter location name" name="name" :class="errors.name ? 'error-input' : ''" id="name" class="form-control" v-model="role.name">
                <label for="name">Role Name</label>
            </div>   
            <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
        </div>
        <div class="space-y-4 rounded-md shadow-sm"> 
            <div class="form-floating mb-2">                
                <input type="text" disabled placeholder="role-slug"  name="slug" id="slug" class="form-control border border-danger" v-model="role.slug">
                <label for="slug">Role Slug</label>
                <small class="text-danger">* Slug is not editable / Ask developer</small>
            </div>   
        </div>
        <div class="form-row">
            <div class="col text-end">
                <router-link :to="{name: 'roles.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </div>  
    </form>
</template>

<script setup>

import useRoles from '../../composables/composables-role';

import { onMounted, inject } from 'vue';

const swal = inject('$swal')

const {errors, role, getRole, updateRole} = useRoles()

const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
onMounted(() => getRole(props.id))
const saverole = async () => {    
    await updateRole(props.id).then(() => {
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