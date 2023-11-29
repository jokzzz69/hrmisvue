<template> 
    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Employee Type</h2>
        </div>
    </div>
    <form @submit.prevent="saveEmployeeType">
            <div class="form-floating">                               
                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="employeetype.name">  
                <label for="name" class="form-label">Employee Type Name</label>     
                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>         
            </div>
        <div class="form-row">
            <div class="col mt-3 text-end">
                <router-link :to="{name: 'employeetype.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                <button type="submit" class="btn btn-save"> Update</button>
            </div>
        </div>
        
    </form>
</template>

<script>
	import { reactive, onMounted, ref, inject} from "vue";
	import useEmployeeTypes from "@/composables/composables-type";
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
                title: 'Settings - Edit Employee Type | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const swal = inject('$swal')

			const { errors, updateEmployeeType, employeetype, getEmployeeType} = useEmployeeTypes()


            const pageLoader = ref(true);
			onMounted(() => {
                getEmployeeType(props.id).then(() => {
                    pageLoader.value = false;
                })
            })


		



			const saveEmployeeType = async (id) => {
			    await updateEmployeeType(props.id).then(() => {
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
				employeetype,
				getEmployeeType,
				saveEmployeeType,
                pageLoader
			}
		}
	}
</script>