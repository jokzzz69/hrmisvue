<template>
  <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#communications" aria-expanded="true"><i class="fa-solid fa-tower-cell"></i> <span>Communications</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn show" id="communications" style="">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link"><router-link :to="{ name: 'communications.index' }"><i class="fa-solid fa-envelope-open-text"></i> <span>Incoming</span></router-link></li>        
          <li class="nav-link"><router-link :to="{ name: 'pds.index'}"><i class="fa-solid fa-person-digging"></i> <span>Actions Taken</span></router-link></li>
      </ul>
    </div>          
  </li>
</template>
<script>
  export default{
    setup(){

    }
  }
</script>