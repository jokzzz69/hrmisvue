<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Leave Type</h2>
        </div>
    </div>
    <form @submit.prevent="saveLeaveType">
            <div class="form-floating req mb-2">                               
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="leavetype.name">  
                <label for="name" class="form-label">Leave Type Name</label>     
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>         
            </div>
            <div class="form-floating">                               
                <input type="text" name="description" placeholder="enter description" id="description" class="form-control" v-model="leavetype.description">  
                <label for="description" class="form-label">Leave Type Description</label>     
    
            </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'leavetypes.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-primary"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
	import { reactive, onMounted, ref, inject} from "vue";
	import useLeaveTypes from "@/composables/composables-leavetypes";
    import { useHead } from '@unhead/vue'

	export default {
		props: {
            id: {
                required: true,
                type: String
            }
        },
		setup(props){
            useHead({
                title: 'Settings - Edit Employee Leave Type | BFAR - CAR HRMIS'
            })
			const swal = inject('$swal')

			const { errors, updateLeaveType, leavetype, getLeaveType} = useLeaveTypes()



			onMounted(() => {getLeaveType(props.id)})


		



			const saveLeaveType = async (id) => {
			    await updateLeaveType(props.id).then(() => {
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
				leavetype,
				saveLeaveType
			}
		}
	}
</script>