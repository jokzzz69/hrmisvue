<template>

  <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#employeerecords-collapse" aria-expanded="true"><i class="fa-solid fa-users-rectangle"></i> <span>Employees Records</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn show" id="employeerecords-collapse" style="">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link"><router-link :to="{ name: 'monitoring.index' }">Employees DTR</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'record.index'}">Employees Information</router-link></li>
          
          <li class="nav-link"><router-link :to="{ name: 'pds.index'}">Employees PDS</router-link></li>

          <li class="nav-link"><router-link :to="{name: 'travels.index'}">Employees Travels</router-link></li>
          <li class="nav-link"><router-link :to="{name: 'archives.index'}">Employees Archived</router-link></li>
          <li class="nav-link"><router-link :to="{name: 'leaverecords.index'}">Employees Absent <template v-if="usertype != 1"> / Leave</template></router-link></li>

          <li class="nav-link"><a href="#" class="text-danger">Employees Assessment</a></li>               

      </ul>
    </div>          
  </li>
  <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#personaldata-collapse" aria-expanded="false"><i class="fa-regular fa-id-badge"></i> <span>Personal Record</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn" id="personaldata-collapse">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link">
            <router-link :to="{ name: 'mydailytimerecord.index' }">My DTR</router-link>

          </li>

          <li class="nav-link"><router-link :to="{ name: 'recordpersonal.show' }">My Information</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'pdsmydata.show' }">My PDS</router-link></li>
          <li class="nav-link"><router-link :to="{name: 'myleaverecords.index'}">My Absent <template v-if="usertype != 1"> / Leave</template> Records</router-link></li>
          <li class="nav-link"><a href="#" class="text-danger">My Office ID</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Payslip</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Contract</a></li>
      
          
          <li class="nav-link"><a href="#" class="text-danger">My IPCR</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My COE</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Clearance</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Assessment</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Locator Slip</a></li>
      </ul>
    </div>
    
  </li>

<li>
   <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#generate-reportcollapse" aria-expanded="false"><i class="fa-solid fa-users-gear"></i><span>Generate Report</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn" id="generate-reportcollapse">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link">
            <router-link  :to="{ name: 'generatedtr.index' }"> Employees DTR</router-link>
          </li>      
          <li class="nav-link">
            <router-link  :to="{ name: 'customreport.index' }"> Employees Record</router-link>
          </li>
      </ul>
    </div>        
</li>

<li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#setting-collapse" aria-expanded="false"><i class="fa-solid fa-gear"></i> <span>Settings</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn" id="setting-collapse" >
      <ul class="btn-toggle-nav list-unstyled small wid--ic">             
        <li class="nav-link"><router-link :to="{ name: 'offices.index' }"><i class="fa-solid fa-sitemap"></i> HRMIS</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'leavetypes.index' }"><i class="fa-brands fa-wpforms"></i> Forms</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'documenttypes.index' }"><i class="fa-solid fa-sliders"></i> Communication</router-link></li>
      </ul>
    </div>
</li>
<li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#admin-collapse" aria-expanded="false">
      <i class="fa-solid fa-user-secret"></i> <span>Admin</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn" id="admin-collapse" >
      <ul class="btn-toggle-nav list-unstyled small wid--ic">
        
        <li class="nav-link"><router-link :to="{ name: 'users.index' }"><i class="fa-solid fa-users-line"></i> Users</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'logs.index' }"><i class="fa-regular fa-file-lines"></i> Logs</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'roles.index' }"><i class="fa-solid fa-person-digging"></i>  Roles</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'permissions.index' }"><i class="fa-solid fa-diagram-successor"></i>  Permissions</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'cmi.index' }"><i class="fa-solid fa-user-secret"></i> Debug</router-link></li>
      </ul>
    </div>
</li>

</template>
<script>
  import { useAuthStore } from '@/stores/store.js'
  import {onMounted ,ref, computed, inject} from 'vue';
  export default{
    setup(){
      const store = useAuthStore();
      
      const usertype = ref(store.details[3]);
      return{

        usertype
      }
    }
  }
</script>