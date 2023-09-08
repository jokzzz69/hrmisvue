<template>
  @can('isHeadOffice')
<li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#empmon-collapse" aria-expanded="true">
      <i class="fa-solid fa-computer pe-1"></i>DTR Monitoring <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn" id="empmon-collapse" >
      <ul class="btn-toggle-nav list-unstyled small">  
        
        <li class="nav-link"><router-link :to="{ name: 'monitoringofficehead.index' }"><i class="fa-solid fa-users-rectangle"></i> Employees DTR</router-link></li>       
      </ul>
    </div>
</li>
@endcan
<li>
    <a href="#" class="nav-link btn-toggle align-items-center collapsed"  data-bs-toggle="collapse" data-bs-target="#emprec-collapse" aria-expanded="true">
      <i class="fa-regular fa-id-badge pe-1"></i>Personal Record <i class="cvright fa-solid fa-angle-right"></i>
    </a>
    <div  class="collapse navdrpdwn show" id="emprec-collapse" >
      <ul class="btn-toggle-nav list-unstyled small">           
                      
        <li class="nav-link">
            @can('isHeadOffice')
            <router-link :to="{ name: 'monitoring.employee' }"><i class="fa-solid fa-fingerprint"></i> My Daily Time Record</router-link>
            @endcan
            @can('isEmployee')
            <router-link :to="{ name: 'monitoring.employee' }"><i class="fa-solid fa-fingerprint"></i> Daily Time Record</router-link>
            @endcan


        </li>
        <li class="nav-link"><router-link :to="{ name: 'recordpersonal.show' }"><i class="fa-solid fa-address-card"></i> Personal Information</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'pdsmydata.show' }"><i class="fa-solid fa-user-pen"></i> Personal Data Sheet</router-link></li>
        <li class="nav-link"><router-link :to="{ name: 'travels.index' }"><i class="fa-solid fa-car-side"></i> Travels</router-link></li>
        
        @if(Auth::user()->employee_id == 125)
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Office ID</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Payslip</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Contract</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> Leave Form</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> IPCR</a></li>
          <li class="nav-link"><a href="#" class="text-danger"><i class="fa-regular fa-pen-to-square"></i> COE</a></li>                  
        @endif                

      </ul>
    </div>
</li>
@if(Auth::user()->employee_id == 125)
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
@endif

</template>