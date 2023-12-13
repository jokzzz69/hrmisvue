<template>
  <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed emplinks" data-bs-toggle="collapse" data-bs-target="#communications" aria-expanded="true"><i class="fa-solid fa-tower-cell"></i> <span>Communications</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="empNavTitle">
      <span class="lblM lbl-left-nav">Communications</span>
    </div>
    <div class="collapse navdrpdwn show" id="communications" style="">
      <ul class="btn-toggle-nav list-unstyled small wid--ic">

          <li class="nav-link">
            <router-link :to="{ name: 'communications.create' }" class="btn btn-blue w-100 mt-2 new__commBTNV"> 
              <i class="fa-solid fa-plus"></i> New Communication
            </router-link>
          </li>       

          <li class="nav-link w__c" v-if="permissions.includes('all-communications')">
            <router-link :to="{ name: 'communications.all' }">
              <i class="fa-regular fa-comments"></i> <span>All Communications</span><CommunicationCount/>
            </router-link>
          </li>

          <li class="nav-link w__c">
            <router-link :to="{ name: 'communications.index' }">
              <i class="fa-solid fa-envelope-open-text"></i> <span>Inbox</span><CommunicationCount/>
            </router-link>
          </li>
          <li class="nav-link w__c">
            <router-link :to="{ name: 'communications-routed.index'}">
              <i class="fa-regular fa-paper-plane"></i> <span>Routed</span><RoutedCount/>
            </router-link>
          </li>
          
          <li class="nav-link">
            <router-link :to="{ name: 'actionstaken.index'}">
              <i class="fa-solid fa-person-digging"></i> <span>Actions Taken</span>
            </router-link>
          </li>

          <li class="nav-link nav-relative"><router-link :to="{name: 'communications-draft.index'}"><i class="fa-regular fa-file-lines"></i> <span>Draft</span><DraftCount/></router-link></li>
      </ul>
    </div>          
  </li>
</template>
<script>
  import DraftCount from '@/components/cm/navigationcount/DraftCount.vue';
  import CommunicationCount from '@/components/cm/navigationcount/CommunicationCount.vue';
  import RoutedCount from '@/components/cm/navigationcount/RoutedCount.vue';
  import { useAuthStore } from '@/stores/store.js'
  import {ref} from 'vue'
  export default{
    components: {
      DraftCount,
      CommunicationCount,
      RoutedCount
    },
    setup(){
      const store = useAuthStore()
      const permissions = ref(store.details[4]);
      return{
        permissions
      }
    }
  }
</script>