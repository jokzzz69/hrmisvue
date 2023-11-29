<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>New Leave Type</h2>
        </div>
    </div>
    <form @submit.prevent="saveLeaveType">
            <div class="form-floating mb-2 req">                
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="form.name">
                <label for="name" class="form-label">Leave Type Name</label>                
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
            </div>
            <div class="form-floating">                
                <input type="text" name="description" placeholder="enter description" id="description" class="form-control" v-model="form.description">
                <label for="description" class="form-label">Leave Type Description</label>    
            </div>

        <div class="form-row">
            <div class="col mt-3 text-end">
            	<router-link :to="{name: 'leavetypes.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-save"> Save</button>
            </div>
        </div>
        
    </form>
</template>

<script>
	import { reactive,inject,defineAsyncComponent} from "vue";
	import useLeaveTypes from "@/composables/composables-leavetypes";
    import { useHead } from '@unhead/vue'


	export default {
		setup(){
            useHead({
                title: 'Settings - Create Leave Type | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const form = reactive({
			    'name': '',
                'description': '',
			});
			const swal = inject('$swal')
			
			const { errors, storeLeaveType } = useLeaveTypes()

			const saveLeaveType = async () => {
			    await storeLeaveType({ ...form }).then(() => {
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
                });
			}
			
			return{
				form,
				errors,
				saveLeaveType
			}
		}
	}
</script>