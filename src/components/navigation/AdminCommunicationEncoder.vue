<template>
  <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#communications" aria-expanded="false"><i class="fa-solid fa-tower-cell"></i> <span>Communications</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn" id="communications" style="">
      <ul class="btn-toggle-nav list-unstyled small wid--ic">
          <li class="nav-link">
            <router-link :to="{ name: 'communications.create' }" class="btn btn-blue w-100 mt-2 new__commBTN"> 
              <i class="fa-solid fa-pen-fancy"></i> New Communication
            </router-link>
          </li>
          <li class="nav-link w__c">
            <router-link :to="{ name: 'communications.index' }">
              <i class="fa-solid fa-envelope-open-text"></i> <span>Incoming</span><CommunicationCount/>
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

  export default{
    components: {
      DraftCount,
      CommunicationCount,
      RoutedCount
    },
    setup(){

    }
  }
</script>