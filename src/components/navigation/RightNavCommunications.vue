<template>    
    <div class="col-2 brl ptpb right-navigation" :class="{hideRyt:rshow, mbshow: mshow}">
        <a href="#" @click="btnClick" class="btn-rsidebar wb"><span class="material-icons">{{iconname}}</span></a>
        <a href="#" @click="btnClickMobile" class="btn-rsidebar mb"><span class="material-icons">{{micon}}</span></a>
        <div class="menu posFixed">
            <span class="rff fs-5">Communication Settings</span>
            <ul class="rsidebar">
                <li class="nav-link"><router-link :to="{ name: 'documenttypes.index' }">Document Types</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'classifications.index' }">Classifications</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'notes.index' }">Notes</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'actions.index' }">Actions</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'communicationgroups.index' }">Groups</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'startingnumber.edit' }">Starting Number</router-link></li>                
            </ul>
        </div>
    </div>
</template>
<script>
import {onMounted ,ref, computed} from 'vue';
import { useNavigationStore } from '@/stores/navigationstore.js'
import { useAuthStore } from '@/stores/store.js'

import usePDS from '@/composables/composables-pds';
    export default{
        setup(){
            const store = useAuthStore();
            const userslug = ref(store.details[1]);
            const usertype = ref(store.details[3]);
            const rshow = ref('');
            const iconname = ref('arrow_forward');
            const micon = ref('settings');
            const mshow = ref(false);
            const mshowclass =ref();
            const btnClick = async () =>{
                if(rshow.value != 'hideRyt'){
                    rshow.value = "hideRyt";
                    iconname.value = 'settings';
                }else{
                    rshow.value = '';
                    iconname.value = 'arrow_forward';
                }
            }
            const btnClickMobile = () => {
                            mshow.value = !mshow.value;
                            if(mshow.value){
                                micon.value = 'arrow_forward';
                            }else{
                                micon.value = 'settings';
                            }
                        }
            return {
                userslug,
                usertype,
                iconname,
                mshow,
                micon,
                rshow,
                btnClick,
                btnClickMobile
            }
        }
    }
</script>