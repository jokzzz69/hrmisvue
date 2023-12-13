<template>

<li v-if="userslug.includes('office-head')">
    <a href="#" class="nav-link btn-toggle align-items-center collapsed emplinks"  data-bs-toggle="collapse" data-bs-target="#empmon-collapse" aria-expanded="true">
      <i class="fa-solid fa-computer pe-1"></i><span>DTR Monitoring</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="empNavTitle">
      <span class="lblM lbl-left-nav">DTR Monitoring</span>
    </div>
    <div  class="collapse navdrpdwn show" id="empmon-collapse" >
      <ul class="btn-toggle-nav list-unstyled small wid--ic">  
        
        <li class="nav-link"><router-link :to="{ name: 'monitoringofficehead.index' }"><i class="fa-solid fa-users-rectangle"></i> Employees DTR</router-link></li>       
      </ul>
    </div>
</li>

<li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed emplinks"  data-bs-toggle="collapse" data-bs-target="#emprec-collapse" aria-expanded="true">
      <i class="fa-regular fa-id-badge pe-1"></i><span>Personal Record</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="empNavTitle">
      <span class="lblM lbl-left-nav">Personal Record</span>
    </div>
    <div  class="collapse navdrpdwn show empnav" id="emprec-collapse" >
      <ul class="btn-toggle-nav list-unstyled small wid--ic">           
                      
        <li class="nav-link">
            <template v-if="userslug.includes('office-head')">
              <router-link :to="{ name: 'mydailytimerecord.index' }"><i class="fa-solid fa-fingerprint"></i> My Daily Time Record</router-link>
            </template>
            <template v-else>
              <router-link :to="{ name: 'mydailytimerecord.index' }"><i class="fa-solid fa-fingerprint"></i> Daily Time Record</router-link>
            </template>

        </li>
        <li class="nav-link"><router-link :to="{ name: 'recordpersonal.show' }"><i class="fa-solid fa-address-card"></i> Personal Information</router-link></li>
        <li class="nav-link" v-if="showViewemployees"><router-link :to="{ name: 'employeeslist.view' }"><i class="fa-solid fa-users-rectangle"></i> All Employees</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'pdsmydata.show' }"><i class="fa-solid fa-user-pen"></i> Personal Data Sheet</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'travels.index' }"><i class="fa-solid fa-car-side"></i> Travels</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'myleaverecords.index' }"><i class="fa-solid fa-person-through-window"></i> Absent <template v-if="usertype != 1">/ Leave </template> Records</router-link></li>
        
        <template v-if="id == 4">
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
<li v-if="userslug.includes('communicationencoder')">
    <a href="#" class="nav-link btn-toggle align-items-center collapsed emplinks"  data-bs-toggle="collapse" data-bs-target="#emprec-collapse" aria-expanded="true">
      <i class="fa-regular fa-id-badge pe-1"></i><span>Settings</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="empNavTitle">
      <span class="lblM lbl-left-nav">Settings</span>
    </div>
    <div  class="collapse navdrpdwn show empnav" id="emprec-collapse" >
      <ul class="btn-toggle-nav list-unstyled small wid--ic">           
                      
        <li class="nav-link">            
          <router-link :to="{ name: 'units.index' }"><i class="fa-solid fa-boxes-stacked"></i> <span>Units</span></router-link>
        </li>       
        <li class="nav-link">            
          <router-link :to="{ name: 'communicationgroups.index' }"><i class="fa-solid fa-users-gear"></i> <span>Individual Groups</span></router-link>
        </li>

      </ul>
    </div>
</li>
<li>
    <div class="empNavTitle">
      <span class="lblM lbl-left-nav">About</span>
    </div>
    <div  class="navdrpdwn" id="emprec-collapse" >
      <ul class="btn-toggle-nav list-unstyled small wid--ic">           
                      
        <li class="nav-link">
            <router-link :to="{ name: 'about.index' }"><i class="fa-solid fa-circle-info"></i> <span>HRMIS</span></router-link>
        </li>
        <li class="nav-link">
            <router-link :to="{ name: 'aboutcms.index' }"><i class="fa-solid fa-circle-info"></i> <span>CMDTS</span></router-link>
        </li>
      </ul>
    </div>
</li>
</template>

<script>
  import { useAuthStore } from '@/stores/store.js'
  import {ref} from 'vue'
  export default{
    setup(){
      const store = useAuthStore();
      const userslug = ref(store.details[1]);
      const id = ref(store.details[0]);
      const usertype = ref(store.details[3]);
      const permissions = ref(store.details[4]);

      const showViewemployees = ref(false);

      if(permissions.value.includes('viewemployees')){
        showViewemployees.value = true;
      }

      return {
        userslug,
        id,
        showViewemployees,
        usertype
      }
    }
  }
</script>