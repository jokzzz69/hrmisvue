<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>New Employee Status</h2>
        </div>
    </div>
    <form @submit.prevent="saveEmployeeStatus">
            <div class="form-floating">                              
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="form.name">
                <label for="name" class="form-label">Employee Status Name</label>  
                 <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>            
            </div>
            <div class="form-row">
	            <div class="col mt-3 text-end">
	                <router-link :to="{name: 'employeestatus.index'}" class="btn btn-secondary me-1">Cancel</router-link>
	                <button type="submit" class="btn btn-primary"> Save</button>
	            </div>
	        </div>
    </form>
</template>

<script>
	import { reactive,inject} from "vue";
	import useEmployeeStatus from "@/composables/composables-status";

	import { useHead } from '@unhead/vue'

	export default {
		setup(){
			useHead({
                title: 'Create Employee Status | BFAR - CAR HRMIS'
            })
			const form = reactive({
			    'name': '',
			});
			const swal = inject('$swal')
			
			const { errors, storeEmployeeStatus } = useEmployeeStatus()

			const saveEmployeeStatus = async () => {
			    await storeEmployeeStatus({ ...form }).then(() => {
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
				saveEmployeeStatus
			}
		}
	}
</script>