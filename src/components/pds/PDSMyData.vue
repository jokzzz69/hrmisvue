<template>	 
    <div class="row w-right-nav">
        <div class="col-md-12 p-title">
            <h2>My Personal Datasheet</h2>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="tblWrap mt-2">
                <table class="mtable table nottbllink">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="officerecord">
                        <template v-if="officerecord.pdspersonalinformation">
            
                            <tr>          
                                <td> 
                                    <span v-if="officerecord.pdspersonalinformation.updated_at">
                                        Updated as of {{moment(officerecord.pdspersonalinformation.updated_at).format('MMMM D, YYYY [at] h:mm A')}}
                                    </span>
                                </td>
                                <td>
                                    <ul class="ls-frmbutton text-end">
                                        <li>
                                            <router-link :to="{ name: 'viewmydata.show',params: { id: id }}" class="btn btn-outline-success"><i class="fa-regular fa-file-lines"></i> View</router-link>
                                        </li>
                                        <li>
                                            <router-link :to="{ name: 'pdspersonal.show'}" class="btn btn-violet" title="Edit Data"><i class="fa-solid fa-file-pen"></i> Edit</router-link>
                                        </li>
                                        <li>
                                            <button @click="downloadpds(id)" class="btn btn-outline-danger btn-exportEmps" title="Export Data to PDF" ><i class="fa-solid fa-download"></i> Download</button>
                                        </li>         
                                        <li>
                                            <button title="Reset Data" class="btn btn-teal" @click="resetPDS(officerecord.employee_id)">
                                                <i class="fa-solid fa-eraser"></i> Reset
                                            </button>
                                        </li>
                                    </ul>
                                </td>


                            </tr>
                        </template>
                    </template>          
                    <template v-if="noData">
                        <tr class="pr nodata">
                            <td colspan="2">                                                          
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

import useOfficerecord from '@/composables/composables-record';
import usePDS from '@/composables/composables-pds'

import { onMounted, ref, inject, onUpdated } from 'vue';
import moment from 'moment'

import { useAuthStore } from '@/stores/store.js'
import { useNavigationStore } from '@/stores/navigationstore.js'

import { useHead } from '@unhead/vue'
import LoadingComponent from '@/components/loader/LoadingComponent.vue';

export default{
    components: {
        LoadingComponent
    },
    setup (){
        useHead({
            title: 'My PDS | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const {downloadPDS} = usePDS();


        const store = useAuthStore();
        const navigationstore = useNavigationStore();

        const id = ref(store.details[0]);
        const name = ref(navigationstore.name);

        const swal = inject('$swal')
        const resMun = ref([]);

        const { errors,resetMyPds, officerecord, getPersonalRecord } = useOfficerecord()
        const noData = ref(true)
        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                noData.value = false;
            })

        })
        const resetPDS = async(id) => {
            let x = 0; //trigger

                await swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, reset it!'
                }).then((result) => {
                  if (result.isConfirmed) {         
                    x = 1;
                  }
                })
                if (x > 0) {

                    await resetMyPds(id);
                    await getPersonalRecord(id).then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'PDS has been reset successfully',
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
                    });
                }
        }
        const downloadpds = async(id) =>{
            await downloadPDS(id,name.value);
        }
        return{
            officerecord,
            moment,
            resetPDS,
            id,
            downloadpds,
            noData
        }
    }
}


</script>