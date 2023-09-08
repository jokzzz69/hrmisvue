<template>	 
    <table border="0" cellpadding="0" cellspacing="0" width="810" class="f10 fpa wsn fn npa txtcw t400 vmid txtdn" style="border-collapse: collapse; table-layout: fixed; width: 609pt">
      <tr class="bbase bt1 bl1 br1 bb1 bggd">
        <td style="width: 13px">&nbsp;</td><!--a-->
        <td style="width: 175px">&nbsp;</td><!--b-->
        <td style="width: 50px">&nbsp;</td><!--c-->
        <td style="width: 80px">&nbsp;</td><!--d-->
        <td style="width: 60px">&nbsp;</td><!--e-->
        <td style="width: 60px">&nbsp;</td><!--f-->
        <td style="width: 65px">&nbsp;</td><!--g-->
        <td style="width: 73px">&nbsp;</td><!--h-->
        <td style="width: 85px">&nbsp;</td><!--i-->
        <td style="width: 60px">&nbsp;</td><!--j-->
        <td style="width: 90px">&nbsp;</td><!--k-->
      </tr>
  <tr height="30" style='height:22.5pt'>
    <td colspan="11" height="30" class="bt1 bl1 br1 t700 it fmp bb5 bggd txtw pl5">
      VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S
    </td>
  </tr>
  <tr height="20" style='height:15.0pt'>
    <td rowspan="2" height="35" class="fmp fa8 bl1 bgg">29.</td>
    <td colspan="3" rowspan="2" class="tc bgg fmp fa8 vmid  br5">NAME & ADDRESS OF ORGANIZATION<br/>(Write in full)</td>
    <td colspan="2" rowspan="2" class="tc bgg fmp fa8 vmid bl5 br5 bb5">INCLUSIVE DATES<br/>(mm/dd/yyyy)</td>
    <td rowspan="3" class="tc fmp bgg fa8 vmid bl5 bb5 br5 f7 ws">NUMBER OF HOURS</td>
    <td colspan="4" rowspan="3" class="bgg tc bl5 bb5 br1 fmp fa8 vmid ws">POSITION / NATURE OF WORK</td>
  </tr>
  <tr height="15" style='height:11.25pt'>
    <td></td>
  </tr>
  <tr height="18" style='height:13.5pt'>
    <td height="18" class="bgg bl1 br5 bb5" colspan="4"></td>
    <td class="fmp fa8 bgg tc bb5 br5 brl5">From</td>
    <td class="fmp fa8 bgg tc bb5 br5 brl5">To</td>
  </tr>
  <template v-for="(x,y) in 7">
    <template v-if="archive.pds_archivevoluntarywork">
      <tr class="h40">
        <td colspan="4" class="bgw bl1 br5 fmp tc bb5 f7 l14">
          <template v-if="y == 0">
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">                       
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_organizationname">
                {{archive.pds_archivevoluntarywork[y].voluntary_organizationname}}   
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
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_organizationname">
                {{archive.pds_archivevoluntarywork[y].voluntary_organizationname}}   
              </template>      
              <template v-else>
                N/A
              </template>                      
            </template>
          </template>
 
        </td>
        <td class="bt5 bb5 bgw fmp tc f7 vmid br5">
          <template v-if="y == 0">
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_from">
                <template v-if="archive.pds_archivevoluntarywork[y].voluntary_from.toLowerCase().includes('present')">
                    {{archive.pds_archivevoluntarywork[y].voluntary_from}}
                </template>
                <template v-else>
                  {{moment(archive.pds_archivevoluntarywork[y].voluntary_from,'MM/DD/YYYY').format('MM/DD/YYYY')}}
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
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_from">

                <template v-if="archive.pds_archivevoluntarywork[y].voluntary_from.toLowerCase().includes('present')">
                    {{archive.pds_archivevoluntarywork[y].voluntary_from}}
                </template>
                <template v-else>
                  {{moment(archive.pds_archivevoluntarywork[y].voluntary_from,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                </template>

                
              </template>  
              <template v-else>
                N/A
              </template>          
            </template>
          </template>
        </td>
        <td class="bt5 bb5 bgw fmp tc f7 vmid br5">
          <template v-if="y == 0">
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
            <template v-if="archive.pds_archivevoluntarywork[y].voluntary_to">

              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_to.toLowerCase().includes('present')">
                {{archive.pds_archivevoluntarywork[y].voluntary_to}}
              </template>
              <template v-else>
                {{moment(archive.pds_archivevoluntarywork[y].voluntary_to,'MM/DD/YYYY').format('MM/DD/YYYY')}}
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
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_to">
                <template v-if="archive.pds_archivevoluntarywork[y].voluntary_to.toLowerCase().includes('present')">
                  {{archive.pds_archivevoluntarywork[y].voluntary_to}}
                </template>
                <template v-else>
                  {{moment(archive.pds_archivevoluntarywork[y].voluntary_to,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                </template>
              </template> 
              <template v-else>
              N/A
            </template>           
            </template>
          </template>
          
        </td>
        <td  class="bt5 bb5 bgw fmp f7 tc br5">
          <template v-if="y == 0">
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">              
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_numberofhours">
                {{archive.pds_archivevoluntarywork[y].voluntary_numberofhours}} 
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
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_numberofhours">
                {{archive.pds_archivevoluntarywork[y].voluntary_numberofhours}} 
              </template>     
              <template v-else>
                N/A
              </template>                    
            </template>
          </template>
        </td>
        <td colspan="4"  class="bt5 bb5 bgw fmp tc f7 br1 l14">
          <template v-if="y == 0">
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_position">
                {{archive.pds_archivevoluntarywork[y].voluntary_position}} 
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
            <template v-if="archive.pds_archivevoluntarywork.hasOwnProperty(y)">
              <template v-if="archive.pds_archivevoluntarywork[y].voluntary_position">
                {{archive.pds_archivevoluntarywork[y].voluntary_position}} 
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
        <td colspan="4" class="bgw bl1 br5 fmp tc bb5 f7 l14">&nbsp;</td>
        <td class="bt5 bb5 bgw fmp tc f7 br5">&nbsp;</td>
        <td class="bt5 bb5 bgw fmp tc f7 br5">&nbsp;</td>
        <td  class="bt5 bb5 bgw fmp tc f7 br5">&nbsp;</td>
        <td colspan="4"  class="bt5 bb5 bgw fmp tc f7 br1 l14">&nbsp;</td>
      </tr>
    </template>
  </template>
    
  <tr class="h10">
    <td colspan="11" height="15" class="bgg tc bl1 bt1 bb1 br1 it fmp t700" style="color: #ff0000;">(Continue on separate sheet if necessary)</td>
  </tr>
  <tr>
    <td colspan="11" height="24" class="bggd br1 bt1 bl1 it pl5 txtw t700 fmp">VII.<span>&nbsp;</span> LEARNING AND DEVELOPMENT (L&amp;D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED</td>
  </tr>
  <tr height="21" style='height:15.75pt'>
    <td colspan="11" height="21" class="bggd bb1 br1 bl1 txtw it fmp t700 f8">(Start from the most recent L&amp;D/training program and include only the relevant L&amp;D/training taken for the last five (5) years for Division Chief/Executive/Managerial positions)</td>
  </tr>
  <tr height="17" style='height:12.75pt'>
    <td rowspan="3" height="34" class="vtop pt5 bgg bl1 fa8 fmp pl5">30.</td>
    <td colspan="3" rowspan="3" class="bgg tc fmp ws br5 bt5 fa8">TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS<br/>(Write in full)</td>
    <td colspan="2" rowspan="2" class="bgg tc fmp ws fa8 br5 bl5 bb5 vmid">INCLUSIVE DATES OF ATTENDANCE<br/>(mm/dd/yyyy)</td>
    <td rowspan="3" class="bgg bl5 br5 bt5 bb5 fmp fa8 ws tc">NUMBER OF HOURS</td>
    <td rowspan="3" class="bgg bl5 br5 bt5 bb5 fmp fa8 ws tc">Type of LD<br>( Managerial/ Supervisory/<br>
    Technical/etc)</td>
    <td colspan="3" rowspan="3" class="tc bgg fmp fa8 ws tc br1 bl5 bb5">CONDUCTED/ SPONSORED BY<br/>(Write in full)</td>
  </tr>
  <tr>
    <td></td>
  </tr>
  <tr>
    <td class="br5 bb5 bl5 fmp tc fa8 bgg">From</td>
    <td  class="br5 bb5 bl5 fmp tc fa8 bgg" >To</td>
  </tr>
  <template v-for="(x,y) in 17">
    <template v-if="archive.pds_archivelearninganddevelopment">
      <tr class="h40">
        <template v-if="y == 0">
          <td colspan="4" height="29" class="bgw tc ws bl1 br5 bt5 fmp l14">
              <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">            
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_program">
                  {{archive.pds_archivelearninganddevelopment[y].lnd_program}}
                </template>
                <template v-else>
                  N/A
                </template>
              </template>
              <template v-else>
                N/A
              </template>
          </td>
          <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
              <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_from">
                  <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_from.toLowerCase().includes('present')">
                    {{archive.pds_archivelearninganddevelopment[y].lnd_from}}
                  </template>
                  <template v-else>
                    {{moment(archive.pds_archivelearninganddevelopment[y].lnd_from,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                  </template>
                </template>
                <template v-else>
                  N/A
                </template>                                     
              </template>
              <template v-else>
              N/A
            </template>
          </td>

          <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
            <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">  

                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_to">
                  <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_to.toLowerCase().includes('present')">
                    {{archive.pds_archivelearninganddevelopment[y].lnd_to}}
                  </template>
                  <template v-else>
                    {{moment(archive.pds_archivelearninganddevelopment[y].lnd_to,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                  </template>
                </template>

                <template v-else>
                  N/A
                </template>                    
            </template>
            <template v-else>
              N/A
            </template>
          </td>
          <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
            <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_numberofhours">
                  {{archive.pds_archivelearninganddevelopment[y].lnd_numberofhours}}  
                </template>
                <template v-else>
                  N/A
                </template>  
            </template>
            <template v-else>
              N/A
            </template>
          </td>
          <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
            <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_type">
                  {{archive.pds_archivelearninganddevelopment[y].lnd_type}}  
                </template>
                <template v-else>
                  N/A
                </template>                      
            </template>
            <template v-else>
              N/A
            </template>
          </td>
          <td class="bl5 br1 bt5 bb5 fmp tc ws bgw l14" colspan="3">
            <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_sponsor">
                  {{archive.pds_archivelearninganddevelopment[y].lnd_sponsor}}  
                </template>
                <template v-else>
                  N/A
                </template>                            
            </template>
            <template v-else>
              N/A
            </template>
          </td>
        </template>
        <template v-else>
          <td colspan="4" height="29" class="bgw tc ws bl1 br5 bt5 fmp l14">
            <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
              <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_program">
                {{archive.pds_archivelearninganddevelopment[y].lnd_program}}
              </template>                       
              <template v-else>
                N/A
              </template>
            </template>
        </td>
        <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
            <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">          

              <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_from">
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_from.toLowerCase().includes('present')">
                  {{archive.pds_archivelearninganddevelopment[y].lnd_from}}
                </template>
                <template v-else>
                  {{moment(archive.pds_archivelearninganddevelopment[y].lnd_from,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                </template>
              </template>

              <template v-else>
                N/A
              </template>
            </template>
        </td>

        <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
          <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
              <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_to">
                <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_to.toLowerCase().includes('present')">
                  {{archive.pds_archivelearninganddevelopment[y].lnd_to}}
                </template>
                <template v-else>
                  {{moment(archive.pds_archivelearninganddevelopment[y].lnd_to,'MM/DD/YYYY').format('MM/DD/YYYY')}}
                </template>
              </template>                     
              <template v-else>
                N/A
              </template>
          </template>
        </td>
        <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
          <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
              <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_numberofhours">
                {{archive.pds_archivelearninganddevelopment[y].lnd_numberofhours}}
              </template>                       
              <template v-else>
                N/A
              </template>
          </template>
        </td>
        <td class="bl5 br5 bt5 bb5 fmp tc ws bgw">
          <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
              <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_type">
                {{archive.pds_archivelearninganddevelopment[y].lnd_type}}
              </template>                       
              <template v-else>
                N/A
              </template>
          </template>
        </td>
        <td class="bl5 br1 bt5 bb5 fmp tc ws bgw l14" colspan="3">
          <template v-if="archive.pds_archivelearninganddevelopment.hasOwnProperty(y)">
              <template v-if="archive.pds_archivelearninganddevelopment[y].lnd_sponsor">
                {{archive.pds_archivelearninganddevelopment[y].lnd_sponsor}}
              </template>                       
              <template v-else>
                N/A
              </template>                   
          </template>
        </td>
        </template>
      </tr>
    </template>
    <template v-else>
      <tr class="h40">
        <td colspan="4" class="bgw tc bl1 br5 bt5 fmp">
            &nbsp;
        </td>
        <td class="bl5 br5 bt5 bb5 fmp tc bgw">
          &nbsp;
        </td>
        <td class="bl5 br5 bt5 bb5 fmp tc bgw">&nbsp;</td>
        <td class="bl5 br5 bt5 bb5 fmp tc bgw">&nbsp;</td>
        <td class="bl5 br5 bt5 bb5 fmp tc bgw">&nbsp;</td>
        <td class="bl5 br1 bt5 bb5 fmp tc bgw" colspan="3">s&nbsp;</td>
      </tr>
    </template>
  </template>
  <tr>
    <td colspan="11" class="bt1 bb1 br1 bl1 tc fmp it t700 bgg" style="color:#ff0000">(Continue on separate sheet if necessary)</td>
  </tr>
  <tr>
    <td colspan="11" class="bggd txtw bl1 br1 bb1 bt1 t700 it fmp">VIII.<span>&nbsp;</span> OTHER INFORMATION</td>
  </tr>
  <tr>
    <td class="bl1 bt1 bb1 fa8 pl5 fmp bgg">31.</td>
    <td class="fmp bgg br5 bt5 bb5 fa8 fmp ps-2">SPECIAL SKILLS and HOBBIES</td>    
    <td colspan="6" class="fmp fa8 bgg br5 tc vmid pr ps-2"><span class="tl pa" style="left:5px;top:5px">32.</span>NON-ACADEMIC DISTINCTIONS / RECOGNITION <br/> (Write in full)</td>    
    <td colspan="3" class="fa8 bgg tc ws br1 fmp pr vmid ps-2"><span class="tl pa" style="left:5px;top:5px">33.</span>MEMBERSHIP IN ASSOCIATION/ORGANIZATION<br/>(Write in full)</td>
  </tr>
  
  <template v-for="(x,y) in 7">
    <tr class="h40">
      <td colspan="2" class="bl1 br5 bb5 bt5 fmp bgw tc ws">
        <template v-if="hobbies">
            <template v-if="y == 0">
              <template v-if="hobbies.hasOwnProperty(y)">
                  <template v-if="hobbies[y].oi_description">
                    {{hobbies[y].oi_description}}
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
              <template v-if="hobbies.hasOwnProperty(y)">
                  <template v-if="hobbies[y].oi_description">
                    {{hobbies[y].oi_description}}
                  </template>
                  <template v-else>
                    N/A
                  </template>
              </template>  
            </template>
        </template>
      </td>
      <td colspan="6" class="bgw tc fmp bl5 bb5 bt5 br5 ws">
        <template v-if="recognitions">
              <template v-if="y == 0">
              <template v-if="recognitions.hasOwnProperty(y)">
                  <template v-if="recognitions[y].oi_description">
                    {{recognitions[y].oi_description}}
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
              <template v-if="recognitions.hasOwnProperty(y)">
                  <template v-if="recognitions[y].oi_description">
                    {{recognitions[y].oi_description}}
                  </template>
                  <template v-else>
                    N/A
                  </template>
              </template>  
            </template>         
        </template>
      </td>
      <td colspan="3" class="bgw tc fmp bl5 bb5 bt5 br1 ws">
        <template v-if="recognitions">       

              <template v-if="y == 0">
              <template v-if="memberships.hasOwnProperty(y)">
                  <template v-if="memberships[y].oi_description">
                    {{memberships[y].oi_description}}
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
              <template v-if="memberships.hasOwnProperty(y)">
                  <template v-if="memberships[y].oi_description">
                    {{memberships[y].oi_description}}
                  </template>
                  <template v-else>
                    N/A
                  </template>
              </template>  
            </template>
        </template>
      </td>
  </tr>
  </template>
  <tr class="h10">
    <td colspan="11" class="bgg t700 fmp bl1 bt1 br1 bb1 tc it" style="color:#ff0000;">(Continue on separate sheet if necessary)</td>
  </tr>
  <tr class="h40">
    <td colspan="2" class="bl1 bb1 bt1 br5 bgg t700 tc it fmp">SIGNATURE</td>
    <td colspan="4" class="bgw bt1 bb1 bl5 br5">&nbsp;</td>
    <td colspan="2" class="bl1 bb1 bt1 br5 bgg t700 tc it fmp">DATE</td>
    <td colspan="3" class="bgw bt1 bb1 bl5 br1">&nbsp;</td>
  </tr>
  <tr height="13" style='height:9.75pt'>
    <td class="fpa it f8 tr" colspan="11">CS FORM 212 (Revised 2017), Page 3 of 4</td>
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