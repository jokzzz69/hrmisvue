<template>    
    <div class="col-2 brl ptpb right-navigation" :class="{hideRyt:rshow, mbshow: mshow}">
        <a href="#" @click="btnClick" class="btn-rsidebar wb"><span class="material-icons">{{iconname}}</span></a>
        <a href="#" @click="btnClickMobile" class="btn-rsidebar mb"><span class="material-icons">{{micon}}</span></a>
        <div class="menu posFixed">
            <span class="rff fs-5">HRMIS Settings</span>
            <ul class="rsidebar">
                <li class="nav-link"><router-link :to="{ name: 'offices.index' }">Office Name</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'locations.index' }">Office Locations</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'employeetype.index' }">Employee Types</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'employeestatus.index' }">Employee Status</router-link></li>
                <li class="nav-link"><router-link :to="{ name: 'employeeposition.index' }">Employee Positions</router-link></li>

                <li class="nav-link"><router-link :to="{ name: 'salarygradegroup.index' }">Salary Grades</router-link></li>

                <li class="nav-link">
                  <router-link :to="{name: 'holidays.index' }">Holiday List</router-link>
                </li>
                <li class="nav-link">
                  <router-link :to="{name: 'biometrics.index'}">Biometrics</router-link>

                    <ul class="list-unstyled">
                        <li class="nav-link">
                          <router-link :to="{name: 'biometricsuser.index'}">Biometrics Users</router-link>
                        </li>
                    </ul>

                </li>
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