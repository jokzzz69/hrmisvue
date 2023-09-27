<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>Edit Salary Grade Group</h2>
        </div>
    </div>
    <form @submit.prevent="saveSalaryGradeGroup">
           <div class="row">
                <div class="col">
                    <div class="form-floating req">                              
                        <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="salarygradegroup.name">        
                        <label for="name" class="form-label">Salary Grade Group Name</label>        
                        <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>
                    </div>
                </div>
                <div class="col-2">        
                    <div class="date-form-floating">
                        <Datepicker v-model="salarygradegroup.year" auto-apply year-picker :enable-time-picker="false" :clearable="false"  name="year" placeholder="Year"></Datepicker>  
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Year
                        </small>
                    </div>             
                </div> 
           </div>
            <div class="form-row">
                <div class="col mt-3 text-end">
                    <router-link :to="{name: 'salarygradegroup.index'}" class="btn btn-secondary me-1">Cancel</router-link>
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </div>
    </form>
</template>

<script>
	import { reactive, onMounted, ref, inject} from "vue";
	import useSalaryGradeGroup from '@/composables/composables-salarygradegroup';
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
                title: 'Edit Salary Grade | BFAR - CAR HRMIS'
            })
			const swal = inject('$swal')
			const {errors, salarygradegroup, getSalaryGradeGroup, updateSalaryGradeGroup} = useSalaryGradeGroup()

			onMounted(() => {getSalaryGradeGroup(props.id)})
            
			const saveSalaryGradeGroup = async (id) => {
			    await updateSalaryGradeGroup(props.id).then(() => {
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
				salarygradegroup,
				saveSalaryGradeGroup
			}
		}
	}
</script>