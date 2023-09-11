<template>

<li v-if="userslug == 'office-head'">
    <a href="#" class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#empmon-collapse" aria-expanded="true">
      <i class="fa-solid fa-computer pe-1"></i>DTR Monitoring <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn" id="empmon-collapse" >
      <ul class="btn-toggle-nav list-unstyled small">  
        
        <li class="nav-link"><router-link :to="{ name: 'monitoringofficehead.index' }"><i class="fa-solid fa-users-rectangle"></i> Employees DTR</router-link></li>       
      </ul>
    </div>
</li>

<li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#emprec-collapse" aria-expanded="true">
      <i class="fa-regular fa-id-badge pe-1"></i>Personal Record <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn show" id="emprec-collapse" >
      <ul class="btn-toggle-nav list-unstyled small">           
                      
        <li class="nav-link">
            <template v-if="userslug == 'office-head'">
              <router-link :to="{ name: 'monitoring.employee' }"><i class="fa-solid fa-fingerprint"></i> My Daily Time Record</router-link>
            </template>
            <template v-else>
              <router-link :to="{ name: 'monitoring.employee' }"><i class="fa-solid fa-fingerprint"></i> Daily Time Record</router-link>
            </template>

        </li>
        <li class="nav-link"><router-link :to="{ name: 'recordpersonal.show' }"><i class="fa-solid fa-address-card"></i> Personal Information</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'pdsmydata.show' }"><i class="fa-solid fa-user-pen"></i> Personal Data Sheet</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'travels.index' }"><i class="fa-solid fa-car-side"></i> Travels</router-link></li>
        
        <template v-if="id == 215">
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Office ID</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Payslip</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Contract</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Leave Form</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> IPCR</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> COE</a></li> 
        </template>
          

      </ul>
    </div>
</li>
<template v-if="id == 215">
<li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#empf-collapse" aria-expanded="true">
      <i class="fa-brands fa-wpforms pe-1"></i>Forms <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn" id="empf-collapse" >
      <ul class="btn-toggle-nav list-unstyled small">                
        <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Leave Records</a></li>
        <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> IPCR Form</a></li>
        <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> COS Clearance</a></li>
        <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> COS Assessment</a></li>
        <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Locator Slip</a></li>
      </ul>
    </div>
</li>
</template>

</template>

<script>
  import { useAuthStore } from '@/stores/store.js'
  import {ref} from 'vue'
  export default{
    setup(){
      const store = useAuthStore();
      const userslug = ref(store.details[1]);
      const id = ref(store.details[0]);

      return {
        userslug,
        id
      }
    }
  }
</script>