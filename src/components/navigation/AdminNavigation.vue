<template>
    <li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#employeerecords-collapse" aria-expanded="false"><i class="fa-solid fa-users-rectangle"></i> <span>Employees Records</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn" id="employeerecords-collapse" style="">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link"><router-link :to="{ name: 'monitoring.index' }">Employees DTR</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'record.index'}">Employees Information</router-link></li>
          
          <li class="nav-link"><router-link :to="{ name: 'pds.index'}">Employees PDS</router-link></li>

          <li class="nav-link"><router-link :to="{name: 'travels.index'}">Employees Travels</router-link></li>
          <li class="nav-link"><router-link :to="{name: 'archives.index'}">Employees Archived</router-link></li>

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
            <router-link :to="{ name: 'monitoring.employee' }">My DTR</router-link>

          </li>

          <li class="nav-link"><router-link :to="{ name: 'recordpersonal.show' }">My Information</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'pdsmydata.show' }">My PDS</router-link></li>
          <li class="nav-link"><a href="#" class="text-danger">My Office ID</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Payslip</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Contract</a></li>
          <li class="nav-link"><a href="#" class="text-danger">My Leave Records</a></li>
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
      <ul class="btn-toggle-nav list-unstyled small">             
        <li class="nav-link"><router-link :to="{ name: 'offices.index' }"><i class="fa-solid fa-sign-hanging"></i> Office Name</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'locations.index' }"><i class="fa-solid fa-map-location-dot"></i> Office Locations</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'employeetype.index' }"><i class="fa-solid fa-person-harassing"></i> Employee Types</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'employeestatus.index' }"><i class="fa-solid fa-battery-half"></i> Employee Status</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'employeeposition.index' }"><i class="fa-solid fa-people-arrows"></i> Employee Positions</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'salarygradegroup.index' }"><i class="fa-solid fa-money-bill-trend-up"></i> Salary Grades</router-link></li>

        <li class="nav-link">
          <router-link :to="{name: 'holidays.index' }"> <i class="fa-regular fa-rectangle-list"></i> Holiday List</router-link>
        </li>
        <li class="nav-link">
          <router-link :to="{name: 'biometrics.index'}"><i class="fa-solid fa-fingerprint"></i> Biometrics</router-link>

            <ul class="list-unstyled">
                <li class="nav-link">
                  <router-link :to="{name: 'biometricsuser.index'}">Biometrics Users</router-link>
                </li>
            </ul>

        </li>
      </ul>
    </div>
</li>
<li>
    <a href="#" @click.prevent.stop class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#admin-collapse" aria-expanded="true">
      <i class="fa-solid fa-user-secret"></i><span>Admin</span> <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn show" id="admin-collapse" >
      <ul class="btn-toggle-nav list-unstyled small">
        
        <li class="nav-link"><router-link :to="{ name: 'users.index' }"><i class="fa-solid fa-users-line"></i> Users</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'logs.index' }"><i class="fa-regular fa-file-lines"></i> Logs</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'roles.index' }"><i class="fa-solid fa-person-digging"></i>  Roles</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'cmi.index' }"><i class="fa-solid fa-user-secret"></i> Debug</router-link></li>
      </ul>
    </div>
</li>

</template>
<script>
  
  export default{
    setup(){

      return{
        
      }
    }
  }
</script>