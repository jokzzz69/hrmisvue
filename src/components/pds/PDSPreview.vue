<template>	 
   
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
                    <router-link :to="{ name: 'pdspersonal.show', params: { id: id } }"><i class="fa-solid fa-pen-to-square"></i> Edit</router-link>                      
                </li>
                <li class="slinks">
                    <a :href="'/hrmis/api/export/pds/'+id"><i class="fa-solid fa-download"></i> Download</a>
                </li>
            </ul>
        </div>
    </div>


</template>

<script>

import useOfficerecord from '@/composables/composables-record';
import useUsers from '@/composables/userscomposables';
import PDSPreviewPage1 from '@/components/pds/PDSPreviewPage1.vue';
import PDSPreviewPage2 from '@/components/pds/PDSPreviewPage2.vue';
import PDSPreviewPage3 from '@/components/pds/PDSPreviewPage3.vue';
import PDSPreviewPage4 from '@/components/pds/PDSPreviewPage4.vue';
import { onMounted, ref, inject, onUpdated, computed} from 'vue';
import moment from 'moment'

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
        PDSPreviewPage4
    },
    setup (props){
        const swal = inject('$swal')
        const resMun = ref([]);
        const {authuser, getAuthuser} = useUsers()
        const {errors, officerecord, getPersonalRecord } = useOfficerecord()


        onMounted(() => {   
            getPersonalRecord(props.id),
            getAuthuser()
        })
        
        return{
            props,
            authuser
        }
    }
}


</script>