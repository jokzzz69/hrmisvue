<template>
    <div class="row">
        <div class="col-md-12 p-title">           
            <h2>Edit</h2>                
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
                            <template v-if="dtr.dtr_date == moment(currentDate).format('Y-MM-DD').toString()">
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
                                    <input class="form-control" @keypress="isnumber($event)" :class="errors ? gk(errors,k,'dtr_timeinam') : ''" type="text" v-model="dtr.dtr_timeinam">
                            </td>
                            <td>
                                	<input class="form-control" :class="errors ? gk(errors,k,'dtr_timeoutam') : ''" type="text"  v-model="dtr.dtr_timeoutam">
          
                            </td>
                            <td>
                   
                                	<input class="form-control" :class="errors ? gk(errors,k,'dtr_timeinpm') : ''" type="text"  v-model="dtr.dtr_timeinpm">
        
                            </td>
                            <td>
             
                                	<input class="form-control" :class="errors ? gk(errors,k,'dtr_timeoutpm') : ''"  type="text"  v-model="dtr.dtr_timeoutpm">
 
                            </td>

                  
                            
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="row">
        	<div class="col-md-12 mb-5">
        		<button class="btn btn-primary btn-save px-5 py-2" @click="saveData">Update</button>
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


            onMounted(() => {
                getBiolog(id.value,monthpicked.value.month+'-'+monthpicked.value.year).then( () =>{
                	formContent.value = biolog.value;
                })

            })


            const getEmployeeBio = async (monthpicked) =>{
                await getEmployeemonthBio(id.value,monthpicked.month+'-'+monthpicked.year)
            }


            const format = (date) => {
              return moment(date).format('MMMM Y');
            }

            const currentDate = new Date();     

            const gotoEditDTR = () => {
               const sm = monthpicked.value.month+'-'+monthpicked.value.year;
               router.push({ name: 'dtrupdating.edit', params: { id: id.value, mf: sm} });
            }

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
            	if(!/^[0-9]+$/.test(event.key) || event.key === ':'){
            		return event.preventDefault();
            	}
            }
            return{
                moment,
                biometricsData,
                formatTime,
                getEmployeeBio,
                monthpicked,
                format,
                currentDate,
                gotoEditDTR,
                formContent,
                saveData,
                errors,
                gk,
                isnumber
                
            }
        }
    }
</script>