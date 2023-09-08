<template>
    <li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#employeerecords-collapse" aria-expanded="false"><i class="fa-solid fa-users-rectangle"></i> Employees Records <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn" id="employeerecords-collapse" style="">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link"><router-link :to="{ name: 'monitoring.index' }">Employees DTR</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'record.index'}">Employees Information</router-link></li>          
          <li class="nav-link"><router-link :to="{ name: 'pds.index'}">Employees PDS</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'travels.index' }">Employees Travels</router-link></li>
          <li class="nav-link"><router-link :to="{name: 'archives.index'}">Employees Archived</router-link></li>
      </ul>
    </div>          
  </li>
  <li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#personaldata-collapse" aria-expanded="false"><i class="fa-regular fa-id-badge"></i> Personal Record <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div class="collapse navdrpdwn" id="personaldata-collapse">
      <ul class="btn-toggle-nav list-unstyled small">
          <li class="nav-link">
            <router-link :to="{ name: 'monitoring.employee' }">My DTR</router-link>
          </li>
          <li class="nav-link"><router-link :to="{ name: 'recordpersonal.show' }">My Information</router-link></li>
          <li class="nav-link"><router-link :to="{ name: 'pdsmydata.show' }">My PDS</router-link></li>

      </ul>
    </div>    
  </li>

<li>
   <a href="#" class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#generate-reportcollapse" aria-expanded="false"><i class="fa-solid fa-users-gear"></i>Generate Report <i class="cvright fa-solid fa-angle-right"></i>
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
    <a href="#" class="nav-link btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#setting-collapse" aria-expanded="false"><i class="fa-solid fa-gear"></i> Settings <i class="cvright fa-solid fa-angle-right"></i>
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
        </li>
      </ul>
    </div>
</li>



</template>