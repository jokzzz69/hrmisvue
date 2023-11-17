<template>
  <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed emplinks" data-bs-toggle="collapse" data-bs-target="#communications" aria-expanded="true"><i class="fa-solid fa-tower-cell"></i> <span>Communications</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="empNavTitle">
      <span class="lblM lbl-left-nav">Communications</span>
    </div>
    <div class="collapse navdrpdwn show" id="communications" style="">
      <ul class="btn-toggle-nav list-unstyled small wid--ic">

          <li class="nav-link w__c">
            <router-link :to="{ name: 'communications.index' }">
              <i class="fa-solid fa-envelope-open-text"></i> <span>Inbox</span><CommunicationCount/>
            </router-link>
          </li>        
          <li class="nav-link">
            <router-link :to="{ name: 'actionstaken.index'}">
              <i class="fa-solid fa-person-digging"></i> <span>Actions Taken</span>
            </router-link>
          </li>

      </ul>
    </div>          
  </li>
</template>
<script>

  import CommunicationCount from '@/components/cm/navigationcount/CommunicationCount.vue';
  import RoutedCount from '@/components/cm/navigationcount/RoutedCount.vue';

  export default{
    components: {
      CommunicationCount,
      RoutedCount
    },
    setup(){

    }
  }
</script>