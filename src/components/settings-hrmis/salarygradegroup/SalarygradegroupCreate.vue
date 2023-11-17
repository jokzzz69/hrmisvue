<template> 
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>New Salary Grade Group</h2>
        </div>
    </div>
    <form @submit.prevent="saveSalaryGradeGroup">
            <div class="row">
            	<div class="col">
	            	<div class="form-floating">                              
		                <input type="text" name="name" placeholder="enter name" id="name" class="form-control" :class="errors.name ? 'error-input' : ''" v-model="form.name">
		                <label for="name" class="form-label">Salary Grade Group Name</label>    
		                <span v-if="errors.name" class="text-danger m-error">{{errors.name[0]}}</span>            
		            </div>
	            </div>
	            <div class="col-2">        
	                <div class="date-form-floating"  :class="errors.year ? 'dateerror' : ''">
	                    <Datepicker v-model="form.year"  auto-apply year-picker :enable-time-picker="false" :clearable="false"  name="year" placeholder="Year"></Datepicker>  
	                    <span v-if="errors.year" class="text-danger m-error">{{errors.year[0]}}</span> 	          
	                </div>             
	            </div> 
            </div>
            <hr>

            <template v-for="div in divs" :key="div.id">           	
	            <div class="row mt-2">            	
	        		<div class="col">
	            		<div class="form-floating">                              
			                <input type="text" name="stpname" placeholder="enter name" id="name" class="form-control" :ct="div.id" v-model="form.stepname[div.id]">
			                <label for="stpname" class="form-label">Salary Grade</label>  
			            </div>
	            	</div>
	            	<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control" :ct="div.id"    v-model="form.step1[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 1</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control" :ct="div.id"    v-model="form.step2[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 2</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control" :ct="div.id"   v-model="form.step3[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 3</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control"  :cte="div.id"  v-model="form.step4[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 4</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control"  :cte="div.id"  v-model="form.step5[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 5</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control"  :cte="div.id"  v-model="form.step6[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 6</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control"  :cte="div.id"  v-model="form.step7[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 7</label>              
					    </div>
					</div>
					<div class="col c_p">
						<div class="form-floating">                              
					        <input type="number" name="salarygradesteps" placeholder="enter name" id="name" class="form-control"  :cte="div.id"  v-model="form.step8[div.id]">
					        <label for="salarygradesteps" class="form-label">Step 8</label>              
					    </div>
					</div>
					<!-- <div class="col-auto pt-2">

						<button class="btn btn-danger"  @click.prevent="clickMinus(div.id)"><i class="fa-solid fa-minus"></i></button>
						
					</div> -->
	            </div>
	        </template>
            <div class="form-row mt-2 c_p ">
        		<button class="btn btn-info btnF" @click.prevent="clickAdd"><i class="fa-solid fa-plus"></i> Add Salary Grade Step</button>
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
	import { reactive,inject, ref } from "vue";
	import useSalaryGradeGroup from '@/composables/composables-salarygradegroup';
	import { useHead } from '@unhead/vue'


	export default {
		setup(){
			useHead({
                title: 'Settings - Add Salary Grade | '+import.meta.env.VITE_BFAR_AGENCY
            })
			const form = reactive({
			    'name': '',
			    'year': '',
			    'stepname': [],
			    'step1': [],
			    'step2': [],
			    'step3': [],
			    'step4': [],
			    'step5': [],
			    'step6': [],
			    'step7': [],
			    'step8': [],
			});
			const add = ref(0);
			const divs = reactive([]);

			const clickMinus = (index) => {
				//delete divs[index];

				divs.splice(index,1);
				form.stepname.splice(index,1);
				form.step1.splice(index,1);
				form.step2.splice(index,1);
				form.step3.splice(index,1);
				form.step4.splice(index,1);
				form.step5.splice(index,1);
				form.step6.splice(index,1);
				form.step7.splice(index,1);
				form.step8.splice(index,1);

				// //let x = divs.map(item => item.id).indexOf(index);

				// divs.filter(d => d.id !== index);
				// form.stepname.filter((i,k) => k !== index);
				// form.step1.filter((i,k) => k !== index);
				// form.step2.filter((i,k) => k !== index);
				// form.step3.filter((i,k) => k !== index);
				// form.step4.filter((i,k) => k !== index);
				// form.step5.filter((i,k) => k !== index);
				// form.step6.filter((i,k) => k !== index);
				// form.step7.filter((i,k) => k !== index);
				// form.step8.filter((i,k) => k !== index);
				




			


			}
			const clickAdd = () => {

				divs.push({
					id: add.value,
				});

				form.stepname.push(null);
				form.step1.push(null);
				form.step2.push(null);
				form.step3.push(null);
				form.step4.push(null);
				form.step5.push(null);
				form.step6.push(null);
				form.step7.push(null);
				form.step8.push(null);

				add.value++;
				
			}


			// const clickMinus = (index) => {
			// 	//delete divs[index];

			// 	//divs.splice(index,1);
			// 	let x = divs.map(item => item.id).indexOf(index);
			// 	divs.splice(x,1);


			// }
			// const clickAdd = () => {
			// 	divs.push({
			// 		id: add.value,
			// 	});
			// 	add.value++;

			// }

			const swal = inject('$swal')
			
			const {storeSalaryGradeGroup, errors} = useSalaryGradeGroup()

			const saveSalaryGradeGroup = async () => {
			    await storeSalaryGradeGroup({ ...form }).then(() => {
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
				add,
				clickAdd,
				clickMinus,
				divs,
				saveSalaryGradeGroup
			}
		}
	}
</script>