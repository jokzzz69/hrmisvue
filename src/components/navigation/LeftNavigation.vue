<template>
  
  <aside class="sidebarleft" v-if="changed" :class="leftdisplay ? '' : 'nd'" >
  
    <div class="bdrop" v-if="leftdisplay" @click="bdropclick"></div>
    <nav id="sidenav" class="flex-column flex-shrink-0 text-white">
      <ul class="nav nav-pills flex-column mb-auto leftnav-wrap"  @click.prevent="hideonM"> 
        
      <template v-if="userslug.includes('super-admin') || userslug.includes('admin')">
        <AdminCommunicationEncoder/>
      </template>
       <template v-else-if="userslug.includes('hr')">
         <template v-if="userslug.includes('communicationencoder')">
            <AdminCommunicationEncoder/>
         </template>
         <template v-else-if="userslug.includes('communicationviewer')">
            <AdminCommunicationViewer/>
         </template>        
       </template>
       <template v-else>
         <template v-if="userslug.includes('communicationencoder')">
           <CommunicationEncoder/>
         </template>
         <template v-else-if="userslug.includes('communicationviewer')">
           <CommunicationViewer/>
         </template>
       </template>
       <template v-if="userslug.includes('super-admin') || userslug.includes('admin')">
         <AdminNavigation/>
       </template>
       <template v-else-if="userslug.includes('hr')">
         <HrNavigation/>
       </template>
       <template v-else-if="userslug.includes('employee') || userslug.includes('office-head')">
         <EmployeeNavigation/>
       </template>

       <li v-if="userslug.includes('super-admin') || userslug.includes('admin')  || userslug.includes('hr')">
         <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#about" aria-expanded="false"><i class="fa-solid fa-circle-info"></i><span> About</span> <i class="cvright fa-solid fa-angle-right"></i>
          </a>
          <div class="collapse navdrpdwn" id="about">
            <ul class="btn-toggle-nav list-unstyled small">
                <li class="nav-link">
                  <router-link  :to="{ name: 'about.index' }"> HRMIS</router-link>
                </li>      
                <li class="nav-link">
                  <router-link  :to="{ name: 'aboutcms.index' }"> CMDTS</router-link>
                </li>
            </ul>
          </div>        
      </li>

      </ul>
  </nav>

  </aside>
  <PrivacyModal/>
</template>
<script>
  import {ref,watch} from 'vue'
  import { useAuthStore } from '@/stores/store.js'
  import AdminNavigation from '@/components/navigation/AdminNavigation.vue';
  import HrNavigation from '@/components/navigation/HrNavigation.vue';
  import EmployeeNavigation from '@/components/navigation/EmployeeNavigation.vue';
  import { usePasswordChange } from '@/stores/changepasswordstore.js'
  import useEventsBus from '@/components/helper/Eventbus';
  import AdminCommunicationEncoder from '@/components/navigation/AdminCommunicationEncoder.vue';
  import AdminCommunicationViewer from '@/components/navigation/AdminCommunicationViewer.vue';
  import CommunicationEncoder from '@/components/navigation/CommunicationEncoder.vue';
  import CommunicationViewer from '@/components/navigation/CommunicationViewer.vue';
  import PrivacyModal from '@/components/privacy/PrivacyModal.vue';



  export default{
    components: {
      AdminNavigation,
      HrNavigation,
      EmployeeNavigation,
      AdminCommunicationEncoder,
      AdminCommunicationViewer,
      CommunicationEncoder,
      CommunicationViewer,
      PrivacyModal
    },
    setup(){
      const store = useAuthStore();
      const {bus,emit}=useEventsBus()
      const leftdisplay = ref(null);

      const hideonM = () => {
        leftdisplay.value = !leftdisplay.value;
        emit('leftdisplay', leftdisplay.value);
      }


      watch(()=>bus.value.get('leftdisplay'), (val) => {
        [leftdisplay.value] = val ?? []           
      })
      const changepasswordstore = usePasswordChange();

      const changed = ref(changepasswordstore.passwordstate);
      const userslug = ref(store.details[1]);

      const bdropclick = () => {
          leftdisplay.value = !leftdisplay.value;
          emit('leftdisplay', leftdisplay.value);

      }
     
      return {
        userslug,
        changed,
        leftdisplay,
        bdropclick,
        hideonM
      }
    }
  }
</script>