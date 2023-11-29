<template> 
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Employee Position</h2>
        </div>
    </div>
    <form @submit.prevent="saveEmployeePosition">
            <div class="form-group">                          
                <div class="form-floating">
                    <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="employeeposition.name">    
                    <label for="name" class="form-label">Position Name</label>

                    <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>
                </div>
            </div>
            <div class="form-row">
                <div class="col mt-3 text-end">
                    <router-link :to="{name: 'employeeposition.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                    <button type="submit" class="btn btn-save">Update</button>
                </div>
            </div>
    </form>
</template>

<script>
	import { reactive, onMounted, ref, inject} from "vue";
	import useEmployeePosition from "@/composables/composables-position";
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
                title: 'Settings - Edit Employee Positions | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const swal = inject('$swal')

			const { errors, updateEmployeePosition, employeeposition, getEmployeePosition} = useEmployeePosition()

            const pageLoader = ref(true);

			onMounted(() => {
                getEmployeePosition(props.id).then(() =>{
                    pageLoader.value = false;
                })
            })



			const saveEmployeePosition = async (id) => {
			    await updateEmployeePosition(props.id).then(() => {
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
				employeeposition,
				saveEmployeePosition,
                pageLoader
			}
		}
	}
</script>