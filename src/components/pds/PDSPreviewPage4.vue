<template>	 
    <table border="0" cellpadding="0" cellspacing="0" width="810" style='border-collapse: collapse;table-layout:fixed;'>
  <col width="18"> <!--a-->
  <col width="18"> <!--b-->
  <col width="95"> <!--c-->
  <col width="174"> <!--d-->
  <col width="20"> <!--e-->
  <col width="195"> <!--f-->
  <col width="25"> <!--g-->
  <col width="41"> <!--h-->
  <col width="20"> <!--i-->
  <col width="20"> <!--j-->
  <col width="55"> <!--k-->
  <col width="113"> <!--l-->
  <col width="15"> <!--m-->


  <tr>
    <td colspan="13" class="bggd br1 bt1 bl1 bb1">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2" class="bl1 fa8  bl1 bgg pl5">34.</td>
    <td colspan="4" class="bgg fmp br1">Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be apppointed,</td>
    <td class="br1 bg1 bgw" colspan="7">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="2" class="bgg bl1">&nbsp;</td>
    <td colspan="4" class="bgg fmp br5">a. within the third degree?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
            <template v-if="officerecord.pdslastinformation.li_affinity_thirddegree==1">
              <input type="checkbox" disabled value="1" checked id="li_affinity_thirddegree"/>
              <label for="li_affinity_thirddegree">Yes</label>
            </template>
            <template v-else>
              <input type="checkbox" disabled value="1" id="li_affinity_thirddegree_nchk"/>
              <label for="li_affinity_thirddegree_nchk">Yes</label>
            </template>
        </template>
    </td>
    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_affinity_thirddegree==0">
            <input type="checkbox" disabled value="1" checked id="page4chk1"/>
            <label for="page4chk1">No</label>
        </template>
        <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk1"/>
            <label for="page4nochk1">No</label>
        </template>
            
            
        </template>
    </td>    
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw bl5 br1" colspan="7">&nbsp;</td>    
  </tr>

  <tr>
    <td colspan="2" class="bgg bl1">&nbsp;</td>
    <td colspan="4" class="bgg fmp br5">b. within the fourth degree (for Local Government Unit - Career Employees)?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
            <template v-if="officerecord.pdslastinformation.li_affinity_fourthdegree==1">
              <input type="checkbox" disabled value="1" checked id="page4chk2"/>
              <label for="page4chk2">Yes</label>
            </template>
            <template v-else>
              <input type="checkbox" disabled value="1" id="page4nochk2"/>
              <label for="page4nochk2">Yes</label>
            </template>
            

            
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">
        <template v-if="officerecord.pdslastinformation.li_affinity_fourthdegree==0">
          <input type="checkbox" disabled value="1" checked id="page4chk3"/>
          <label for="page4chk3">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk3"/>
          <label for="page4nochk3">No</label>
        </template>
            
            
        </template>
    </td>    

  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw">&nbsp;</td>
    <td colspan="5" class="bgw bb5 fmp">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_affinity_fourthdegree_details}}
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw bl5 br1" colspan="7">&nbsp;</td>    
  </tr>
   <tr>
    <td colspan="2" class="fmp bl1 bgg fa8 pl5 bt5">35.</td>
    <td colspan="4" class="bgg  br5 fmp bt5">a. Have you ever been found guilty of any administrative offense?</td>
    <td class="bgw bt5">&nbsp;</td>
    <td class="bgw bt5" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
            <template v-if="officerecord.pdslastinformation.li_adminoffense==1">
              <input type="checkbox" disabled value="1" checked id="page4chk4"/>
              <label for="page4chk4">Yes</label>
            </template>
            <template v-else>
              <input type="checkbox" disabled value="1" id="page4nochk4"/>
              <label for="page4nochk4">Yes</label>
            </template>

            
        </template>
    </td>

    <td colspan="3" class=" bt5 bgw br1">
      <template v-if="officerecord.pdslastinformation">               
        <template v-if="officerecord.pdslastinformation.li_adminoffense==0">
          <input type="checkbox" disabled value="1" checked id="page4chk5" />
          <label for="page4chk5">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk5"/>
          <label for="page4nochk5">No</label>
        </template>
      </template>
    </td>  
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw">&nbsp;</td>
    <td colspan="5" class="bgw bb5 fmp">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_adminoffense_details}}
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10"></td>
  </tr>



<tr>
    <td colspan="2" class="fmp bl1 bgg fa8 pl5"></td>
    <td colspan="4" class="bgg  br5 fmp">b. Have you been criminally charged before any court?</td>
    <td class="bgw bt5">&nbsp;</td>
    <td class="bgw bt5" colspan="3">
        <template v-if="officerecord.pdslastinformation">  
          <template v-if="officerecord.pdslastinformation.li_courtcharged==1">
            <input type="checkbox" disabled value="1" checked id="page4chk6"/>
            <label for="page4chk6">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk6"/>
            <label for="page4nochk6">Yes</label>
          </template>
        </template>
    </td>
    <td colspan="3" class=" bt5 bgw br1">
      <template v-if="officerecord.pdslastinformation">   
          <template v-if="officerecord.pdslastinformation.li_courtcharged==0">
            <input type="checkbox" disabled value="1" checked id="page4chk7"/>
            <label for="page4chk7">No</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk7"/>
            <label for="page4nochk7">No</label>
          </template>
        </template>
        
    </td>  
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_courtcharged_details}}
      </template>
    </td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="3" class="bgw f9 fmp text-end">
      Date Filed:       
    </td>
    <td colspan="3" class="bgw bb5 fmp pl5 f9">
      <template v-if="officerecord.pdslastinformation"> 
        <template v-if="officerecord.pdslastinformation.li_courtcharged_date">
          {{moment(officerecord.pdslastinformation.li_courtcharged_date).format('MMMM D, Y')}}
        </template>
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="3" class="bgw  f9 fmp text-end">
      Status of Case/s:    
    </td>
    <td colspan="3" class="bgw bb5 fmp f9 pl5">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_courtcharged_status}}
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10 bb5"></td>
  </tr>
  <tr>
    <td class="fmp bl1 bgg fmp fa8 pl5 bt5" colspan="2">36.</td>
    <td colspan="4" class="fmp bgg bt5 br5">Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
          <template v-if="officerecord.pdslastinformation.li_crime==1">
            <input type="checkbox" disabled value="1" checked id="page4chk8"/>
            <label for="page4chk8">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk8"/>
            <label for="page4nochk8">Yes</label>
          </template>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_crime==0">
          <input type="checkbox" disabled value="1" checked id="page4chk9"/>
          <label for="page4chk9">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk9"/>
          <label for="page4nochk9">No</label>
        </template>
      </template>
    </td> 
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw">&nbsp;</td>
    <td colspan="5" class="bgw bb5 fmp">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_crime_details}}
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 bb5 fmp pl8 fa8 f10"></td>
  </tr>
  <tr>
    <td colspan="2" class="fmp bl1 bgg fmp fa8 pl5 bt5">37.</td>
    <td colspan="4" class="fmp bgg bt5 br5">Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">
          <template v-if="officerecord.pdslastinformation.li_resignation==1">
            <input type="checkbox" disabled value="1" checked id="page4chk9"/>
            <label for="page4chk9">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk9"/>
            <label for="page4nochk9">Yes</label>
          </template>            
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_resignation==0">
          <input type="checkbox" disabled value="1" checked id="page4chk10"/>
          <label for="page4chk10">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk10"/>
          <label for="page4nochk10">No</label>
        </template>           
      </template>
    </td> 
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw">&nbsp;</td>
    <td colspan="5" class="bgw bb5 fmp">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_resignation_details}}
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 bb5 fmp pl8 fa8 f10"></td>
  </tr>
  <tr>
    <td colspan="2" class="fmp bl1 bgg fmp fa8 pl5 bt5" rowspan="2">38. </td>
    <td colspan="4" class="fmp bgg bt5 br5" rowspan="2">a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
          <template v-if="officerecord.pdslastinformation.li_election==1">
            <input type="checkbox" disabled value="1" checked id="page4chk11"/>
            <label for="page4chk11">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk11"/>
            <label for="page4nochk11">Yes</label>
          </template>           
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_election==0">
          <input type="checkbox" disabled value="1" checked id="page4chk12"/>
          <label for="page4chk12">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk12"/>
          <label for="page4nochk12">No</label>
        </template>            
      </template>
    </td> 
  </tr>
  <tr>    
    <td colspan="3" class="bgw bl5 fmp fa8 f9 text-start pl5">If YES, give details:</td>
    <td colspan="3" class="bgw bb5 ps-3 fmp">
       <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_election_details}}
      </template>
    </td>
    <td class="bgw br1">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw">&nbsp;</td>
    <td colspan="5" class="bgw  fmp"></td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="2" class="fmp bl1 bgg fmp fa8 pl5" rowspan="2"></td>
    <td colspan="4" class="fmp bgg br5" rowspan="2">b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">
          <template v-if="officerecord.pdslastinformation.li_resignation_service==1">
            <input type="checkbox" disabled value="1" checked id="page4chk13"/>
            <label for="page4chk13">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk13"/>
            <label for="page4nochk13">Yes</label>
          </template>           
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_resignation_service==0">
          <input type="checkbox" disabled value="1" checked id="page4chk14"/>
          <label for="page4chk14">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk14"/>
          <label for="page4nochk14">No</label>
        </template>            
        </template>
    </td> 
  </tr>
  <tr>    
    <td colspan="3" class="bgw bl5 fmp fa8 f9 pl5 vab text-start pl5">If YES, give details:</td>
    <td colspan="3" class="bgw bb5 ps-3 fmp">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_resignation_service_details}}
      </template>
    </td>
    <td class="bgw br1">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 bb5 fmp pl8 fa8 f10"></td>
  </tr>
  <tr>
    <td colspan="2" class="fmp bl1 bgg fmp fa8 pl5 bt5">39.</td>
    <td colspan="4" class="fmp bgg bt5 br5">Have you acquired the status of an immigrant or permanent resident of another country?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">  
          <template v-if="officerecord.pdslastinformation.li_immigrant==1">
            <input type="checkbox" disabled value="1" checked id="page4chk15"/>
            <label for="page4chk15">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4noch15"/>
            <label for="page4noch15">Yes</label>
          </template>            
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_immigrant==0">
          <input type="checkbox" disabled value="1" checked id="page4chk16"/>
          <label for="page4chk16">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk16"/>
          <label for="page4nochk16">No</label>
        </template>
            
            
        </template>
    </td> 
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td class="bgw">&nbsp;</td>
    <td colspan="5" class="bgw bb5 fmp f9">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_immigrant_details}}
      </template>
    </td>
    <td class="br1 bgw">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 bb5 fmp pl8 fa8 f10"></td>
  </tr>

  <tr>
    <td colspan="2" rowspan="2" class="fmp bl1 bgg fmp fa8 pl5 bt5" >40.</td>
    <td colspan="4" rowspan="2" class="fmp bgg f10 ws bt5 br5">Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items: </td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw br1" colspan="6"></td> 
  </tr>
  <tr>
    <td colspan="6" class="bgw bl5 br1 fmp pl8 fa8 f10"></td>
  </tr>

  <tr>
    <td colspan="2" class="bgg bl1" rowspan="2"></td>
    <td colspan="4" class="bgg br5 fmp" rowspan="2">a. Are you a member of any indigenous group?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">
          <template v-if="officerecord.pdslastinformation.li_indigineous==1">
            <input type="checkbox" disabled value="1" checked id="page4chk17"/>
            <label for="page4chk17">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk17"/>
            <label for="page4nochk17">Yes</label>
          </template>           
        </template>
    </td>
    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">  
        <template v-if="officerecord.pdslastinformation.li_indigineous==0">
          <input type="checkbox" disabled value="1" checked id="page4chk18"/>
          <label for="page4chk18">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk18"/>
          <label for="page4nochk18">No</label>
        </template>
      </template>
    </td>
  </tr>
  <tr>    
    <td colspan="3" class="bgw bl5 fmp fa8 f9 pl5 vab text-start">If YES, please specify:</td>
    <td colspan="3" class="bgw bb5 pl8 vab fmp f10">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_indigineous_details}}
      </template>
    </td>
    <td class="bgw br1">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10"></td>
  </tr>

  <tr>
    <td colspan="2" class="bgg bl1" rowspan="2"></td>
    <td colspan="4" class="bgg br5 fmp" rowspan="2">b. Are you a person with disability?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
          <template v-if="officerecord.pdslastinformation.li_disability==1">
            <input type="checkbox" disabled value="1" checked id="page4chk19"/>
            <label for="page4chk19">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk19"/>
            <label for="page4nochk19">Yes</label>
          </template>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_disability==0">
          <input type="checkbox" disabled value="1" checked id="page4chk20"/>
          <label for="page4chk20">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk20"/>
          <label for="page4nochk20">No</label>
        </template>
            
        </template>
    </td>
  </tr>
  <tr>    
    <td colspan="4" class="bgw bl5 fmp fa8 f9 pl5 vab text-start">If YES, please specify ID no:</td>
    <td colspan="2" class="bgw bb5 pl8 vab fmp f10">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_disability_details}}
      </template>
    </td>
    <td class="bgw br1">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10"></td>
  </tr>



  <tr>
    <td colspan="2" class="bgg bl1" rowspan="2"></td>
    <td colspan="4" class="bgg br5 fmp" rowspan="2">c. Are you a solo parent?</td>
    <td class="bgw">&nbsp;</td>
    <td class="bgw" colspan="3">
        <template v-if="officerecord.pdslastinformation">   
          <template v-if="officerecord.pdslastinformation.li_soloparent==1">
            <input type="checkbox" disabled value="1" checked id="page4chk21"/>
            <label for="page4chk21">Yes</label>
          </template>
          <template v-else>
            <input type="checkbox" disabled value="1" id="page4nochk21"/>
            <label for="page4nochk21">Yes</label>
          </template>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="officerecord.pdslastinformation">   
        <template v-if="officerecord.pdslastinformation.li_soloparent==0">
          <input type="checkbox" disabled value="1" checked id="page4chk22"/>
          <label for="page4chk22">No</label>
        </template>
        <template v-else>
          <input type="checkbox" disabled value="1" id="page4nochk22"/>
          <label for="page4nochk22">No</label>
        </template>           
      </template>
    </td>
  </tr>
  <tr>    
    <td colspan="4" class="bgw bl5 fmp fa8 f9 pl5 vab text-start">If YES, please specify ID no:</td>
    <td colspan="2" class="bgw bb5 pl8 vab fmp f10">
      <template v-if="officerecord.pdslastinformation"> 
        {{officerecord.pdslastinformation.li_soloparent_details}}
      </template>
    </td>
    <td class="bgw br1">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 bb5 fmp pl8 fa8 f10"></td>
  </tr>

  <tr>
    <td class="bgg bl1 tc fmp fa7 bt5 bb5"></td>
    <td class="bgg fmp f10 bt5 bb5 br5" colspan="8">41. REFERENCES <span style="color: #ff0000;">(Person not related by consanguinity or affinity to applicant /appointee)</span></td>
    <td colspan="4" rowspan="7" class="bgw br1 vtop">
      <img :src="'/img/cscphoto.jpg'" class="cscimg">
    </td>
  </tr>
  <tr>
    <td colspan="5" class="bl5 bgg fmp f10 tc bb5">NAME</td>
    <td class="bl5 br5 tc fmp bgg bb5 fmp f10">ADDRESS</td>
    <td colspan="3" class="bl5 br5 tc fmp bgg bb5 fmp f10">TEL. NO.</td>
  </tr>
  <template v-for="(x,y) in 3" :key="x">             
      <tr>
        <template v-if="y==0">
          <td colspan="5" class="bl5 bgw fmp fa8 tc bb5">
            <template v-if="officerecord.pdslastinformationreferences">
              <template v-if="officerecord.pdslastinformationreferences.hasOwnProperty(y)">
                <template v-if="officerecord.pdslastinformationreferences[y].li_reference_name">
                  {{officerecord.pdslastinformationreferences[y].li_reference_name}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
              <template v-else>
                N/A
              </template>
            </template>    
          </td>
          <td  class="bl5 br5 tc fmp bgw bb5 fmp f10">
            <template v-if="officerecord.pdslastinformationreferences">
              <template v-if="officerecord.pdslastinformationreferences.hasOwnProperty(y)">
                <template v-if="officerecord.pdslastinformationreferences[y].li_reference_address">
                  {{officerecord.pdslastinformationreferences[y].li_reference_address}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
              <template v-else>
                N/A
              </template>
            </template>    
          </td>
          <td colspan="3" class="bl5 br5 tc fmp bgw bb5 fmp f10">
            <template v-if="officerecord.pdslastinformationreferences">
              <template v-if="officerecord.pdslastinformationreferences.hasOwnProperty(y)">  
                <template v-if="officerecord.pdslastinformationreferences[y].li_reference_telno">
                  {{officerecord.pdslastinformationreferences[y].li_reference_telno}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
              <template v-else>
                N/A
              </template>
            </template>
             &nbsp;
          </td>
        </template>
        <template v-else>
          <td colspan="5" class="bl5 bgw fmp fa8 tc bb5">
            <template v-if="officerecord.pdslastinformationreferences">
              <template v-if="officerecord.pdslastinformationreferences.hasOwnProperty(y)">
                <template v-if="officerecord.pdslastinformationreferences[y].li_reference_name">
                  {{officerecord.pdslastinformationreferences[y].li_reference_name}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
            </template>    
          </td>
          <td  class="bl5 br5 tc fmp bgw bb5 fmp f10">
            <template v-if="officerecord.pdslastinformationreferences">
              <template v-if="officerecord.pdslastinformationreferences.hasOwnProperty(y)">
                <template v-if="officerecord.pdslastinformationreferences[y].li_reference_address">
                  {{officerecord.pdslastinformationreferences[y].li_reference_address}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
            </template>    
          </td>
          <td colspan="3" class="bl5 br5 tc fmp bgw bb5 fmp f10">
            <template v-if="officerecord.pdslastinformationreferences">
              <template v-if="officerecord.pdslastinformationreferences.hasOwnProperty(y)">
                <template v-if="officerecord.pdslastinformationreferences[y].li_reference_telno">
                  {{officerecord.pdslastinformationreferences[y].li_reference_telno}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
            </template>
             &nbsp;
          </td>
        </template>
      </tr>
  </template>


  <tr>
    <td class="bgg bl1" rowspan="3"></td>
    <td colspan="8" rowspan="3" class="bgg fmp f10 ws br5">42. I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines. I authorize the agency head/authorized representative to verify/validate the contents stated herein. I agree that any misrepresentation made in this document and its attachments shall cause the filing of administrative/criminal case/s against me.</td>   
  </tr>
  <tr>
    <td class="bl5 br5" colspan="13">&nbsp;</td>
  </tr> 

  <tr>
    <td class="bgw bl5"></td>
    <td colspan="2" class="fa8 tc bgw" style="color:gray;">PHOTO</td>
    <td class="br1">&nbsp;</td>
  </tr>
  <tr>
    <td class="bgg bl5 br5" colspan="9"></td>
    <td colspan="4" class="bgw br1">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1 bgg bb5 br5" colspan="9">&nbsp;</td>
    <td class="br1">&nbsp;</td>
    <td colspan="2" rowspan="7" class="bl5 bt5 br5 bb5 bgw">&nbsp;</td>
    <td class="bgw br1" rowspan="7"></td>
  </tr>
  <tr>
    <td class="bgw bl1 br1" colspan="13">&nbsp;</td>
  </tr>
  <tr>
    <td class="bgw bl1">&nbsp;</td>
    <td class="bgg fmp ws fa8 bl5 bt5 br5 bb5" colspan="3">Government Issued ID <span class="f6">(i.e.Passport, GSIS, SSS, PRC, Driver's License, etc.)</span><br/><span class="it">PLEASE INDICATE ID Number and Date of Issuance</span></td>
    <td></td>
    <td colspan="4" rowspan="3" class="bl5 bt5 br5">&nbsp;</td>
    <td colspan="4" class="br1">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1 bgw f20">&nbsp;</td>
    <td colspan="2" class="bl5 fmp f9 bb5">Government Issued ID:<span></span></td>
    <td class="br5 bb5">
      <template v-if="officerecord.pdslastinformation"> 
        <template v-if="officerecord.pdslastinformation.li_govissuedid">
          {{officerecord.pdslastinformation.li_govissuedid}}
        </template>
        <template v-else>
          N/A
        </template>
      </template>
    </td>
  </tr>
  <tr>
    <td class="bl1 bgw fa7">&nbsp;</td>
    <td colspan="2" rowspan="2" class="bl5 fmp f9 bb5">ID/License/Passport No.:<span></span></td>
    <td class="br5 bb5" rowspan="2" >
      <template v-if="officerecord.pdslastinformation"> 
        <template v-if="officerecord.pdslastinformation.li_licenseno">
          {{officerecord.pdslastinformation.li_licenseno}}
        </template>
        <template v-else>
          N/A
        </template>
      </template>
    </td>
  </tr>

  <tr>
    <td class="bl5 fa7 bgw" colspan="5">&nbsp;</td>
    <td colspan="4" class="bgg fa8 fmp tc bl5 bt5 br5 bb5">Signature (Sign inside the box)</td>
    <td class="xl1511838"></td>
    <td class="xl10411838">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1">&nbsp;</td>
    <td colspan="2" rowspan="2" class="fmp f9 bl5 bb5">Date/Place of Issuance:</td>
    <td rowspan="2" class="fmp bb5 br5">
      <template v-if="officerecord.pdslastinformation"> 
        <template v-if="officerecord.pdslastinformation.li_placeordate">
          {{officerecord.pdslastinformation.li_placeordate}}
        </template>
        <template v-else>
          N/A
        </template>
      </template>
    </td>
    <td>&nbsp;</td>
    <td class="bl5 bt5 bb5 br5 fmp" colspan="4">&nbsp;</td>
    <td></td>
    <td class="bl5 br1">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1 br1 f6">&nbsp;</td>
    <td></td>
    <td colspan="4" class="bgg tc fa8 bl5 br5 bb5 fmp">Date Accomplished</td>
    <td></td>
    <td colspan="2" class="bgg fa8 fmp tc bl5 br5 bt5 bb5">Right Thumbmark</td>
    <td class="fa8 br5">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1 br1 bb1" colspan="13">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1 br1 f6" colspan="13">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="13" class="fmp f9 bgw bl1 br1 tc">SUBSCRIBED AND SWORN to before me this ______________________________, affiant exhibiting his/her validly issued government ID as indicated above.</td>
  </tr>
  <tr>
    <td class="bl1 br1 f6" colspan="13">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1" colspan="4">&nbsp;</td>
    <td colspan="5" class="bl5 bt5 br5">&nbsp;</td>
    <td class="br1" colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1" colspan="4">&nbsp;</td>
    <td colspan="5" class="bl5 br5">&nbsp;</td>
    <td class="br1" colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td class="bl1" colspan="4">&nbsp;</td>
    <td colspan="5" class="bl5 br5">&nbsp;</td>
    <td class="br1" colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="4" class="bl1"></td>
    <td colspan="5" class="bgg fmp tc f9 bl5 br5 bt5 bb5">Person Administering Oath</td>
    <td class="br1" colspan="4">&nbsp;</td>
  </tr> 
  <tr>
    <td colspan="13" class="tr bt1 fpa fa8 it">CS FORM 212 (Revised 2017),<span></span> Page 4 of 4</td>
  </tr>  
</table>
</template>

<script>

import useOfficerecord from '@/composables/composables-record';

import { onMounted, ref, inject, onUpdated, computed} from 'vue';
import moment from 'moment'

export default{

    props: {
        id: {
            required: true,
            type: String
        }
    },
    setup (props){
        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, officerecord, getPersonalRecord } = useOfficerecord()


        onMounted(() => {   
            getPersonalRecord(props.id)
        })

        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        const hobbies = computed(function(){
            if(officerecord.value.pdsotherinformation){
                return officerecord.value.pdsotherinformation.filter(
                    (or) => (or.oi_type && or.oi_type == 1)
                );
            }            
        });
        const recognitions = computed(function(){
            if(officerecord.value.pdsotherinformation){
                return officerecord.value.pdsotherinformation.filter(
                    (or) => (or.oi_type && or.oi_type == 2)
                );
            }            
        });
        const memberships = computed(function(){
            if(officerecord.value.pdsotherinformation){
                return officerecord.value.pdsotherinformation.filter(
                    (or) => (or.oi_type && or.oi_type == 3)
                );
            }            
        });

        return{
            errors,
            officerecord,

            moment,
            formatPrice,
            hobbies,
            recognitions,
            memberships
        }
    }
}


</script>