<template> 
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Employee Status</h2>
        </div>
    </div>
    <form @submit.prevent="saveEmployeeStatus">
            <div class="form-floating">                              
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="employeestatus.name">        
                <label for="name" class="form-label">Employee Status Name</label>        
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>
            </div>
            <div class="form-row">
                <div class="col mt-3 text-end">
                    <router-link :to="{name: 'employeestatus.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </div>
    </form>
</template>

<script>
	import { reactive, onMounted, ref, inject} from "vue";
	import useEmployeeStatus from "@/composables/composables-status";
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';



	export default {
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
                title: 'Settings - Edit Employee Status | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const swal = inject('$swal')
			const { errors, updateEmployeeStatus, employeestatus, getEmployeeStatus} = useEmployeeStatus()
            const pageLoader = ref(true);
			onMounted(() => {
                getEmployeeStatus(props.id).then(() =>{
                    pageLoader.value = false;
                })
            })
            
			const saveEmployeeStatus = async (id) => {
			    await updateEmployeeStatus(props.id).then(() => {
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
				employeestatus,
				getEmployeeStatus,
				saveEmployeeStatus,
                pageLoader
			}
		}
	}
</script>