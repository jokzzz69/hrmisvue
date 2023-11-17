<template>

    <template v-if="pageLoader">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Starting Number</h2>
        </div>
    </div>
    <form @submit.prevent="saveDocumentNumber(startingnumber.id)" class="bg-light tblWrap mb-3 py-3 px-3">
        <div class="row">
        	<div class="col">
        		<div class="form-floating req">                               
		            <input type="number" name="startingnumber" v-on:keypress="numberonly" placeholder="enter startingnumber" id="startingnumber" class="form-control" :class="errors.startingnumber ? 'is-invalid' : ''" v-model="startingnumber.startingnumber">  
		            <label for="startingnumber" class="form-label">Starting Number</label>     
		            <span v-if="errors.startingnumber" class="text-danger m-error">{{errors.startingnumber[0]}}</span>         
		        </div>
		        
        	</div>
        	<div class="col">
                <div class="form-floating fflabel">
                    <span class="form-control">
                    	<template v-if="startingnumber.updated_at">
                    		{{moment(startingnumber.updated_at).format('LLLL')}}
                    	</template>                        	
                    </span>
                    <span class="sp-label">Last Date Updated:</span>
                </div>
            </div>
            <div class="col">
                <div class="form-floating fflabel">
                    <span class="form-control">
                    	<template v-if="startingnumber.creator">
                    		{{startingnumber.creator.cname}}
                    	</template>                        	
                    </span>
                    <span class="sp-label">Last Updated by:</span>
                </div>
            </div>
        	<div class="col-auto col">
        		<div class="col text-end">
		            <button type="submit" class="btn btn-blue form-floatingbutton"> Update</button>
		        </div>
        	</div>
        </div>       
    </form>
</template>
<script>
    import { reactive, onMounted, ref, inject} from "vue";
    import moment from 'moment'
    import useStartingNumber from "@/composables/composables-startingnumber";
    import { useHead } from '@unhead/vue'
    import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';


    export default {
        components: {
            LoadingComponentDiv
        },
        setup(){
            useHead({
                title: 'Settings - Communication Starting Number | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')

            const {  getStartingNumber,startingnumber, updateStartingNumber, errors} = useStartingNumber()
            const pageLoader = ref(true);
            onMounted(() => {
            	getStartingNumber().then(() =>{
                    pageLoader.value = false;
                })
            })

            const saveDocumentNumber = async (id) => {
                await updateStartingNumber(id).then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Starting Number Successfully Updated',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-up'
                            }
                        })
                    }
                    getStartingNumber()
                })
            }
            const numberonly = (evt) =>{
            	evt = (evt) ? evt : window.event;
      			var charCode = (evt.which) ? evt.which : evt.keyCode;
            	if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
					evt.preventDefault();;
				} else {
				return true;
				}
            }
            return{
                errors,
                startingnumber,
                saveDocumentNumber,
                moment,
                numberonly,
                pageLoader
            }
        }
    }
</script>

