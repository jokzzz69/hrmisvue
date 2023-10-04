<template>    
    <div class="col-2 brl ptpb right-navigation" :class="{hideRyt:rshow, mbshow: mshow}">
        <a href="#" @click="btnClick" class="btn-rsidebar wb"><span class="material-icons">{{iconname}}</span></a>
        <a href="#" @click="btnClickMobile" class="btn-rsidebar mb"><span class="material-icons">{{micon}}</span></a>
        <div class="menu posFixed">
            <span class="rff fs-5">Personal Data</span>
            <ul class="rsidebar">
                <li>
                    <router-link :to="{ name: 'pdspersonal.show' }">Personal Information</router-link>                
                </li>
                <li>
                    <router-link :to="{ name: 'pdspersonalfamilybackground.show'}">Family Background</router-link>
                </li>
                <li><router-link :to="{ name: 'pdspersonaleducationalbackground.show'}">Educational Background</router-link></li>
                <li><router-link :to="{ name: 'pdseligibility.show'}">Civil Service Eligibility</router-link></li>        
                <li><router-link :to="{ name: 'pdsworkexperience.show'}">Work Experience</router-link></li>
                <li><router-link :to="{ name: 'pdsvoluntarywork.show'}">Voluntary Work</router-link></li>   
                <li><router-link :to="{ name: 'pdslearninganddevelopment.show'}">Learning and Development</router-link></li> 
                <li><router-link :to="{ name: 'pdsotherinformation.show'}">Other Information</router-link></li>          
                <li><router-link :to="{ name: 'pdslastinformation.show'}">References</router-link></li>
                <li class="slinks"><router-link :to="{ name: 'viewmydata.show', params: { id: id } }"><i class="fa-regular fa-file-lines pe-1"></i> Preview</router-link></li>
                <li class="slinks"><a @click="downloadmypds(id)" href="#"><i class="fa-solid fa-download"></i> Download</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
import {onMounted ,ref, computed} from 'vue';
import { useNavigationStore } from '@/stores/navigationstore.js'

import usePDS from '@/composables/composables-pds';
    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){

            const navigationstore = useNavigationStore();
            const rshow = ref('');
            const iconname = ref('arrow_forward');
            const micon = ref('arrow_backward');
            const {downloadPDS} = usePDS();
            const mshow = ref(false);
            const mshowclass =ref();
            const btnClick = async () =>{
                if(rshow.value != 'hideRyt'){
                    rshow.value = "hideRyt";
                    iconname.value = 'arrow_backward';
                }else{
                    rshow.value = '';
                    iconname.value = 'arrow_forward';
                }
            }

            const downloadmypds = async(id) =>{
                await downloadPDS(id,navigationstore.name);
            }
            const btnClickMobile = () => {
                mshow.value = !mshow.value;
                if(mshow.value){
                    micon.value = 'arrow_forward';
                }else{
                    micon.value = 'arrow_backward';
                }
            }
            return {
                rshow,
                btnClick,
                iconname,
                downloadmypds,
                btnClickMobile,
                mshow,
                micon
            }
        }
    }
</script>