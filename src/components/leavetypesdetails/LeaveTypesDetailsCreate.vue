<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>New Leave Type Details</h2>
        </div>
    </div>
    <form @submit.prevent="saveLeaveTypeDetails">
        <div class="mb-3 req">      
            <label for="leavetype_id" class="form-label">Leave Types</label>                 
            <select multiple class="form-select mh-200" :class="errors.leavetype_ids ? 'error-input' : ''" name="leavetype_ids" v-model="form.leavetype_ids">
                <option disabled value="">Please select one</option>
                <option :value="leavetype.id" v-for="leavetype in leavetypes">{{leavetype.name}}</option>
            </select>     
       
            <span v-if="errors.leavetype_ids" class="text-danger m-error">{{errors.leavetype_ids[0]}}</span>         
        </div>   

        <div class="form-floating mb-2 req">                
            <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="form.name">
            <label for="name" class="form-label">Name</label>                
            <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span> 
        </div>

        <div class="form-row">
            <div class="col mt-3 text-end">
            	<router-link :to="{name: 'leavetypesdetails.index'}" class="btn btn-secondary me-1">Cancel</router-link>
            	<button type="submit" class="btn btn-primary"> Save</button>
            </div>
        </div>
        
    </form>
</template>

<script>
	import { reactive,inject,defineAsyncComponent, onMounted} from "vue";
	import useLeaveTypes from "@/composables/composables-leavetypes";
    import useLeaveTypesDetails from "@/composables/composables-leavetypesdetails";
    import { useHead } from '@unhead/vue'


	export default {
		setup(){
            useHead({
                title: 'Create Leave Type Detail | BFAR - CAR HRMIS'
            })
			const form = reactive({
			    'name': '',
                'leavetype_ids': [],
			});
			const swal = inject('$swal')
			
			const { leavetypes, getLeaveTypes } = useLeaveTypes()
            const { errors, storeLeaveTypesDetail } = useLeaveTypesDetails()


			const saveLeaveTypeDetails = async () => {
			    await storeLeaveTypesDetail({ ...form }).then(() => {
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
            onMounted(() =>{
                getLeaveTypes()
            })
			
			return{
				form,
				errors,
				saveLeaveTypeDetails,
                leavetypes
			}
		}
	}
</script>