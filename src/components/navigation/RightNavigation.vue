<template>
    
    <div class="col-2 brl ptpb" :class="rshow">
        <a href="#" @click="btnClick" class="btn-rsidebar"><span class="material-icons">{{iconname}}</span></a>
        <div class="menu posFixed">
            <span class="rff fs-5">Personal Data</span>
            <ul class="rsidebar">
                <li>
                    <router-link :to="{ name: 'pdspersonal.show', params: { id: id } }">Personal Information</router-link>
                
                </li>
                <li>
                    <router-link :to="{ name: 'pdspersonalfamilybackground.show', params: { id: id } }">Family Background</router-link>
                </li>
                <li><router-link :to="{ name: 'pdspersonaleducationalbackground.show', params: { id: id } }">Educational Background</router-link></li>
                <li><router-link :to="{ name: 'pdseligibility.show', params: { id: id } }">Civil Service Eligibility</router-link></li>        
                <li><router-link :to="{ name: 'pdsworkexperience.show', params: { id: id } }">Work Experience</router-link></li>
                <li><router-link :to="{ name: 'pdsvoluntarywork.show', params: { id: id } }">Voluntary Work</router-link></li>   
                <li><router-link :to="{ name: 'pdslearninganddevelopment.show', params: { id: id } }">Learning and Development</router-link></li> 
                <li><router-link :to="{ name: 'pdsotherinformation.show', params: { id: id } }">Other Information</router-link></li>          
                <li><router-link :to="{ name: 'pdslastinformation.show', params: { id: id } }">References</router-link></li>
                <li class="slinks"><router-link :to="{ name: 'viewmydata.show', params: { id: id } }"><i class="fa-regular fa-file-lines pe-1"></i> Preview</router-link></li>
                <li class="slinks"><a :href="'/hrmis/api/export/pds/'+id"><i class="fa-solid fa-download"></i> Download</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
import {onMounted ,ref, computed} from 'vue';
    export default{
        props: {
            id: {
                required: true,
                type: String
            }
        },
        setup(props){
            const rshow = ref('');
            const iconname = ref('arrow_forward');
            const btnClick = async () =>{
                if(rshow.value != 'hideRyt'){
                    rshow.value = "hideRyt";
                    iconname.value = 'arrow_backward';
                }else{
                    rshow.value = '';
                    iconname.value = 'arrow_forward';
                }
            }
            return {
                rshow,
                btnClick,
                iconname
            }
        }
    }
</script>