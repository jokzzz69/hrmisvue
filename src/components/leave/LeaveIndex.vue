<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2> Absent <template v-if="usertype != 1">
                    / Leave </template>
                Records</h2>
        </div>
    </div>
    <div class="row">        
        <div class="col-auto">
            <router-link :to="{ name: 'leaverecords.create' }" class="btn btn-blue">New Record <i class="fa-solid fa-plus"></i></router-link>
        </div>
        <div class="col">
            <div class="form-group">
                <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
            </div>
        </div>

    </div>
    <div class="tblWrap mt-2 mb-2">
        <table class="mtable hasActions table tblLeave nottbllink">
            <thead>
                <tr>
                    <th>
                        Employee
                    </th>
                    <th>
                        Type
                    </th>
                    <th>
                        Inclusive Dates
                    </th>
                    <th class="h-t">
                        Created By
                    </th>

                     <th>
                         
                     </th>
                </tr>
            </thead>

            <tbody>
                <template v-if="filteredLeaveRecords.length > 0">
                    <template v-for="leaverecord in filteredLeaveRecords" :key="leaverecord.id">
                        <tr>
                            <td>
                                <template v-if="leaverecord.owner">
                                    {{leaverecord.owner.name}}
                                </template>
                            </td>
                            <td>

                                <template v-if="leaverecord.leavetypes">
                                    <template v-for="(leavetype,key) in leaverecord.leavetypes">
                                        {{leavetype.name}}<template v-if="leaverecord.leavetypes.length - 1 != key">, </template>
                                    </template>
                                </template>

                            </td>

                            <td>
                                <template v-if="leaverecord.leaveduration">

                                    <template v-for="(leaveduration, x) in leaverecord.leaveduration">
                                        {{dualdateformat(leaveduration.leavestart, leaveduration.leaveend)}}
                                        <template v-if="x != leaverecord.leaveduration.length -1"> | </template>                                                                       
                                    </template>
                                </template>
                            </td>
                            <td class="h-t">
                                <template v-if="leaverecord.owner">
                                    {{leaverecord.creator.name}}
                                </template>
                            </td>
                            <td @click.stop>

                                    <ul class="ls-frmbutton text-end" v-if="userslug.includes('super-admin') || userslug.includes('admin') || leaverecord.createdby == userid || leaverecord.employee_id == userid" >
                                        <li class="mb-1">
                                            <router-link title="Edit" :to="{name: 'leaverecords.edit', params : {id: leaverecord.id}}" class="btn btn-violet"><i class="sm-icons fa-solid fa-pen-to-square"></i> <span  class="lg-text">Edit</span></router-link>
                                        </li>
                                        <li><button title="delete" class="btn btn-outline-danger" @click="deleteLeaveRecord(leaverecord.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
                                    </ul>
                        
                            </td>
                        </tr>
                    </template>

                </template>
                <template v-else>
                    <template v-if="!noData">
                        <tr class="pr nodata">
                            <td colspan="9">
                                <template v-if="searchQuery && !filteredLeaveRecords.length">               
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
                        <td colspan="9"><span class="nodata">Leave Record is Empty </span>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>

    import useLeaveRecords from '@/composables/composables-leave'

    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'
    import {useAuthStore} from '@/stores/store.js'
    import moment from 'moment'
    import {dualdateformat} from '@/helper/dualdateformat.js'
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';

    export default{
        components: {
            LoadingComponent
        },
        setup(){
            useHead({
                title: 'Employee Leave Records | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            const store = useAuthStore()

            const userid = store.getdetails[0];
            const userslug = store.getdetails[1];

            const usertype = store.getdetails[3];

            const {leaverecords, getLeaveRecords, destroyLeaveRecord} = useLeaveRecords();

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);


            const callback = (leavetypes,searchQuery) => { 
                const newArr = [];
                for (var i = 0; i <= leavetypes.length; i++) {
                    newArr.push(leavetypes[i] && leavetypes[i].name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
                }
                if(newArr.includes(true)){
                    return true;
                }else{
                    return false;
                }
            }
            const datecallback = (leaveduration,searchQuery) => { 
                const newArr = [];
                for (var i = 0; i <= leaveduration.length; i++) {
                    newArr.push(leaveduration[i] && leaveduration[i].leavestart && moment(leaveduration[i].leavestart).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 || leaveduration[i] && leaveduration[i].leaveend && moment(leaveduration[i].leaveend).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
                }
                if(newArr.includes(true)){
                    return true;
                }else{
                    return false;
                }
            }

            const filteredLeaveRecords = computed(function(){
                return leaverecords.value.filter(
                    (leaverecord) => 
                                     (leaverecord.creator && leaverecord.creator.name && leaverecord.creator.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                     (leaverecord.owner && leaverecord.owner.name && leaverecord.owner.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1) ||
                                     callback(leaverecord.leavetypes, searchQuery.value) || 
                                    datecallback(leaverecord.leaveduration, searchQuery.value)
                );
            });

            const router = useRouter()

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
            const noData = ref(false)
            onMounted(() =>{

                getLeaveRecords().then(() =>{
                    if(leaverecords.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }
                }) 
                
            })

            const deleteLeaveRecord = async (id) =>{
                
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

                    await destroyLeaveRecord(id);
                    await getLeaveRecords().then(() => {
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


            const goshow = (id) => {
                router.push({name: 'leaverecords.edit', params: { id: id }});
            }
            
            return {
                filteredLeaveRecords,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteLeaveRecord,
                goshow,
                userslug,
                userid,
                usertype,
                moment,
                dualdateformat,
                noData
            }
        }
    }
</script>
