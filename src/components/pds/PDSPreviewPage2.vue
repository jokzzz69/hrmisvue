\<template>	 
    <table border="0" cellpadding="0" cellspacing="0" width="810" style='border-collapse: collapse;table-layout:fixed;width:609pt'>
          <tr class="bbase bggd bt1 br1 bl1 bb1">
            <td style="width:12px">&nbsp;</td><!--a-->
            <td style="width:45px">&nbsp;</td><!--b-->
            <td style="width:65px">&nbsp;</td><!--c-->
            <td style="width:40px">&nbsp;</td><!--d-->
            <td style="width:70px">&nbsp;</td><!--e-->
            <td style="width:80px">&nbsp;</td><!--f-->
            <td style="width:40px">&nbsp;</td><!--g-->
            <td style="width:40px">&nbsp;</td><!--h-->
            <td style="width:110px">&nbsp;</td><!--i-->
            <td style="width:52px">&nbsp;</td><!--j-->
            <td style="width:63px">&nbsp;</td><!--k-->
            <td style="width:70px">&nbsp;</td><!--l-->
            <td style="width:52px">&nbsp;</td><!--m-->
          </tr>
          <tr>
            <td colspan="13" class="t700 bggd it pl5 fmp bt2 bb1 bl1 br1 txtw">
              IV. CIVIL SERVICE ELIGIBILITY
            </td>
          </tr>
          <tr>
            <td height="20" class="bl1 fa8 fmp bgg pl5 vtop" rowspan="2">27.</td>
            <td colspan="4" rowspan="2" class="bgg fa8 ws f8 fmp vmid tc">CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER SPECIAL LAWS/ CES/ CSEE BARANGAY ELIGIBILITY / DRIVER'S LICENSE</td>
            <td rowspan="2"  class="bgg fa8 ws f8 fmp vmid tc bl5">RATING<br>
            (If Applicable)</td>
            <td colspan="2" rowspan="2" class="bgg fa8 ws f8 fmp vmid tc bl5">DATE OF EXAMINATION / CONFERMENT</td>
            <td colspan="3" rowspan="2" class="bgg fa8 ws f8 fmp vmid tc bl5 br5">PLACE OF EXAMINATION / CONFERMENT</td>
            <td colspan="2" class="bgg fa8 ws f8 fmp vmid tc bl5 br1 bb5">LICENSE (if applicable)</td>
          </tr>
          <tr height="34">
            <td class="bgg fa8 ws f8 fmp vmid tc bl5 br5">NUMBER</td>
            <td class="bgg fa8 ws f8 fmp vmid tc bl5 br1">Date of<br>
            Validity</td>
          </tr>
          <template v-for="(x,y) in 7">            
            <template v-if="officerecord.pdscsc">
                <tr height="29" style='height:21.95pt'>
                    <td colspan="5" height="29" class="tc f7 ws fmp bl1 br5 bt5 bb5">
                        <template v-if="y == 0">
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_licensename">
                                {{officerecord.pdscsc[y].csc_licensename}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                  
                          </template>
                          <template v-else>
                            N/A
                          </template>
                        </template>
                        <template v-else>
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_licensename">
                                {{officerecord.pdscsc[y].csc_licensename}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                       
                          </template>
                        </template>
                    </td>
                    <td width="90" class="tc fmp f7 bl5 br5 bt5 bb5">
                        <template v-if="y == 0">
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_rating">
                                {{officerecord.pdscsc[y].csc_rating}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                    
                          </template>
                          <template v-else>
                            N/A
                          </template>
                        </template>
                        <template v-else>
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_rating">
                                {{officerecord.pdscsc[y].csc_rating}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                        
                          </template>
                        </template>
                        
                    </td>
                    <td colspan="2" class="tc f7  fmp bl5 br5 bt5 bb5">

                        <template v-if="y == 0">
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">                   
                              <template v-if="officerecord.pdscsc[y].csc_dateofexamination">
                                {{moment(officerecord.pdscsc[y].csc_dateofexamination).format('MM/DD/YYYY')}}
                              </template>
                              <template v-else>
                                N/A
                              </template>               
                          </template>
                          <template v-else>
                              N/A
                          </template>
                        </template>
                        <template v-else>
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_dateofexamination">
                                {{moment(officerecord.pdscsc[y].csc_dateofexamination).format('MM/DD/YYYY')}}
                              </template>      
                              <template v-else>
                                N/A
                              </template>              
                          </template>
                        </template>


                        
                    </td>
                    <td colspan="3" class="tc f7  fmp bl5 br5 bt5 bb5">

                        <template v-if="y == 0">
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_placeofexamination">
                                {{officerecord.pdscsc[y].csc_placeofexamination}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                  
                          </template>
                          <template v-else>
                            N/A
                          </template>

                        </template>
                        <template v-else>
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_placeofexamination">
                                {{officerecord.pdscsc[y].csc_placeofexamination}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                  
                          </template>
                        </template>

                    </td>
                    <td width="71" class="tc f7 fmp bl5 br5 bt5 bb5">
                        <template v-if="y == 0">
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">    
                              <template v-if="officerecord.pdscsc[y].csc_licensenumber">
                                {{officerecord.pdscsc[y].csc_licensenumber}}
                              </template>
                              <template v-else>
                                N/A
                              </template>               
                          </template>
                          <template v-else>
                              N/A
                          </template>
                        </template>
                        <template v-else>
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_licensenumber">
                                {{officerecord.pdscsc[y].csc_licensenumber}}
                              </template>
                              <template v-else>
                                N/A
                              </template>                      
                          </template>
                        </template>
                        
                    </td>
                    <td width="56" class="tc f7 fmp bl5 br1 bt5 bb5">
                        <template v-if="y == 0">
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                              <template v-if="officerecord.pdscsc[y].csc_dateofvalidity">
                                {{moment(officerecord.pdscsc[y].csc_dateofvalidity).format('MM/DD/YYYY')}}                             
                              </template>  
                              <template v-else>
                                N/A
                              </template>                 
                          </template>
                          <template v-else>
                              N/A
                          </template>
                        </template>
                        <template v-else>
                          <template v-if="officerecord.pdscsc.hasOwnProperty(y)">
                            <template v-if="officerecord.pdscsc[y].csc_dateofvalidity">
                              {{moment(officerecord.pdscsc[y].csc_dateofvalidity).format('MM/DD/YYYY')}}
                            </template>     
                            <template v-else>
                                N/A
                              </template>               
                        </template>
                        </template>


                        
                    </td>
                  </tr>
            </template> 
            <template v-else>
                <tr height="29" style='height:21.95pt'>
                    <td colspan="5" height="29" class="tc f7 fmp bl1 br5 bt5 bb5">&nbsp;</td>
                    <td width="90" class="tc f7 fmp bl5 br5 bt5 bb5">&nbsp;</td>
                    <td colspan="2" class="tc f7 fmp bl5 br5 bt5 bb5">&nbsp;</td>
                    <td colspan="3" class="tc f7 fmp bl5 br5 bt5 bb5">&nbsp;</td>
                    <td width="71" class="tc f7 fmp bl5 br5 bt5 bb5">&nbsp;</td>
                    <td width="56" class="tc f7 fmp bl5 br1 bt5 bb5">&nbsp;</td>
                  </tr>
            </template>            
          </template>
          

          
          
          <tr>
            <td colspan="13" class="bgg bt1 bb1 bl1 br1 tc fmp it f8 t700" style='color:#ff0000'>(Continue on separate sheet if necessary)</td>
          </tr>
          <tr>
            <td colspan="13" class="bggd t700 fmp it bl1 br1 txtw">V. WORK EXPERIENCE</td>
          </tr>
          <tr>
            <td class="bggd t700 fmp it bl1 br1 txtw fa8 bb1" colspan="13">(Include private employment. Start from your recent work) Description of duties should be indicated in the attached Work Experience sheet.</td>
          </tr>
          <tr>
            <td height="24" class="bl1 fa8 fmp bgg pl5 vmid">28.</td>
            <td colspan="2" rowspan="2" class="bgg fa8 ws fa8 fmp vmid tc bb5">INCLUSIVE DATES (mm/dd/yyyy)</td>
            <td colspan="3" rowspan="3" width="208" class="bgg fa8 ws f8 fmp vmid tc bb5 bl5 bt1">POSITION TITLE<br/>(Write in full/Do not abbreviate)</td>
            <td colspan="3" rowspan="3" width="210" class="bgg fa8 ws f8 fmp vmid tc bb5 bl5 bt1">DEPARTMENT / AGENCY / OFFICE / COMPANY <br/>(Write in full/Do not abbreviate)</td>
            <td rowspan="3" class="bgg fa8 ws fa8 fmp vmid tc bb5 bl5 bt1" width="43">MONTHLY SALARY</td>
            <td rowspan="3" class="bgg fa8 ws f6 fmp vmid tc bb5 bl5 bt1" width="57">SALARY/ JOB/ PAY GRADE (if applicable)& STEP (Format "00-0")/ INCREMENT</td>
            <td rowspan="3" class="bgg fa8 ws fa8 fmp vmid tc bb5 bl5 bt1" width="71">STATUS OF APPOINTMENT</td>
            <td rowspan="3" class="bgg fa8 ws fa8 fmp vmid tc bb5 bl5 br1 bt1" width="56">GOV'T SERVICE (Y/ N)</td>
          </tr>
          <tr>
            <td class="bgg bl1 fa8">&nbsp;</td>
          </tr>
          <tr style='height:18.75pt'>
            <td colspan="2" class="bl1 bt5 bb5 br5 fa8 bgg tc">From</td>
            <td class="bl5 bt5 bb5 br5 fa8 bgg tc">To</td>
          </tr>
          <template v-for="(x,y) in 28">
            <template v-if="officerecord.pdsworkexperience">
              <tr class="h40">
                <td colspan="2" class="tc f7 ws fmp bl1 br5 bb5 bgw">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_from">
                        {{moment(officerecord.pdsworkexperience[y].workexp_from,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </template>
                    <template v-else>
                      N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_from">
                        {{moment(officerecord.pdsworkexperience[y].workexp_from,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                      </template>
                      <template v-else>
                        N/A
                      </template>
                  </template>
                  </template>                  
                </td>

                <td class="tc f7 fmp bl5 br5 bgw bb5" width="63">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_to">                     

                        <template v-if="officerecord.pdsworkexperience[y].workexp_to.toLowerCase().includes('present')">
                            {{officerecord.pdsworkexperience[y].workexp_to}}
                        </template>
                        <template v-else>
                          {{moment(officerecord.pdsworkexperience[y].workexp_to,'MM/DD/YYYY').format('MM/DD/Y')}}
                        </template>

                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </template>
                    <template v-else>
                        N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_to">
                        <template v-if="officerecord.pdsworkexperience[y].workexp_to.toLowerCase().includes('present')">
                            {{officerecord.pdsworkexperience[y].workexp_to}}
                        </template>
                        <template v-else>
                          {{moment(officerecord.pdsworkexperience[y].workexp_to,'MM/DD/YYYY').format('MM/DD/Y')}}
                        </template>
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </template>
                  </template>

                  
                </td>
                <td colspan="3" class="tc f7 ws fmp bl5 br5 bgw bb5" width="208">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">                      
                      <template v-if="officerecord.pdsworkexperience[y].workexp_positiontitle">
                        {{officerecord.pdsworkexperience[y].workexp_positiontitle}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                    <template v-else>
                        N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_positiontitle">
                        {{officerecord.pdsworkexperience[y].workexp_positiontitle}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                  </template>

                  
                </td>
                <td colspan="3" class="tc f7 ws fmp bl5 br5 bgw bb5" width="210">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      
                      <template v-if="officerecord.pdsworkexperience[y].workexp_agency">
                        {{officerecord.pdsworkexperience[y].workexp_agency}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                    <template v-else>
                        N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                    <template v-if="officerecord.pdsworkexperience[y].workexp_agency">
                        {{officerecord.pdsworkexperience[y].workexp_agency}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                  </template>
                  </template>
                  
                </td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="43">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_monthlysalary">
                        {{formatPrice(officerecord.pdsworkexperience[y].workexp_monthlysalary)}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                      
                    </template>
                    <template v-else>
                        N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                    <template v-if="officerecord.pdsworkexperience[y].workexp_monthlysalary">
                        {{formatPrice(officerecord.pdsworkexperience[y].workexp_monthlysalary)}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                  </template>
                  </template>

                  
                </td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="57">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_salarygrade">
                        {{officerecord.pdsworkexperience[y].workexp_salarygrade}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                    <template v-else>
                      N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_salarygrade">
                        {{officerecord.pdsworkexperience[y].workexp_salarygrade}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                  </template>
                  
                </td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="71">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_statusofappointment">
                        {{officerecord.pdsworkexperience[y].workexp_statusofappointment}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                    <template v-else>
                      N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_statusofappointment">
                        {{officerecord.pdsworkexperience[y].workexp_statusofappointment}}
                      </template>
                      <template v-else>
                          N/A
                      </template>
                    </template>
                  </template>
                  
                </td>
                <td class="tc f7 fmp bl5 br1 bgw bb5" width="56">
                  <template v-if="y == 0">
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_governmentservice == 1">
                        Yes
                      </template>
                      <template v-else-if="officerecord.pdsworkexperience[y].workexp_governmentservice == 2">
                        No
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </template>
                    <template v-else>
                      N/A
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="officerecord.pdsworkexperience.hasOwnProperty(y)">
                      <template v-if="officerecord.pdsworkexperience[y].workexp_governmentservice == 1">
                        Yes
                      </template>
                      <template v-else-if="officerecord.pdsworkexperience[y].workexp_governmentservice == 2">
                        No
                      </template>
                      <template v-else>
                        N/A
                      </template>
                    </template>
                  </template>
                  
                </td>
              </tr>
            </template>
            <template v-else>
              <tr class="h40">
                <td colspan="2" class="tc f7 fmp bl1 br5 bb5 bgw">&nbsp;</td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="63">&nbsp;</td>
                <td colspan="3" class="tc f7 fmp bl5 br5 bgw bb5" width="208">&nbsp;</td>
                <td colspan="3" class="tc f7 fmp bl5 br5 bgw bb5" width="210">&nbsp;</td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="43">&nbsp;</td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="57">&nbsp;</td>
                <td class="tc f7 fmp bl5 br5 bgw bb5" width="71">&nbsp;</td>
                <td class="tc f7 fmp bl5 br1 bgw bb5" width="56">&nbsp;</td>
              </tr>
            </template>
          </template>
          
          
          

          <tr class="h10">
            <td colspan="13" height="13" class="br1 bl1 bgg bt1 bb1 tc it fmp f7" style="color: #ff0000;">(Continue on separate sheet if necessary)</td>
          </tr>
          <tr class="h40">
            <td colspan="3" height="30" class="t700 it fmp bgg tc br1 bb1 bt1 bl1" width="125">SIGNATURE</td>
            <td colspan="5" class="bgw tc t700 bt1 bb1 br1 bl1 fmp">&nbsp;</td>
            <td class="tc t700 bt1 bb1 br1 bl1 fmp bgg it">DATE</td>
            <td class="br1 bb1 bt1 bl1 tc t700 fmp" colspan="4">&nbsp;</td>
   
          </tr>
          <tr height="12" style='height:9.0pt'>
            <td colspan="13" height="12" class="fma tr fmp it f8">CS FORM 212 (Revised 2017), Page 2 of 4</td>
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
        return{
            errors,
            officerecord,
            moment,
            formatPrice
        }
    }
}


</script>