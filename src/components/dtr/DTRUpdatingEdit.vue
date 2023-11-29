<template>
    <div class="row">
        <div class="col-md-12 p-title">           
            <h2>Edit
                <template v-if="formContent">
                    {{datetoEdit}}
                </template>
            </h2>                
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">    
            <template v-if="errors">
            	<div class="alert alert-danger" role="alert">
					Invalid Date format
				</div>
            </template>
            <table :class="errors ? 'haserror' : ''" class="table border tblborderedgray table-bordered text-center mt-3 tbl-mydtr tbldtredit" v-if="formContent.biometricsData">
                <thead>
                    <tr>
                        <th rowspan="2" class="text-center w-5">Day</th>
                        <th colspan="2" class="text-center">AM</th>
                        <th colspan="2" class="text-center">PM</th>
                    </tr>
                    <tr>                       
                        <th class="w-p6">Arrival</th>
                        <th class="w-p6">Departure</th>
                        <th class="w-p6">Arrival</th>
                        <th class="w-p6">Departure</th>
                    </tr>
                </thead>
                <tbody>       
                    <template v-for="(dtr, k) in formContent.biometricsData" :key="dtr.dtr_empid">
                        <tr :class="dtr.status">
                            <template v-if="dtr.dtr_date == moment(new Date(currentDate)).format('Y-MM-DD').toString()">
                                <td :class="dtr.status" class="bg-currentDate"  title="Current Date">  
                                  {{dtr.d}}
                                </td>
                            </template>
                            <template v-else>
                                <td :class="dtr.status">  
                                    {{dtr.d}}
                                </td>
                            </template> 
                            <td>
                                    <input class="form-control" :id="'dtr_timeinam-'+k" @keypress="isnumber($event)" :class="errors ? gk(errors,k,'dtr_timeinam') : ''" type="text" v-model="dtr.dtr_timeinam">
                            </td>
                            <td>
                                	<input class="form-control" :id="'dtr_timeoutam-'+k" @keypress="isnumber($event)" :class="errors ? gk(errors,k,'dtr_timeoutam') : ''" type="text"  v-model="dtr.dtr_timeoutam">
          
                            </td>
                            <td>
                   
                                	<input class="form-control" :id="'dtr_timeinpm-'+k" @keypress="isnumber($event)" :class="errors ? gk(errors,k,'dtr_timeinpm') : ''" type="text"  v-model="dtr.dtr_timeinpm">
        
                            </td>
                            <td>
             
                                	<input class="form-control" :id="'dtr_timeoutpm-'+k" @keypress="isnumber($event)" :class="errors ? gk(errors,k,'dtr_timeoutpm') : ''"  type="text"  v-model="dtr.dtr_timeoutpm">
 
                            </td>

                  
                            
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="row">
        	<div class="col-md-12 mb-5">
        		<button class="btn btn-save px-5 py-2" @click="saveData">Update</button>
        	</div>
        </div>
    </div>
</template>

<script>

    import useMonitoring from '@/composables/composables-monitoring';
    import {onMounted ,ref, computed, reactive, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import {formatTime} from '@/helper/formattime'
    import moment from 'moment';
    import { useAuthStore } from '@/stores/store.js'
    import useBiolog from '@/composables/composables-dtrupdating';
    import { useHead } from '@unhead/vue'
    
    export default{
    	props: {
    		id: {
    			required: true,
    			type: String
    		},
    		mf: {
    			required: true,
    			type: String
    		}
    	},
        setup(props){
            useHead({
                title: 'Edit DTR | '+import.meta.env.VITE_BFAR_AGENCY
            })
        	const swal = inject('$swal')
        	const formContent = ref([]);

            const store = useAuthStore();
            const id = ref(store.details[0]);


            const {biometricsData, getEmployeemonthBio} = useMonitoring()
            const {saveEdited, getBiolog, biolog, errors} = useBiolog();

            let sort = ref(false);
            let updatedList = ref([])
            const router = useRouter()

            
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up");         
            
      
            
            const monthpicked = ref({ 
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            });
            const datetoEdit = ref();

            onMounted(() => {

                getBiolog(props.id,props.mf).then( () =>{
                	formContent.value = biolog.value;
                    datetoEdit.value = biolog.value.month[0]+' '+biolog.value.year[0];
                })

            })


            const format = (date) => {
              return moment(date).format('MMMM Y');
            }

            const currentDate = new Date();     



            const saveData = async () =>{
            	errors.value = null;
            	await saveEdited(props.id,formContent.value).then(() =>{
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
            		
            	});
            }
            const gk = (e,k,n) =>{

            	let nkey = 'biometricsData.'+k+'.'+n;
            	if(e.hasOwnProperty(nkey)){
            		return 'is-invalid';
            	}
            }
            const isnumber = (event) => {
     
            	if(!/^[0-9:]+$/.test(event.key)){

            		return event.preventDefault();
            	}
            }
            return{
                moment,
                biometricsData,
                formatTime,
                monthpicked,
                format,
                currentDate,
                formContent,
                saveData,
                errors,
                gk,
                isnumber,
                datetoEdit
                
            }
        }
    }
</script>