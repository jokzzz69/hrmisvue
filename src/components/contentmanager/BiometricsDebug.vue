<template>
    <div class="row">
    	<div class="col">
    		<div class="formWraps tblWrap bg-light p-4">
    			<div class="row">
    				<div class="col-12">
			    		<span class="fs-5 d-block mb-2"><strong>Biometrics</strong></span>
			    	</div>
			    	<div class="col-12 col-sm-6">
			    		<div class="CMFormWrap ps-2 pt-2 pe-2 pb-2 border-blue">
			    			<form class="mt-2 mb-2" v-on:submit.prevent="getBio">
								<div class="row">
									<div class="col-auto req">
							    		<div class="form-floating">
								    		<select id="bioid" class="form-select" v-model="form.id" :class="errors.id ? 'error-input' : ''">
								        		<option value="" disabled>Select</option>
								        		<option v-for="biouser in biousers" :value="biouser.employee_id">{{biouser.employee_id}}</option>
								        	</select>
							    			<label class="form-label" for="bioid">ID</label>
							    			<span v-if="errors.id" class="text-danger m-error">{{errors.id[0]}}</span> 
							    		</div>
							    	</div>
							        <div class="col-auto req">
							            <Datepicker :teleport="true" class="date-form-floating" id="dts" v-model="form.datetoset" week-start="0"  placeholder="Date" auto-apply :enable-time-picker="false"  :clearable="false"  :class="errors.datetoset ? 'error-input' : ''"></Datepicker>
							            <span v-if="errors.datetoset" class="text-danger m-error">{{errors.datetoset[0]}}</span>  
							        </div>        
							        <div class="col">
							        	<button type="submit" class="btn btn-outline-primary alw-100 mhlabel">Get</button>
							        </div>
								</div>
							</form>
			    		</div>
			    	</div>
			    	<div class="col-12 col-sm-6">
			    		<div class="CMFormWrap ps-2 pt-2 pe-2 pb-2 border-blue">
			    			<form v-on:submit.prevent="setBio">
								<div class="row">
							    	<div class="col req">
							        	<div class="form-floating">
							        		<select class="form-select" v-model="form.scheduletoupdate" :class="errors.scheduletoupdate ? 'error-input' : ''">
								        		<option value="" disabled>Select</option>
								        		<option value="1">Time in AM</option>
								        		<option value="2">Time out AM</option>
								        		<option value="3">Time in PM</option>
								        		<option value="4">Time out PM</option>
								        	</select>
								        	<label>Schedule</label>
								        	<span v-if="errors.scheduletoupdate" class="text-danger m-error">{{errors.scheduletoupdate[0]}}</span> 
							        	</div>
							        </div>
			   
							        <div class="col req">
							            <Datepicker :teleport="true" class="date-form-floating" id="tts" v-model="form.timeset" placeholder="Time" time-picker :clearable="false" :class="errors.timeset ? 'error-input' : ''"></Datepicker> 
							            <span v-if="errors.timeset" class="text-danger m-error">{{errors.timeset[0]}}</span>  
							        </div>				        
								</div>
								<div class="row">
									<div class="col mt-2">
							        	<button type="submit" class="btn btn-outline-danger alw-100 mhlabel">SET</button>
							        </div>
								</div>
							</form>
			    		</div>
			    	</div>
			    	<div class="col-md-12">
			    		<p>{{info.title}}</p>
			    		<p>{{info.agency}}</p>
			    		<p>{{info.date}}</p>
			    	</div>
    			</div>
    		</div>
    	</div>
    </div>	
	<hr/>
	<template v-if="selectedBio">

		<div class="row">
			<div class="col">		
				
				<table class="table tbl-cm">
					<thead>
						<th>Date</th>
						<th>Time In</th>
						<th>Break Out</th>
						<th>Break In</th>
						<th>Time out PM</th>
					</thead>	

					<tbody>
						<tr v-if="selectedBio.dtr_empid">
							<td>{{moment(selectedBio.dtr_date).format('MMMM D, Y')}}</td>
							<td>{{formatTime(selectedBio.dtr_timeinam, "HH:mm")}}</td>
							<td>{{formatTime(selectedBio.dtr_timeoutam, "HH:mm")}}</td>
							<td>{{formatTime(selectedBio.dtr_timeinpm, "HH:mm")}}</td>
							<td>{{formatTime(selectedBio.dtr_timeoutpm, "HH:mm")}}</td>
						</tr>
						<tr v-else>
							<td colspan="5" class="text-center">No Entry</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</template>
	<div class="row" v-if="userrole ==='super-admin'">		

		<div class="col">
			<h4>Clean archived ID</h4>
			<form v-on:submit.prevent="cleanDB">
				<div class="row">
			    	<div class="col-auto">
			        	<div class="form-floating">
			        		<input type="text" class="form-control" name="archiveid" v-model="formArchive.id" placeholder="enter ID to Search">
				        	<label>ID</label>
			        	</div>
			        	<button type="submit" class="mt-2 btn btn-outline-danger alw-100 mhlabel text-danger">Remove all data</button>
			        </div>

				</div>
			</form>
		</div>

		<div class="col">
    		<div class="CMFormWrap ps-2 pt-2 pe-2 pb-2 border-blue">
    			<form class="mt-2 mb-2" v-on:submit.prevent="setID">
					<div class="row">
						<div class="col-auto req">
				    		<div class="form-floating">
					    		<select class="form-select" v-model="form.id" :class="errors.id ? 'error-input' : ''">
					        		<option value="" disabled>Select</option>
					        		<option v-for="biouser in biousers" :value="biouser.employee_id">{{biouser.employee_id}}</option>
					        	</select>
				    			<label class="form-label">ID</label>
				    			<span v-if="errors.id" class="text-danger m-error">{{errors.id[0]}}</span> 
				    		</div>
				    	</div>
				        <div class="col">
				        	<button type="submit" class="btn btn-outline-primary alw-100 mhlabel">SET</button>
				        </div>
					</div>
				</form>
    		</div>
    	</div>


    	<div class="col">
    		<button @click.prevent="generatenewID" class="btn btn-danger mt-2 mb-2">Generate ID New ID Number</button>
    	</div>



	</div>

</template>

<script>

	import {onMounted ,ref, computed, inject, reactive} from 'vue';
	import useEmployees from '@/composables/composables-employees';
	import useCM from '@/composables/composables-contentmanager';
	import moment from 'moment';
	import {formatTime} from '@/helper/formattime'
	import { useAuthStore } from '@/stores/store.js'

	import useAuthenticate from '@/composables/composables-authenticate';

	export default{

		setup(){

			const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);
			const {biousers, getBioIDS }= useEmployees();
			const {getinfo,info} = useAuthenticate();

			const {storeBio,errors,getthisBio,selectedBio,setArchivedID, setEmployeeID,updateID,newResponse} = useCM();

			const swal = inject('$swal')
			const form = reactive({
				'id': '',
				'datetoset' : '',
				'scheduletoupdate': '',
				'timeset': ''
			});
			const formArchive = reactive({
				'id': '',
			});
			
			onMounted(() => {
				getBioIDS(),
				getinfo()
			})

		
			const setBio = async() => {
				await storeBio({...form}).then(() => {
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
                                container: 'swaltopright-success'
                            }
                        })
                    }
                })
                getthisBio({...form})
			}
			const getBio = async() => {				
				await getthisBio({...form});
			}
			const cleanDB = async () =>{
				await setArchivedID({...formArchive});
			}
			const setID = async() =>{
				await setEmployeeID({...form});
			}
			
			const generatenewID = async() =>{

			}
			return {
				form,
				setBio,
				errors,
				getBio,
				selectedBio,
				moment,
				formatTime,
				biousers,
				cleanDB,
				formArchive,
				setID,
				generatenewID,
				newResponse,
				userrole,
				authid,
				info
			}
		}
	}
</script>