<template>
	<template v-if="hld">
        <LoadingComponentDiv/>
    </template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Generate Communications</h2>
        </div>
    </div>	
    
	<form @submit.prevent="generateReport" class="row mb-2 pb-2 frmGenCom">
		<div class="row">
			<div class="col col-sm-4 col-lg-4">
    			<div class="form-floating mb-2">
    				<select :class="errors.reportType ? 'error-input' : ''" class="form-select border-blue" @change="checkValue()" name="dtremployeetype" id="reporttype" v-model="form.reportType">
	                    <option disabled value="">Select Type</option>
	                    <option value="1" >Yearly</option>
	                    <option value="2" >Monthly</option>
	                    <option value="3" >Daily</option>
	                    <option value="4" >Custom</option>                            
	                </select>
	                <label class="form-label" for="reporttype">Report Type</label>
	                <span v-if="errors.reportType" class="text-danger m-error">{{errors.reportType[0]}}</span>
    			</div>
    			<div class="mb-2 date-form-floating">		    				
    				<Datepicker :teleport="true" v-model="form.datevalue" class="date-form-floating" id="datecustom" placeholder="Select Date" auto-apply
    				:disabled="form.reportType == ''"
    				:enable-time-picker="false"
    				:year-picker="form.reportType == 1"
    				:month-picker="form.reportType == 2"
	    			:range="form.reportType == 4"
	    			:multi-calendars="form.reportType == 4"
	    			:clearable="false" :max-date="new Date()"
	    			:class="errors.datevalue ? 'error-input' : ''"
	    			 @update:model-value="handleDate()"></Datepicker>
	    			 <span v-if="errors.datevalue" class="text-danger m-error">{{errors.datevalue[0]}}</span>
    			</div>   			

    			<div class="btnWrapGenCom">
    				<button class="btn btn-blue" type="submit" :disabled="disabledbutton"><i class="fa-solid fa-gears"></i> Generate Communications</button>
    				<button class="btn btn-outline-success mt-2" @click.prevent="downloadGenerated" :disabled="disabledDownload"><i class="fa-solid fa-download"></i> Download Generated</button>
    			</div>

		   </div>
		</div>
	</form>
   	<div class="row">
   		<div class="col">
   			<div class="mtmb tblWrap mt-2 mb-2 tblWrapReportTable tblscroll" id="tblscroll">
   				<div class="scrollbuttons" v-if="hasScrollLeft">

                    <template v-if="scrolledtoBottom">
                        <ul class="list-unstyled p-0 list-inline">
                            <li class="list-inline-item"><span @click.prevent="scrollLeft"><i class="fa-regular fa-circle-left"></i></span></li>
                            <li class="list-inline-item"><span @click.prevent="scrollRight"><i class="fa-regular fa-circle-right"></i></span></li>
                        </ul>
                    </template>
                    
                </div>
   				<table class="mtable table tbllink communicationReportTable"> 
   					<thead>
   						<tr>
   							<td rowspan="2">Control Number</td>
	   						<td rowspan="2">Content/Subject/Title</td>
	   						<td rowspan="2">Date/Venue</td>
	   						<td>Sender</td>
	   						<td colspan="2">Action Taken</td>
	   						<td rowspan="2">Received By</td>
	   						<td rowspan="2">Attached Files</td>
   						</tr>
   						<tr>
   							<td>Name/Office</td>
   							<td>Remarks</td>
   							<td>Person Concern</td>
   						</tr>
   					</thead>
   					<tbody>
   						<template v-if="!nodata">
   							<template v-if="generated.length > 0">
	   							<template v-for="report in generated" :key="report.id">
		   							<tr>
		   								<td>{{report.documentnumber}}</td>
		   								<td>
		   									<template v-if="report.subject">
		   										{{report.subject}}
		   									</template>
		   									<template v-else>
		   										-
		   									</template>
		   								</td>
		   								<td>
		   									<template v-if="report.withinclusivedates != 0">

					                            <template v-if="report.inclusivedatestart == report.inclusivedateend">
					                                <strong>{{moment(new Date(report.inclusivedatestart)).format('MMM. D, YYYY')}} </strong>
					                            </template>
					                            <template v-else>
					                            	<template v-if="moment(new Date(report.inclusivedatestart)).format('YYYY') == moment(new Date(report.inclusivedateend)).format('YYYY')">
					                            		{{moment(new Date(report.inclusivedatestart)).format('MMM. D')}} - {{moment(new Date(report.inclusivedateend)).format('MMM D, YYYY')}}
					                            	</template>
					                                <template v-else>
					                                	{{moment(new Date(report.inclusivedatestart)).format('MMM. D, YYYY')}} - {{moment(new Date(report.inclusivedateend)).format('MMM D, YYYY')}}
					                                </template>
					                            </template>              
		  									
		   									</template>
		   									<template v-else>
		   										-
		   									</template>
		   								</td>
		   								<td>
		   									<template v-if="report.sender || report.agency">
		   										{{report.agency}} 
		   										<template v-if="report.sender && report.agency">-</template>
		   										{{report.sender}}
		   									</template>
		   									<template v-else>
		   										-
		   									</template>   									
		   								</td>
		   								<td class="remarksCommunications">
		   									<template v-if="report.notes.length">
		   										<span><strong>Note</strong>: </span>
		   										<template v-for="(v,k) in report.notes" :key="v.id">
		   											<template v-if="v.id == 15 || v.id == 8">
		   												<template v-if="v.id == 15">
		   													{{v.name}} : 
		   													<template v-if="report.returnforward.length">
		   														(
		   														<template v-for="(rfEmp,rfEmpKey) in report.returnforward" :key="rfEmp.id">
		   															{{rfEmp.formattedName}}<template v-if="rfEmpKey+1 != report.returnforward.length">, </template>
		   														</template>
		   														)
		   													</template>
		   												</template>
		   												<template v-else="v.id == 8">
		   													{{v.name}} : ({{report.noteCopies}})
		   												</template>
		   											</template>
		   											<template v-else>
		   												{{v.name}}
		   											</template>   											
		   											<template v-if="k+1 != report.notes.length">, </template>
		   										</template>
		   									</template>
		   									<template v-if="report.actions.length">
		   										<br/>
		   										<span><strong>Action(s)</strong>: </span>
		   										<template v-for="(v,k) in report.actions" :key="v.id">
		   											{{v.name}}<template v-if="k+1 != report.actions.length">, </template>
		   										</template>
		   									</template>
		   									<template v-if="report.remarks">
		   										<br/>
		   										{{report.remarks}}
		   									</template>								
		   								</td>
		   								<td class="receiversCommunication">
		   									<template v-if="report.allunits == true">
		   										All Units
		   									</template>
		   									<template v-else>
		   										<template v-if="report.receiversunitheads.length">
		   											<template v-for="(e,k) in report.receiversunitheads" :key="e.id">
		   												{{e.formattedName}}
		   												<template v-if="k+1 != report.receiversunitheads.length">,</template>
		   											</template>
		   										</template>
		   										<template v-if="report.units.length">
		   											<br/>
		   											<span><strong>Units</strong>: </span>
		   											<template v-for="(u,k) in report.units" :key="u.id">
		   												{{u.name}}
		   												<template v-if="k+1 != report.units.length">,</template>
		   											</template>
		   										</template>
		   									</template>
		   								</td>
		   								<td class="disseminator">
		   									<template v-if="report.disseminator">
		   										{{report.disseminator.formattedName}}
		   									</template>   									
		   								</td>
		   								<td class="attachedFiles">

		   									<template v-if="report.attachments.length">
		   										<template v-for="(a,k) in report.attachments" :key="a.id">
		   											<span>{{a.filename}}<br/>
		   												<template v-if="k+1 != report.attachments.length">, </template>
		   											</span>
		   										</template>
		   									</template>
		   								</td>					
		   							</tr>

		   						</template>
		   				
	   						</template>
	   						<template v-else>
	   							<tr>
	   								<td class="text-center" colspan="8">No Data Generated</td>
	   							</tr>
	   						</template>
   						</template>
   						<template v-else>
   							<tr class="pr nodata">
                            	<td colspan="8">
                            		<LoadingComponent/>
                            	</td>
                            </tr>
   							
   						</template>
   					</tbody>
   				</table>
   			</div>
   		</div>
   	</div>

</template>
<script>
	import {onMounted ,ref, computed, inject, reactive} from 'vue';
	import LoadingComponentDiv from '@/components/loader/LoadingComponentDiv.vue';
    import { useHead } from '@unhead/vue'
    import { useAuthStore } from '@/stores/store.js'
    import useGenerateCommunications from '@/composables/composables-generatecommunications';
    import moment from 'moment';
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
	export default{
		components: {
            LoadingComponentDiv,
            LoadingComponent
        },
		setup(){
			useHead({
                title: 'Communications Report | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const {generated,generateCommunication,errors, downloadExcel } = useGenerateCommunications();

            const form = reactive({
            	'reportType': '',
            	'datevalue': '',
            });
            const store = useAuthStore();
            const authslug = store.getdetails[1];
			const hld = ref(true);
			const swal = inject('$swal') 
			const disabledbutton = ref(true);
			const disabledDownload = ref(true);
			const dateplaceholder = ref('');
			const nodata = ref(true);
			const scrolledtoBottom = ref(false);
            const hasScrollLeft = ref(false);

			const checkValue = () => {			
				disabledbutton.value = false;
				form.datevalue = '';

				if(form.reportType == 1){
					form.datevalue = new Date().getFullYear();
					
				}else if (form.reportType == 2) {
					const month = ref({
					  month: new Date().getMonth(),
					  year: new Date().getFullYear()
					});
					form.datevalue = month;					
				}else if (form.reportType == 3){
					form.datevalue = moment(new Date()).format('Y-MM-DD');						
				}else if (form.reportType == 4){					
					disabledbutton.value = true;
				}
				
			}
			const handleDate = () => {

				if(form.datevalue == ''){
					disabledbutton.value = true;
				}else{
					disabledbutton.value = false;
				}
				if(form.reportType == 3){
					form.datevalue = moment(new Date(form.datevalue)).format('Y-MM-DD');					
				}
				if(form.reportType == 4){
					form.datevalue[0] = moment(new Date(form.datevalue[0])).format('Y-MM-DD');
					form.datevalue[1] = moment(new Date(form.datevalue[1])).format('Y-MM-DD');
				}
			}
			
			const checkIfhasScroll = () =>{
                var bodyVal = document.getElementsByTagName("BODY")[0];
                var div = document.getElementById('tblscroll');
                var cwrap = document.getElementsByClassName('content-wrap')[0];

                var hasHorizontalScrollbar = div.scrollWidth > cwrap.scrollWidth;
                var hasVerticalScrollbar = bodyVal.scrollHeight > window.innerHeight;
                
                hasScrollLeft.value = hasHorizontalScrollbar;
                scrolledtoBottom.value = hasVerticalScrollbar;
            }
            const handlescroll = () =>{               
                
                window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

                    if (bottomOfWindow) {
                        scrolledtoBottom.value = false // replace it with your code
                    }else{
                        scrolledtoBottom.value = true;
                    }
                }
            }
            const generateReport = async () => {
            	nodata.value = true;
				await generateCommunication({...form}).then(() => {
					checkIfhasScroll();
					nodata.value = false;
					disabledDownload.value = false;
				});
			}
            onMounted(() => {
            	hld.value = false;
            	nodata.value = false;
            });
            const scrollLeft = () =>{
 
                var div = document.getElementById('tblscroll');
                div.scrollLeft -= 300;
            }
            const scrollRight = () =>{

                var div = document.getElementById('tblscroll');
                div.scrollLeft += 300;
            }
            const downloadGenerated = async() => {
            	await downloadExcel({...form}).then(() => {
            		
            	})
            }
			return {
				hld,
				generateReport,
				form,
				checkValue,
				disabledbutton,
				disabledDownload,
				handleDate,
				dateplaceholder,
				errors,
				generated,
				moment,
				scrollLeft,
				scrollRight,
				scrolledtoBottom,
                hasScrollLeft,
                downloadGenerated,
                nodata
			}
		}
	}


</script>