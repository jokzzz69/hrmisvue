<template>
	<div class="row">
        <div class="col-md-12 p-title">
            <h2>My Locator Slip</h2>
        </div>

    </div>
    <div class="row">
    	<div class="col-sm-12 mb-2">
    		<div class="row">
    			<div class="col-auto">
    				<div class="col-auto">
                        <div class="dropdown">
                          <button class="btn btn-blue dropdown-toggle" type="button" id="dropdown-ls" data-bs-toggle="dropdown" aria-expanded="false">
                            Add Locator Slip
                          </button>
                          <ul class="dropdown-menu dropdown__ls" aria-labelledby="dropdown-ls">
                            <li><router-link :to="{ name: 'locatorslips.addexisting' }" class="dropdown-item">Approved LS</router-link></li>                        
                            <li>
                                <template v-if="userslug == 'super-admin'">                               
                                    <router-link :to="{ name: 'locatorslips.create' }" class="dropdown-item">Create New (For Approval)</router-link>
                                </template>
                                <template v-else>
                                    <span class="dropdown-item spccc" @click.stop>Create New (For Approval)</span>
                                </template>
                            </li>
                                                        
                          </ul>
                        </div>
			    		
			    	</div>
    			</div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch" placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>
    		</div>
    	</div>
    </div>
    <div class="row">
        <div class="col-sm-12 fs-5">     
            <div class="bg-mid-trans tblWrap f85 mb-3 pb-3" v-sheight>
                <table class="tbl tblEmail--Wrap communications table wp">
                    <thead>
                        <tr>

                            <th><span>Type</span></th>
                            <th><span>Duration</span></th>
                            <th><span>Location</span></th>
                            <th><span>Reason</span></th>                             
                            <th><span>Approved By</span></th>                                                    
                            <th class="text-end">
                             
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    	<template v-if="filteredLocatorSlips.length > 0">
                            <template v-for="locatorslip in filteredLocatorSlips" :key="locatorslip.id">
                                <tr>                             
                                    <td>
                                        {{setLSType(locatorslip.durationtype)}}
                                    </td>
                                    
                                    <td>
                                        {{setLSDuration(locatorslip.durationtype,locatorslip.datestart, locatorslip.dateend)}}
                                    </td>
                                    <td>
                                        {{gettypeOfLS(locatorslip.obtype)}}
                                        <strong>{{locatorslip.lslocation}}</strong>
                                        
                                    </td>
                                    <td>
                                        {{locatorslip.reason}}
                                    </td>
                                    <td>
                                        <template v-if="locatorslip.approvedby">
                                            {{locatorslip.approvedby.formattedName}}
                                        </template>
                                    </td>
                                    <td>
                                        <ul class="ls-frmbutton text-end">
                                            <li class="mb-1">
                                                <router-link title="Edit" :to="{name: 'locatorslips.editexisting', params : {id: locatorslip.id}}" class="btn btn-violet"><i class="sm-icons fa-solid fa-pen-to-square"></i> <span  class="lg-text">Edit</span></router-link>
                                            </li>
                                            <li>
                                                <button title="delete" class="btn btn-outline-danger" @click="deleteLS(locatorslip.id)"><i class="sm-icons fa-solid fa-trash-can"></i> <span class="lg-text">Delete</span></button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                    <td colspan="9">
                                        <template v-if="searchQuery && !filteredLocatorSlips.length">               
                                            No Result Found                     
                                        </template>
                                        <template v-else>                                       
                                            <LoadingComponent/>
                                        </template>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">                                
                            <tr class="nodata pr">
                                <td colspan="9"><span class="nodata">Locator Slip is Empty </span>
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
	import {ref,reactive, onMounted, computed, defineAsyncComponent, inject} from 'vue';

	import useLocatorSlips from '@/composables/forms/composables-locatorslip';
	
    import {useAuthStore} from '@/stores/store.js'
    import moment from 'moment'
    import {formatTime} from '@/helper/formatTime.js'
    import {dualdateformat} from '@/helper/dualdateformat.js'
    const LoadingComponent = defineAsyncComponent(() => 
        import('@/components/loader/LoadingComponent.vue')
    );
	export default{
        components: {
            LoadingComponent
        },
		setup(){
			const {getMyLocatorSlips, locatorslips, destroyLocatorSlip} = useLocatorSlips();
            const store = useAuthStore()
            const userslug = store.getdetails[1];
            const noData = ref(false)
            const swal = inject('$swal')

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredLeaveRecords.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredLeaveRecords.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

			onMounted(() => {
				getMyLocatorSlips().then(() => {
                   if(locatorslips.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
				})
			})
            const filteredLocatorSlips = computed(function(){
                return locatorslips.value.filter(
                    (locatorslip) => locatorslip.lslocation.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
                                     moment(locatorslip.datestart).format('MMMM D, Y hh:mm A').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
                                     moment(locatorslip.dateend).format('MMMM D, Y hh:mm A').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                     (locatorslip.approvedby && locatorslip.approvedby.formattedName && locatorslip.approvedby.formattedName.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) 
                );
            });
            const setLSType = (type) => {
                if(type == 1){
                    return 'Hour(s)'
                }else{
                    return 'Day(s)'
                }
            }

            const setLSDuration = (type, start, end) => {
                if(type == 1){
                    if(moment(new Date(start)).format('Y-m-d') == moment(new Date(end)).format('Y-m-d')){
                        return moment(new Date(start)).format('MMMM D, Y')+' | '+formatTime(start)+' - '+formatTime(end);
                    }
                }else{
                    if(moment(new Date(start)).format('Y-m-d') == moment(new Date(end)).format('Y-m-d')){
                        return moment(new Date(start)).format('MMMM D, Y')
                    }else{
                        return dualdateformat(start,end)
                    }
                }
            }
            const deleteLS = async(id) => {

                let x = 0; //trigger

                await swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {         
                    x = 1;
                  }
                })


                if (x > 0) {
                    await destroyLocatorSlip(id);
                    await getMyLocatorSlips().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Deleted',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-del'
                            }
                        })
                    })
                }
            }
            const gettypeOfLS = (obtype) => {
                if(obtype == 0){
                    return 'Fieldwork / OB at ';
                }else{
                    return 'Personal Matter at ';
                }
            }
			return{
				userslug,
                filteredLocatorSlips,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                noData,
                setLSType,
                setLSDuration,
                deleteLS,
                gettypeOfLS
			}
		}
	}
</script>