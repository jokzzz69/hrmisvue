<template>	 
    <template v-if="hld">
        <LoadingComponentDiv/>
    </template>

    <div class="row">
        <div class="col-sm-10">
            <div class="row">
                <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2">
                    <PDSPreviewPage1 :id="props.id"/>
                </div>        
            </div>

            <div class="row">
                <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2">
                    <PDSPreviewPage2 :id="props.id"/>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2">
                    <PDSPreviewPage3 :id="props.id"/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2">
                    <PDSPreviewPage4 :id="props.id"/>
                </div>
            </div>
        </div>
        <div class="col-sm-1 offset-sm-1 brl">
            <ul class="ps-1 rsidebar mt-5 posFixed">
                <li>                   
                    <a  href="#" @click="$router.go(-1)">Back</a>
                </li>
                <li class="slinks" v-if="authuser.employee_id == props.id">
                    <router-link :to="{ name: 'pdspersonal.show'}"><i class="fa-solid fa-pen-to-square"></i> Edit</router-link>                      
                </li>
                <li class="slinks">
                    <template v-if="showDownload">
                        <a @click="downloadselectedpds(id)" href="#"><i class="fa-solid fa-download"></i> Download</a>
                    </template>
                    
                </li>
            </ul>
        </div>
    </div>


</template>

<script>

import useOfficerecord from '@/composables/composables-record';
import useUsers from '@/composables/userscomposables';

import { onMounted, ref, inject, onUpdated, computed,defineAsyncComponent} from 'vue';
import moment from 'moment'
import usePDS from '@/composables/composables-pds';
import { useNavigationStore } from '@/stores/navigationstore.js'
import { useHead } from '@unhead/vue'


const PDSPreviewPage1 = defineAsyncComponent(() => 
    import('@/components/pds/PDSPreviewPage1.vue')
);
const PDSPreviewPage2 = defineAsyncComponent(() => 
    import('@/components/pds/PDSPreviewPage2.vue')
);
const PDSPreviewPage3 = defineAsyncComponent(() => 
    import('@/components/pds/PDSPreviewPage3.vue')
);
const PDSPreviewPage4 = defineAsyncComponent(() => 
    import('@/components/pds/PDSPreviewPage4.vue')
);
const LoadingComponentDiv = defineAsyncComponent(() => 
    import('@/components/loader/LoadingComponentDiv.vue')
);

export default{
    props: {
        id: {
            required: true,
            type: String
        }
    },
    components: {
        PDSPreviewPage1,
        PDSPreviewPage2,
        PDSPreviewPage3,
        PDSPreviewPage4,
        LoadingComponentDiv
    },
    setup (props){
        useHead({
            title: 'PDS Preview | '+import.meta.env.VITE_BFAR_AGENCY
        })
        const swal = inject('$swal')
        const {downloadPDS} = usePDS();
        const {navigationstore} = useNavigationStore();
        const selectedname = ref('');
        const resMun = ref([]);
        const {authuser, getAuthuser} = useUsers()
        const {errors, officerecord, getPersonalRecord } = useOfficerecord()
        const showDownload = ref(false);
        const hld = ref(true);
        onMounted(() => {   
            getPersonalRecord(props.id).then(() =>{
                hld.value = false;
                if(officerecord.value.employee){
                    selectedname.value = officerecord.value.employee.employee_lname+""+officerecord.value.employee.employee_fname;
                    showDownload.value = true;
                }
                
            }),
            getAuthuser()
        })
        
        const downloadselectedpds = async(id) => {
            await downloadPDS(id,selectedname.value);
        }
        return{
            props,
            authuser,
            downloadselectedpds,
            showDownload,
            hld
        }
    }
}


</script>