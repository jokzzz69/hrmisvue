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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="Married" v-if="archive.pds_archivelastinformation.li_affinity_thirddegree==1"/>
            <input type="checkbox" disabled value="1" id="Married" v-else/>
            <label for="Married">Yes</label>
        </template>
    </td>
    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="single" v-if="archive.pds_archivelastinformation.li_affinity_thirddegree==0"/>
            <input type="checkbox" disabled value="1" id="single" v-else/>
            <label for="single">No</label>
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="Married" v-if="archive.pds_archivelastinformation.li_affinity_fourthdegree==1"/>
            <input type="checkbox" disabled value="1" id="Married" v-else/>
            <label for="Married">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="single" v-if="archive.pds_archivelastinformation.li_affinity_fourthdegree==0"/>
            <input type="checkbox" disabled value="1" id="single" v-else/>
            <label for="single">No</label>
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
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_affinity_fourthdegree_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_adminoffense==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class=" bt5 bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_adminoffense==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
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
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_adminoffense_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_courtcharged==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>
    <td colspan="3" class=" bt5 bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_courtcharged==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
        </template>
    </td>  
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="7" class="bgw bl5 br1 fmp pl8 fa8 f10">If YES, give details:
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_courtcharged_details}}
      </template>
    </td>
  </tr>
  <tr>
    <td colspan="6" class="bgg bl1 br5">&nbsp;</td>
    <td colspan="3" class="bgw f9 fmp text-end">
      Date Filed:       
    </td>
    <td colspan="3" class="bgw bb5 fmp pl5 f9">
      <template v-if="archive.pds_archivelastinformation"> 
        <template v-if="archive.pds_archivelastinformation.li_courtcharged_date">
          {{moment(archive.pds_archivelastinformation.li_courtcharged_date).format('MMMM D, Y')}}
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
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_courtcharged_status}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_crime==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_crime==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
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
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_crime_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_resignation==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_resignation==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
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
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_resignation_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_election==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_election==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
        </template>
    </td> 
  </tr>
  <tr>    
    <td colspan="3" class="bgw bl5 fmp fa8 f9 text-start pl5">If YES, give details:</td>
    <td colspan="3" class="bgw bb5 ps-3 fmp">
       <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_election_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_resignation_service==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_resignation_service==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
        </template>
    </td> 
  </tr>
  <tr>    
    <td colspan="3" class="bgw bl5 fmp fa8 f9 pl5 vab text-start pl5">If YES, give details:</td>
    <td colspan="3" class="bgw bb5 ps-3 fmp">
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_resignation_service_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_immigrant==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_immigrant==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
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
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_immigrant_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_indigineous==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>
    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_indigineous==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
        </template>
    </td>
  </tr>
  <tr>    
    <td colspan="3" class="bgw bl5 fmp fa8 f9 pl5 vab text-start">If YES, please specify:</td>
    <td colspan="3" class="bgw bb5 pl8 vab fmp f10">
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_indigineous_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_disability==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_disability==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
        </template>
    </td>
  </tr>
  <tr>    
    <td colspan="4" class="bgw bl5 fmp fa8 f9 pl5 vab text-start">If YES, please specify ID no:</td>
    <td colspan="2" class="bgw bb5 pl8 vab fmp f10">
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_disability_details}}
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
        <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="yes" v-if="archive.pds_archivelastinformation.li_soloparent==1"/>
            <input type="checkbox" disabled value="1" id="yes" v-else/>
            <label for="yes">Yes</label>
        </template>
    </td>

    <td colspan="3" class="bgw br1">
      <template v-if="archive.pds_archivelastinformation">   
            <input type="checkbox" disabled value="1" checked id="no" v-if="archive.pds_archivelastinformation.li_soloparent==0"/>
            <input type="checkbox" disabled value="1" id="no" v-else/>
            <label for="no">No</label>
        </template>
    </td>
  </tr>
  <tr>    
    <td colspan="4" class="bgw bl5 fmp fa8 f9 pl5 vab text-start">If YES, please specify ID no:</td>
    <td colspan="2" class="bgw bb5 pl8 vab fmp f10">
      <template v-if="archive.pds_archivelastinformation"> 
        {{archive.pds_archivelastinformation.li_soloparent_details}}
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
            <template v-if="archive.pds_archivelastinformationreferences">
              <template v-if="archive.pds_archivelastinformationreferences.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelastinformationreferences[y].li_reference_name">
                  {{archive.pds_archivelastinformationreferences[y].li_reference_name}}
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
            <template v-if="archive.pds_archivelastinformationreferences">
              <template v-if="archive.pds_archivelastinformationreferences.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelastinformationreferences[y].li_reference_address">
                  {{archive.pds_archivelastinformationreferences[y].li_reference_address}}
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
            <template v-if="archive.pds_archivelastinformationreferences">
              <template v-if="archive.pds_archivelastinformationreferences.hasOwnProperty(y)">  
                <template v-if="archive.pds_archivelastinformationreferences[y].li_reference_telno">
                  {{archive.pds_archivelastinformationreferences[y].li_reference_telno}}
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
            <template v-if="archive.pds_archivelastinformationreferences">
              <template v-if="archive.pds_archivelastinformationreferences.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelastinformationreferences[y].li_reference_name">
                  {{archive.pds_archivelastinformationreferences[y].li_reference_name}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
            </template>    
          </td>
          <td  class="bl5 br5 tc fmp bgw bb5 fmp f10">
            <template v-if="archive.pds_archivelastinformationreferences">
              <template v-if="archive.pds_archivelastinformationreferences.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelastinformationreferences[y].li_reference_address">
                  {{archive.pds_archivelastinformationreferences[y].li_reference_address}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
            </template>    
          </td>
          <td colspan="3" class="bl5 br5 tc fmp bgw bb5 fmp f10">
            <template v-if="archive.pds_archivelastinformationreferences">
              <template v-if="archive.pds_archivelastinformationreferences.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelastinformationreferences[y].li_reference_telno">
                  {{archive.pds_archivelastinformationreferences[y].li_reference_telno}}
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
      <template v-if="archive.pds_archivelastinformation"> 
        <template v-if="archive.pds_archivelastinformation.li_govissuedid">
          {{archive.pds_archivelastinformation.li_govissuedid}}
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
      <template v-if="archive.pds_archivelastinformation"> 
        <template v-if="archive.pds_archivelastinformation.li_licenseno">
          {{archive.pds_archivelastinformation.li_licenseno}}
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
      <template v-if="archive.pds_archivelastinformation"> 
        <template v-if="archive.pds_archivelastinformation.li_placeordate">
          {{archive.pds_archivelastinformation.li_placeordate}}
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

import useArchive from '@/composables/composables-archive';

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

        const {archive, getArchivePDS } = useArchive()


        onMounted(() => {   
            getArchivePDS(props.id)
        })

        const formatPrice = (value) =>  {
            let val = (value/1).toFixed(2);
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        const hobbies = computed(function(){
            if(archive.value.pds_archiveotherinformation){
                return archive.value.pds_archiveotherinformation.filter(
                    (or) => (or.oi_type && or.oi_type == 1)
                );
            }            
        });
        const recognitions = computed(function(){
            if(archive.value.pds_archiveotherinformation){
                return archive.value.pds_archiveotherinformation.filter(
                    (or) => (or.oi_type && or.oi_type == 2)
                );
            }            
        });
        const memberships = computed(function(){
            if(archive.value.pds_archiveotherinformation){
                return archive.value.pds_archiveotherinformation.filter(
                    (or) => (or.oi_type && or.oi_type == 3)
                );
            }            
        });

        return{
            archive,
            moment,
            formatPrice,
            hobbies,
            recognitions,
            memberships
        }
    }
}


</script>