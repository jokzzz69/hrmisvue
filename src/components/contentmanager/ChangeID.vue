<template>
	<div class="col-12">
		<h4 class="mt-2 mb-2">Change ID Number</h4>


		<form @submit.prevent="changeID">
			<div class="row">
				<div class="col">
					<div class="form-floating">
			    		<select class="form-select" v-model="formChangeID.oldid">
			        		<option value="" disabled>Select</option>
			        		<option v-for="biouser in biousers" :value="biouser.employee_id">{{biouser.employee_id}}</option>
			        	</select>
		    			<label class="form-label">ID</label>
		
		    		</div>
				</div>
				<div class="col">
					<div class="form-floating">
						<input type="number" name="newid" id="newid" v-model="formChangeID.newid" class="form-control">
						<label class="form-label">New ID</label>
					</div>
				</div>
				<div class="col">
					<button class="btn btn-submit btn-primary alw-100 mhlabel text-light">Submit</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	import {onMounted ,ref, computed, inject, reactive} from 'vue';

	export default{

		setup(){
			const formChangeID = reactive({
				'oldid': '',
				'newid': ''
			});
			const changeID = async() =>{
				await updateID({...formChangeID});
			}

			return{
				changeID,
				formChangeID
			}
		}
	}
</script>