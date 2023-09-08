<template>   
        <table border="0" cellpadding="0" cellspacing="0" width="810" class="f10 fpa wsn fn npa txtcw t400 vmid txtdn" style="border-collapse: collapse; table-layout: fixed; width: 609pt">
            <tr class="bt1 bl1 br1 bb1 bggd">
                <td style="width: 13pt">&nbsp;</td>
                <td style="width: 71pt">&nbsp;</td>
                <td style="width: 29pt">&nbsp;</td>
                <td style="width: 59pt">&nbsp;</td>
                <td style="width: 33pt">&nbsp;</td>
                <td style="width: 28pt">&nbsp;</td>
                <td style="width: 45pt">&nbsp;</td>
                <td style="width: 53pt">&nbsp;</td>
                <td style="width: 41pt">&nbsp;</td>
                <td style="width: 45pt">&nbsp;</td>
                <td style="width: 45pt">&nbsp;</td>
                <td style="width: 55pt">&nbsp;</td>
                <td style="width: 50pt">&nbsp;</td>
                <td style="width: 44pt">&nbsp;</td>
            </tr>

            <tr>
                <td height="15" class="bt1 bl1 br1 fmp f11 t700 it" colspan="14"> CS Form No. 212</td>
            </tr>
            <tr>
                <td height="15" class=" bl1 br1 fmp f9 t700 it" colspan="14">Revised 2017</td>
            </tr>
            <tr>
                <td colspan="14" class="fmab fa8 vtop bl1 tc f22 br1"> PERSONAL DATA SHEET </td>
            </tr>
            <tr>
                <td colspan="14" height="29" class="fpa fa8 bl5 br5 t700 it f6 br1"> WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience Sheet shall cause the filing of administrative/criminal case/s against the person concerned. </td>
            </tr>
            <tr>
                <td colspan="14"  class="t700 it bl1 br1 fpa f8 fa8 br1"> READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET (PDS) BEFORE ACCOMPLISHING THE PDS FORM. </td>
            </tr>

            <tr>
                <td  class="bgw fa8 f8 fmp bl1" colspan="10"> Print legibly. Tick appropriate boxes
                (<input type="checkbox" disabled>) and use separate sheet if necessary. Indicate N/A if not applicable.<span class="t700">DO NOT ABBREVIATE.</span>
                </td>
                <td class="fa8 bggd bl5 fmp bt5 br5">1. CS ID No.</td>
                <td colspan="3" class="fa8 fmp bt5 tr nbl br1"> <span></span>(Do not fill up. For CSC use only) </td>
            </tr>

            <tr>
                <td colspan="14" height="22" class="bggd t700 txtw fmp f11 it bl1 br1 bb2 bt2 pl5"> I. PERSONAL INFORMATION </td>
            </tr>
            <tr class="h40">
                <td class="fmp fa8 bgg bl1 pl5">2.</td>
                <td colspan="2" class="fa8 bgg br5">SURNAME</td>
                <td colspan="11" class="f7 fmp  bb5 pl5 npl br1"> 
                    <template v-if="officerecord.employee">
                        {{officerecord.employee.employee_lname}}
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td  class="fmp fa8 bgg bl1 pl5">&nbsp;</td>
                <td colspan="2" class="fa8 bgg br5"> FIRST NAME </td>
                <td class="bb5 fmp f7 pl5 nbt nbl" colspan="8">
                    <template v-if="officerecord.employee">
                        {{officerecord.employee.employee_fname}}
                    </template>
                </td>

                <td colspan="3" class="fa8 bl5 bt5 bb5 bgg br1 vtop"> NAME EXTENSION (JR., SR)
                    <template v-if="officerecord.employee">
                        <span style="position: absolute;bottom:0;left:5px;">
                            <template v-if="officerecord.employee.employee_extname">
                                {{officerecord.employee.employee_extname}}
                            </template>
                            <template v-else>
                                 N/A
                            </template>
                        </span> 
                        
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="fmp fa8 bgg bl1 pl5 bb1">&nbsp;</td>
                <td colspan="2" class="fa8 bgg br5"> MIDDLE NAME </td>
                <td class="f7 fmp pl5 nbt nbl br1 bb1 bgw" colspan="11">
                    <template v-if="officerecord.employee">         
                            {{officerecord.employee.employee_mname}}             
                    </template>
                </td>

            </tr>
            <tr >
                <td class="fmp fa8 bgg bl1 pl5"> 3. </td>
                <td colspan="2" class="bt1 fa8 bgg br5" width="134"> DATE OF BIRTH
                    <br /> (mm/dd/yyyy)<span></span> </td>
                <td colspan="3" class="pl5 f7 fmp nbt">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.birthdate">
                            {{moment(officerecord.pdspersonalinformation.birthdate).format('MM/DD/YY')}}
                        </template>   
                        <template v-else>
                            N/A
                        </template>                         
                    </template>
                 </td>
                <td class="bgg bl5 fmp fa8" colspan="2">16. CITIZENSHIP</td>
                <td class="fa8 bgg br5">&nbsp;</td>

                <td colspan="2" class="tc bgw">
                    <template v-if="officerecord.pdspersonalinformation">
                            <template v-if="officerecord.pdspersonalinformation.citizenship == 1">
                                <input type="checkbox" id="filipino" checked disabled />
                            </template>
                            <template v-else>
                                <input type="checkbox" id="filipino" disabled />
                            </template>
                    </template>            
                    <label style="padding-left: 5px;" for="filipino">Filipino</label>
                </td>
                <td colspan="3" class="tc bgw br1">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.citizenship == 2">
                            <input type="checkbox" id="dual" checked disabled />
                        </template>
                        <template v-else>
                            <input type="checkbox" id="dual" disabled />
                        </template>
                    </template>
                    <label style="padding-left: 5px;"  for="dual">Dual Citizenship</label>
                </td>
            </tr>
            <tr class="h20">
                <td class="bgg bb5 bl1" colspan="3">&nbsp;</td>

                 <td class="bgw bl5 br5" colspan="3" width="79" style="width: 59pt">&nbsp;</td>

                <td class="bgg" colspan="3">&nbsp;</td>

                <td class="bgw bl5">&nbsp;</td>
                <td class="bgw">&nbsp;</td>
                <td class="bgw">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.citizenshipdual == 1">
                            <input type="checkbox" id="dualc" checked disabled />
                        </template>
                        <template v-else>
                            <input type="checkbox" id="dualc" disabled />
                        </template>
                    </template>
                    <label for="dualc">by birth</label>
                </td>

                <td class="bgw tc br1" colspan="2">

                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.citizenshipdual == 2">
                            <input type="checkbox" id="natural" checked disabled />
                        </template>
                        <template v-else>
                            <input type="checkbox" id="dualnaturalc" disabled />
                        </template>
                    </template>
                    <label for="natural"> by naturalization</label>
                </td>
               
            </tr>
            <tr class="h40">
                <td class="fmp fa8 bgg bl1 pl5 bt5 bb5">4.</td>
                <td class="fa8 bgg bb5" colspan="2">PLACE OF BIRTH</td>

                <td colspan="3" class="pl5 bgw bl5 bt5 bb5 ws f7">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.placeofbirth">
                            {{officerecord.pdspersonalinformation.placeofbirth}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                        
                    </template>
                </td>
                <td colspan="3" class="bgg fa8 tc bl5"> If holder of<span> </span>dual citizenship,<span></span> </td>
                <td class="bgw bl5 bb5" colspan="2">&nbsp;</td>

                <td colspan="3" class="br1 bb5 bgw"> Pls. indicate country: </td>
            </tr>
            <tr class="h40">
                <td class="fmp fa8 bgg bl1 pl5 bt5 bb5"> 5. </td>
                <td class="fa8 bgg bb5 br5" colspan="2">SEX</td>
                <td colspan="3" class="tc nbr">
                    <template v-if="officerecord.pdspersonalinformation">
                        <input type="checkbox" name="male" disabled id="male" value="1" v-if="officerecord.pdspersonalinformation.sex == 1" checked>
                        <input type="checkbox" name="male" disabled id="male" value="1" v-else> Male
                        <input type="checkbox" name="female" disabled id="female" value="2" v-if="officerecord.pdspersonalinformation.sex == 2" checked>
                        <input type="checkbox" name="female" disabled id="female" value="2" v-else> Female
                    </template>
                </td>

                <td colspan="3" class="fa8 tc bgg bl5" style="border-right: 0.5pt solid black"> please indicate the details. </td>
                <td align="left" colspan="5" style="border-right: 1px solid black;">
                    <select class="form-select nbra" disabled>
                        <template v-if="officerecord.pdspersonalinformation">
                            <option class="tc" v-if="officerecord.pdspersonalinformation.pdsaddress_country" selected :value="officerecord.pdspersonalinformation.pdsaddress_country.id">{{officerecord.pdspersonalinformation.pdsaddress_country.name}}</option>
                        </template>
                        
                    </select>
                </td>

            </tr>
            <tr class="h25">
                <td rowspan="2" class="fmp fa8 bgg bl1 pl5">6.</td>
                <td colspan="2" rowspan="2" class="fa8 bgg fmp br5"> CIVIL STATUS </td>
                <td colspan="3" rowspan="4" class="bgw fpa bt5">
                    <ul class="liststyle-inline">
                        <li>
                            <template v-if="officerecord.pdspersonalinformation">   
                                <input type="checkbox" disabled value="1" checked id="single" v-if="officerecord.pdspersonalinformation.civilstatus==1"/>
                                <input type="checkbox" disabled value="1" id="single" v-else/>
                                <label for="single">Single</label>
                            </template>
                        </li>
                        <li>
                            <template v-if="officerecord.pdspersonalinformation">   
                                <input type="checkbox" disabled value="1" checked id="Married" v-if="officerecord.pdspersonalinformation.civilstatus==3"/>
                                <input type="checkbox" disabled value="1" id="Married" v-else/>
                                <label for="Married">Married</label>
                            </template>
                        </li>
                        <li>
                            <template v-if="officerecord.pdspersonalinformation">   
                                <input type="checkbox" disabled value="1" checked id="Widowed" v-if="officerecord.pdspersonalinformation.civilstatus==2"/>
                                <input type="checkbox" disabled value="1" id="Widowed" v-else/>
                                <label for="Widowed">Widowed</label>
                            </template>


                        </li>
                        <li>
                            <template v-if="officerecord.pdspersonalinformation">   
                                <input type="checkbox" disabled value="1" checked id="Separated" v-if="officerecord.pdspersonalinformation.civilstatus==4"/>
                                <input type="checkbox" disabled value="1" id="Separated" v-else/>
                                <label for="Separated">Separated</label>
                            </template>
                        </li>
                        <li>
                            <template v-if="officerecord.pdspersonalinformation">   
                                <input type="checkbox" disabled value="1" checked id="others" v-if="officerecord.pdspersonalinformation.civilstatus==5"/>
                                <input type="checkbox" disabled value="1" id="others" v-else/>
                                <label for="others">Other/s:</label>
                            </template>
                        </li>
                        <li>
                            <template v-if="officerecord.pdspersonalinformation">
                                <template v-if="officerecord.pdspersonalinformation.civilstatusother != null">
                                    {{officerecord.pdspersonalinformation.civilstatusother}}
                                </template>
                            </template>
                        </li>
                    </ul>

                </td>
                <td class="fa8 bt5 fmp bgg bl5" colspan="2">17. RESIDENTIAL ADDRESS</td>
                <td colspan="3" class="bgw fa8 f7 bl5 fmp tc bt5 bbg ws">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.residential_house_no">
                            {{officerecord.pdsaddress.residential_house_no}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                        
                    </template>
                </td>
                <td colspan="3" class="bgw bt5 f7 bbg fa8 fmp tc br1 ws">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.residential_street">
                            {{officerecord.pdsaddress.residential_street}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                        
                    </template>
                </td>
            </tr>
            <tr class="h15">
                <td class="bgg bl5 fa8 br5 nbr">&nbsp;</td>
                <td class="bgg fmp fa8 bbr5">&nbsp;</td>
                <td colspan="3" class="it fmp bgw fa8 tc bl5 bb5">House/Block/Lot No.</td>
                <td colspan="3" class="it fmp bgw fa8 tc br1 bb5" style="border-right: 1pt solid black"> Street </td>
            </tr>
            <tr class="h10">
                <td class="fmp fa8 bgg bl1 pl5 br5" colspan="3">&nbsp;</td>
                <td class="bgg fmp fa8 bbr5 bl5" colspan="2">&nbsp;</td>
                <td colspan="3" rowspan="2" class="bbg fmp bgw f7 bl5 tc fa8">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.residential_subdivision">
                            {{officerecord.pdsaddress.residential_subdivision}}
                        </template>
                        <template v-else>
                            N/A
                        </template>

                    </template>
                </td>
                <td colspan="3" rowspan="2" class="bbg fmp tc f7 fa8 br1">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.residential_barangay">
                            {{officerecord.pdsaddress.residential_barangay}}
                        </template>
                        <template v-else>
                            N/A
                        </template>                   
                    </template>
                </td>
            </tr>
            <tr class="h10">
                <td rowspan="2" class="bl1 bgg fa8 bb5"></td>
                <td class="bgg fa8 br5" colspan="2">&nbsp;</td>
                <td colspan="2" class="bgg fa8 bl5 br5"></td>
                <td class="bgg fa8">&nbsp;</td>
                <td class="fa8 bgg br1">&nbsp;</td>
            </tr>
            <tr class="h10">
                <td height="12" class="bgg br5 fa8" colspan="2">&nbsp;</td>
                <td class="bgw fa8 br5 bb5" colspan="3">&nbsp;</td>
                <td class="fa8 bgg bb5" colspan="2">&nbsp;</td>
                <td colspan="3" class="it fa8 bb5 tc bl5 fmp">Subdivision/Village</td>
                <td colspan="3" class="it fa8 br1 bb5 tc fmp" style="border-right: 1pt solid black"> Barangay </td>
            </tr>
            <tr class="h20">
                <td rowspan="2" class="fmp fa8 bgg bl1 pl5 bb5"> 7. </td>
                <td colspan="2" rowspan="2" class="fa8 bgg fmp bt5 br5"> HEIGHT (m) </td>
                <td colspan="3" rowspan="2" class="pl5 f7 bgw br5" >
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.height">
                            {{officerecord.pdspersonalinformation.height}}
                        </template>
                        <template v-else>
                            N/A
                        </template>    
         
                    </template>
                </td>
                <td class="bgg">&nbsp;</td>
                <td class="fa8 bgg br5">&nbsp;</td>
                <td colspan="3" class="bgw fa8 f7 bbg bgw bl5 fmp tc bt5">
                    <template v-if="officerecord.pdsaddress">        
                        <template v-if="officerecord.pdsaddress.pdsaddressres_mun">
                            {{officerecord.pdsaddress.pdsaddressres_mun.citymunDesc}}
                        </template>
                        <template v-else>
                            N/A
                        </template>               
                    </template>
                </td>
                <td colspan="3" class="bgw bt5 bbg fa8  f7 tc br1" style="border-right: 1pt solid black">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.pdsaddressres_prov">   
                            <template v-if="officerecord.pdsaddress.pdsaddressres_prov.provDesc">
                                {{officerecord.pdsaddress.pdsaddressres_prov.provDesc}}
                            </template>
                            <template v-else>
                                N/A
                            </template> 
                        </template>                
                    </template>
                </td>
            </tr>
            <tr class="h20">
                <td class="bgg"></td>
                <td class="fa8 bgg br5">&nbsp;</td>
                <td colspan="3" class="bgw fa8 fmp tc"><i>City/Municipality</i></td>
                <td colspan="3" class="bgw fa8 fmp tc br1"><i>Province</i></td>
            </tr>
            <tr class="h40">
                <td class="fmp fa8 bgg bl1 pl5 bt5 bb5">8.</td>
                <td colspan="2" class="bgg br5 fmp fa8 bt5"> WEIGHT (kg) </td>
                <td colspan="3" class="f7 bt5 bgw pl5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.weight">
                            {{officerecord.pdspersonalinformation.weight}}
                        </template>
                        <template v-else>
                            N/A
                        </template>          
                    </template>
                </td>
                <td colspan="2" class="bgg tc fmp fa8 bl5 br5"> ZIP CODE<span></span> </td>
                <td colspan="3" class="bgw tc fa8 fmp f7 bt5" width="369" style="text-align:center; border-left: none; padding-left: 5px;">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.residential_zipcode">
                            {{officerecord.pdsaddress.residential_zipcode}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td colspan="3" class="bt5 br1 bgw">            
                </td>
            </tr>
            <tr>
                <td rowspan="2" class="fmp fa8 bgg bl1 pl5 bt5 bb5">9.</td>
                <td colspan="2" rowspan="2" class="bgg fmp fa8 bt5 br5">BLOOD TYPE </td>
                <td colspan="3" rowspan="2" class="pl5 bt5 br5 fmp f7">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.bloodtype">
                            {{officerecord.pdspersonalinformation.bloodtype}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="fa8 bgg  bt5 fmp" colspan="2">18. PERMANENT ADDRESS</td>
                <td colspan="3" class="bgw tc bt5 bbg fa8 f7 fmp bl5 fn">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.permanent_house_no">
                            {{officerecord.pdsaddress.permanent_house_no}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td colspan="3" class="bgw br1 bbg tc fa8 f7 fmp fn bt5">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.permanent_street">
                            {{officerecord.pdsaddress.permanent_street}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
            </tr>
            <tr>
                <td class="bgg">&nbsp;</td>
                <td class="fa8 bgg">&nbsp;</td>
                <td colspan="3" class="fmp fa8 tc bgw bl5"><i>House/Block/Lot No.</i></td>
                <td colspan="3" class="fmp fa8 tc bgw b15 br1"><i>Street</i></td>
            </tr>
            <tr>
                <td rowspan="2" height="36" class="bl1 fa8 bgg fmp">10.</td>
                <td colspan="2" rowspan="2" class="br5 bgg fa8 fmp bt5"> GSIS ID NO. </td>
                <td colspan="3" rowspan="2" class="f7 pl5 bgw bt5 fmp">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.gsis_id">
                            {{officerecord.pdspersonalinformation.gsis_id}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template> 
                </td>
                <td class="bgg bl5">&nbsp;</td>
                <td class="bgg fmp fa8 bbr5">&nbsp;</td>
                <td colspan="3" class="bgw fmp fa8 tc f7 bt5 bbg bl5 fn">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.permanent_subdivision">
                            {{officerecord.pdsaddress.permanent_subdivision}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td colspan="3" class="bt5 br1 fmp f7 tc bgw">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.permanent_barangay">
                            {{officerecord.pdsaddress.permanent_barangay}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
            </tr>
            <tr>
                <td class="bgg bl5">&nbsp;</td>
                <td class="bgg fmp fa8 bbr5">&nbsp;</td>
                <td colspan="3" class="fmp bgw tc bl5 fa8"><i>Subdivision/Village</i></td>
                <td colspan="3" class="fmp tc bgw br1 bbgt fa8"><i>Barangay</i></td>
            </tr>
            <tr>
                <td rowspan="2" class="bgg fa8 bl1 bt5 bb5 fmp">11.</td>
                <td colspan="2" rowspan="2" class="fa8 bgg bt5 bb5 br5 fmp"> PAG-IBIG ID NO. </td>
                <td colspan="3" rowspan="2" class="f7 pl5 bt5 bgw fmp"> 
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.pagibig_id">
                            {{officerecord.pdspersonalinformation.pagibig_id}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template> 
                </td>
                <td class="bgg bl5" colspan="2">&nbsp;</td>
                <td colspan="3" class="bgw fa8  f7 bl5 fmp tc bt5">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.pdsaddressres_mun">
                            <template v-if="officerecord.pdsaddress.pdsaddressres_mun.citymunDesc">
                                {{officerecord.pdsaddress.pdsaddressres_mun.citymunDesc}}
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
                <td colspan="3" class="bgw bt5 bbg fa8 f7 tc br1">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.pdsaddressres_prov">
                            {{officerecord.pdsaddress.pdsaddressres_prov.provDesc}}
                        </template>                
                    </template>
                </td>
            </tr>
            <tr>
                <td class="bgg bl5 br5" colspan="2">&nbsp;</td>
                <td colspan="3" class="tc fa8 bgw bbgt fmp"><i>City/Municipality</i></td>
                <td colspan="3" class="tc fa8 bgw bbgt fmp br1"><i>Province</i></td>
            </tr>
            <tr class="h40">
                <td class="bl1 fmp fa8 bgg bb5"> 12. </td>
                <td class="bt5 bb5 bgg fmp fa8 br5" colspan="2">PHILHEALTH NO.</td>
                <td colspan="3" class="f7 fmp bt5 mr5 pl5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.philhealth_no">
                            {{officerecord.pdspersonalinformation.philhealth_no}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template> 
                </td>
                <td colspan="2" class="bl5 bb5 fmp fa8 tc br5 bgg"> ZIP CODE<span></span> </td>
                <td colspan="3" class="bt5 fa8 f7 tc fa8 fmp bgw">
                    <template v-if="officerecord.pdsaddress">
                        <template v-if="officerecord.pdsaddress.permanent_zipcode">
                            {{officerecord.pdsaddress.permanent_zipcode}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template>
                </td>
                <td colspan="3" class="bt5 bgw br1"></td>
            </tr>
            <tr class="h40">
                <td class="bl1 fmp fa8 bt5 bb5 bgg"> 13. </td>
                <td class="fmp fa8 bgg bt5 bbm br5" colspan="2">SSS NO.</td>

                <td colspan="3" class="f7 pl5 bgw fmp bt5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.sss_no">
                            {{officerecord.pdspersonalinformation.sss_no}}
                        </template>
                        <template v-else>
                             N/A
                        </template>

                    </template> 
                </td>
                <td class="bl5 bgg bt5 fmp fa8" colspan="2"> 19. TELEPHONE NO.</td>
                <td colspan="6" class="bgw pl5 bg5 br1 fmp f7 bt5 bl5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.telephone_no">
                            {{officerecord.pdspersonalinformation.telephone_no}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template> 
                </td>
            </tr>
            <tr class="h40">
                <td class="bl1 fmp fa8 bt5 bb5 bgg">14.</td>
                <td colspan="2" class="fmp fa8 bgg bt5 bbm br5">TIN NO. </td>
                <td colspan="3" class="f7 pl5 bgw fmp bt5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.tin_no">
                            {{officerecord.pdspersonalinformation.tin_no}}
                        </template>
                        <template v-else>
                             N/A
                        </template>

                    </template> 
                </td>
                <td class="bl5 bgg bt5 fmp fa8" colspan="2">20. MOBILE NO.</td>
                <td colspan="6" class="bgw pl5 bg5 br1 fmp f7 bt5 bl5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.mobile_no">
                            {{officerecord.pdspersonalinformation.mobile_no}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                        
                    </template> 
                 </td>
            </tr>
            <tr class="h40">
                <td class="bl1 fmp fa8 bt5 bb5 bgg">15. </td>
                <td colspan="2" class="fmp fa8 bgg bt5 bbm br5">AGENCY EMPLOYEE NO. </td>

                <td colspan="3" class="f7 pl5 bgw fmp bt5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.agency_no">
                            {{officerecord.pdspersonalinformation.agency_no}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template> 
                </td>
                <td class="bl5 bt5 fmp bgg fa8" colspan="2">21. E-MAIL ADDRESS (if any)</td>
                <td colspan="6" class="br1 fmp f7 pl5 bt5 bgw bl5">
                    <template v-if="officerecord.pdspersonalinformation">
                        <template v-if="officerecord.pdspersonalinformation.emailaddress">
                            {{officerecord.pdspersonalinformation.emailaddress}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template> 

                </td>
            </tr>
            <tr>
                <td colspan="14" class="bggd t700 txtw fmp f11 it bl1 br1 bb2 bt2 pl5"> II.<span> </span>FAMILY BACKGROUND </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bt5">22.</td>
                <td class="bgg fmp fa8 bt5" colspan="2"> SPOUSE'S SURNAME </td>
                <td colspan="5" class="btw f7 pl5 fmp bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_lname">
                            {{officerecord.pdsfamilybackground.spouse_lname}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template> 
                </td>
                <td colspan="4" class="fa8 bgg fmp bt5 bb5 br5"> 23. NAME of CHILDREN<span> </span>(Write full name and list all) </td>
                <td colspan="2" class="fa8 bgg fmp bt5 br1 bb5"> DATE OF BIRTH (mm/dd/yyyy)<span></span> </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8">&nbsp;</td>
                <td class="bgg fmp fa8 br5" colspan="2"><span> </span>FIRST NAME</td>

                <td colspan="3" class="btw f7 pl5 fmp bt5 bbm bl5 br5">
                     <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_fname">
                            {{officerecord.pdsfamilybackground.spouse_fname}}
                        </template>
                        <template v-else>
                             N/A
                        </template>
                    </template>
                </td>
                <td colspan="2" class="vtop fa8 fmp bgg bt5" width="130"> NAME EXTENSION (JR., SR)<span>
                     <template v-if="officerecord.pdsfamilybackground">
                        <span class="f7" style="position: absolute;bottom:0;left:5px;">
                            <template v-if="officerecord.pdsfamilybackground.spouse_extname">
                                {{officerecord.pdsfamilybackground.spouse_extname}}
                            </template>
                            <template v-else>
                                 N/A
                            </template>
                        </span>                
                    </template>
                </span> </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(0)">
                            <template v-if="officerecord.pdsfamilybackgroundchildren[0].nameofchildren">
                                {{officerecord.pdsfamilybackgroundchildren[0].nameofchildren}}
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
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(0)">
                            <template v-if="officerecord.pdsfamilybackgroundchildren[0].dateofbirth">
                                {{moment(officerecord.pdsfamilybackgroundchildren[0].dateofbirth).format('MM/DD/YYYY')}}
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
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8">&nbsp;</td>
                <td class="bgg fmp fa8  br5" colspan="2">MIDDLE NAME</td>
                <td colspan="5"  class="btw f7 pl5 bt5 bbm bl5 br5 fmp">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_mname">
                            {{officerecord.pdsfamilybackground.spouse_mname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(1)">
                            {{officerecord.pdsfamilybackgroundchildren[1].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(1)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[1].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bt5 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bt5 bb5 br5" colspan="2">OCCUPATION</td>
                <td colspan="5" class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_occupation">
                            {{officerecord.pdsfamilybackground.spouse_occupation}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template></td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(2)">
                            {{officerecord.pdsfamilybackgroundchildren[0].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(2)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[0].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bt5 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bt5 bb5 br5" colspan="2"> EMPLOYER/BUSINESS NAME </td>
                <td colspan="5"  class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_employer">
                            {{officerecord.pdsfamilybackground.spouse_employer}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(3)">
                            {{officerecord.pdsfamilybackgroundchildren[0].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(3)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[0].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bt5 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bt5 bb5 br5" colspan="2"> BUSINESS ADDRESS </td>
                <td colspan="5" class="btw fmp f7 pl5 bt5 bbm bl5 br5"> 
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_employeraddress">
                            {{officerecord.pdsfamilybackground.spouse_employeraddress}}
                        </template>
                        <template v-else>
                            N/A
                        </template> 
                    </template> 
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(4)">
                            {{officerecord.pdsfamilybackgroundchildren[4].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(4)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[4].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bt5 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bt5 bb5 br5" colspan="2">TELEPHONE NO.</td>
                <td colspan="5"  class="btw fmp f7 pl5 bt5 bbm bl5 br5"> 
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.spouse_telephone_no">
                            {{officerecord.pdsfamilybackground.spouse_telephone_no}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(5)">
                            {{officerecord.pdsfamilybackgroundchildren[5].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(5)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[5].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bt5">24.</td>
                <td class="bgg fmp fa8 bt5 br5" colspan="2">FATHER'S SURNAME</td>
                <td colspan="5"  class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.father_lname">
                            {{officerecord.pdsfamilybackground.father_lname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(6)">
                            {{officerecord.pdsfamilybackgroundchildren[6].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(6)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[6].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8">&nbsp;</td>
                <td class="bgg fmp fa8 br5" colspan="2">FIRST NAME</td>
                <td colspan="3"  class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.father_fname">
                            {{officerecord.pdsfamilybackground.father_fname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="2" class="vtop bgg fa8 bgg bt5 fmp" width="130" style="position: relative;"> NAME EXTENSION (JR., SR)
                    <span class="f7" style="position: absolute;bottom:0;left:5px;">
                        <template v-if="officerecord.pdsfamilybackground">
                            <template v-if="officerecord.pdsfamilybackground.father_extname">
                                {{officerecord.pdsfamilybackground.father_extname}}
                            </template>
                            <template v-else>
                                N/A
                            </template>
                        </template>
                    </span> 
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(7)">
                            {{officerecord.pdsfamilybackgroundchildren[7].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(7)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[7].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8">&nbsp;</td>
                <td class="bgg fmp fa8 br5" colspan="2">MIDDLE NAME</td>
                <td colspan="5"  class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.father_mname">
                            {{officerecord.pdsfamilybackground.father_mname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(8)">
                            {{officerecord.pdsfamilybackgroundchildren[8].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(8)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[8].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h20">
                <td class="bgg bl1 fmp fa8 bt5">25.</td>
                <td class="bgg fmp fa8 bt5" colspan="2">MOTHER'S MAIDEN NAME</td>
                <td colspan="5"  class="btw bgg fmp f7 pl5 bt5 bbm br5">
                    <template v-if="officerecord.pdsfamilybackground">                        
                        {{officerecord.pdsfamilybackground.mother_maiden}}
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(9)">
                            {{officerecord.pdsfamilybackgroundchildren[9].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(9)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[9].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8">&nbsp;</td>
                <td class="bgg fmp fa8 br5" colspan="2">SURNAME</td>

                <td colspan="5" class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.mother_lname">
                            {{officerecord.pdsfamilybackground.mother_lname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(10)">
                            {{officerecord.pdsfamilybackgroundchildren[10].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(10)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[10].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8">&nbsp;</td>
                <td class="bgg fmp fa8 br5" colspan="2">FIRST NAME</td>
                <td colspan="5" class="btw fmp f7 pl5 bt5 bbm bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.mother_fname">
                            {{officerecord.pdsfamilybackground.mother_fname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="4" class="bgw f7 tc fmp bl5  bb5 br5 fa8">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(11)">
                            {{officerecord.pdsfamilybackgroundchildren[11].nameofchildren}}
                        </template>                
                    </template>
                </td>
                <td colspan="2" class="bgw f7 tc fmp br1 bb5">
                    <template v-if="officerecord.pdsfamilybackgroundchildren">
                        <template v-if="officerecord.pdsfamilybackgroundchildren.hasOwnProperty(11)">
                            {{moment(officerecord.pdsfamilybackgroundchildren[11].dateofbirth).format('MM/DD/YYYY')}}
                        </template>
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bb1">&nbsp;</td>
                <td class="bgg fmp fa8 br5 bb1" colspan="2">MIDDLE NAME</td>
                <td colspan="5"  class="btw fmp f7 pl5 bt5 bb1 bl5 br5">
                    <template v-if="officerecord.pdsfamilybackground">
                        <template v-if="officerecord.pdsfamilybackground.mother_fname">
                            {{officerecord.pdsfamilybackground.mother_mname}}
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="6" class="bgg tc bb1 br1" style="color: #ff0000;"><i>(Continue on separate sheet if necessary)</i></td>
            </tr>
            <tr>
                <td colspan="14" class="bggd t700 txtw fmp f11 it bl1 br1 bb2 bt2 pl5"> III. EDUCATIONAL BACKGROUND</td>        
            </tr>
            <tr>
                <td rowspan="2" class="bgg bl1 fmp fa8"> 26. </td>       
                <td colspan="2" rowspan="3" class="bgg tc fa8 bb5"> LEVEL </td>
                <td colspan="3" rowspan="3" class="br5 bb5 fa8 bgg bl5 tc fmp"> NAME OF SCHOOL <br/>(Write in full) </td>
                <td colspan="3" rowspan="3" class="br5 bb5 fa8 bgg bl5 tc fmp"> BASIC EDUCATION/DEGREE/COURSE<br/>(Write in full)</td>
                <td colspan="2" rowspan="2" class="br5 bb5 fa8 bgg bl5 tc fmp"> PERIOD OF ATTENDANCE </td>
                <td rowspan="3" class="bgg fa8  tc ws fmp  bb5"> HIGHEST LEVEL/<span> </span>UNITS EARNED<span> </span>
                    <br /> (if not graduated) </td>
                <td rowspan="3" class="fa8 tc ws fmp bgg bl5 bb5"> YEAR GRADUATED<span></span> </td>
                <td rowspan="3" class="fa8 tc ws f6 fmp bgg bl5 br1 bb5"> SCHOLARSHIP/ ACADEMIC HONORS RECEIVED </td>
            </tr>
            <tr class="h10"></tr>
            <tr class="h10">
                <td class="bgg bb5 bl1">&nbsp;</td>
                <td class="fa8 fmp bgg tc bb5 br5"> From </td>
                <td class="fa8 fmp bgg tc bb5 br5"> To </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bb5" colspan="2"> ELEMENTARY </td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 fmp ws">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_school">
                            {{officerecord.pdseducationalbackground.elementary_school}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 fmp ws">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_course">
                            {{officerecord.pdseducationalbackground.elementary_course}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_from">
                            {{officerecord.pdseducationalbackground.elementary_from}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_to">
                            {{officerecord.pdseducationalbackground.elementary_to}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_unitsearned">
                            {{officerecord.pdseducationalbackground.elementary_unitsearned}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_yeargraduated">
                            {{officerecord.pdseducationalbackground.elementary_yeargraduated}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td  class="tc fa8 bl5 br1 fmp bb5 ws">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.elementary_awards">
                            {{officerecord.pdseducationalbackground.elementary_awards}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bb5" colspan="2"> SECONDARY </td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 bt5 bb5 fmp ws">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_school">
                            {{officerecord.pdseducationalbackground.secondary_school}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 bt5 bb5 fmp ws">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_course">
                            {{officerecord.pdseducationalbackground.secondary_course}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_from">
                            {{officerecord.pdseducationalbackground.secondary_from}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_to">
                            {{officerecord.pdseducationalbackground.secondary_to}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_unitsearned">
                            {{officerecord.pdseducationalbackground.secondary_unitsearned}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_yeargraduated">
                            {{officerecord.pdseducationalbackground.secondary_yeargraduated}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
                <td  class="tc fa8 bl5 br1 fmp bb5 ws">
                    <template v-if="officerecord.pdseducationalbackground">
                        <template v-if="officerecord.pdseducationalbackground.secondary_awards">
                            {{officerecord.pdseducationalbackground.secondary_awards}}
                        </template>   
                        <template v-else>
                            N/A
                        </template> 
                    </template>
                </td>
            </tr>
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bb5" colspan="2"> VOCATIONAL / <br/>TRADE COURSE </td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 bt5 bb5 fmp ws">

                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                             <template v-for="(tertiary, key) in vocational">                            
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_school">
                                        {{tertiary.tertiary_school}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                    
                </td>
                <td colspan="3" class="tc f7 ws fa8 bl5 br5 bt5 bb5 fmp">
                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                            <template v-for="(tertiary, key) in vocational">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_course">
                                        {{tertiary.tertiary_course}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                            <template v-for="(tertiary, key) in vocational">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_from">
                                        {{tertiary.tertiary_from}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                            <template v-for="(tertiary, key) in vocational">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_to">
                                        {{tertiary.tertiary_to}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                            <template v-for="(tertiary, key) in vocational">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_unitsearned">
                                        {{tertiary.tertiary_unitsearned}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                            <template v-for="(tertiary, key) in vocational">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_yeargraduated">
                                        {{tertiary.tertiary_yeargraduated}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td  class="tc fa8 bl5 br1 fmp bb5 ws">
                    <template v-if="vocational">
                        <template v-if="vocational.length > 0">
                            <template v-for="(tertiary, key) in vocational">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_awards">
                                        {{tertiary.tertiary_awards}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
            </tr>
               
            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bb5" colspan="2"> COLLEGE </td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 bt5 bb5 fmp ws">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_school">
                                        {{tertiary.tertiary_school}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="3" class="tc f7 ws fa8 bl5 br5 bt5 bb5 fmp">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_course">
                                        {{tertiary.tertiary_course}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_from">
                                        {{tertiary.tertiary_from}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_to">
                                        {{tertiary.tertiary_to}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_unitsearned">
                                        {{tertiary.tertiary_unitsearned}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>

                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_yeargraduated">
                                        {{tertiary.tertiary_yeargraduated}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>

                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td  class="tc fa8 bl5 br1 fmp bb5 ws">
                    <template v-if="college">
                        <template v-if="college.length > 0">
                            <template v-for="(tertiary, key) in college">
                                <template v-if="key === 0">
                                    <template v-if="tertiary.tertiary_awards">
                                        {{tertiary.tertiary_awards}}
                                    </template>
                                    <template v-else>
                                        N/A
                                    </template>
                                </template>
                            </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
            </tr>

            <tr class="h40">
                <td class="bgg bl1 fmp fa8 bb5"> &nbsp; </td>
                <td class="bgg fmp fa8 bb5" colspan="2"> GRADUATE STUDIES</td>
                <td colspan="3" class="tc f7 fa8 bl5 br5 bt5 bb5 fmp ws">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                                <template v-if="tertiary.tertiary_school">
                                        {{tertiary.tertiary_school}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td colspan="3" class="tc f7 ws fa8 bl5 br5 bt5 bb5 fmp">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                                <template v-if="tertiary.tertiary_course">
                                        {{tertiary.tertiary_course}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                                <template v-if="tertiary.tertiary_from">
                                        {{tertiary.tertiary_from}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                                <template v-if="tertiary.tertiary_to">
                                        {{tertiary.tertiary_to}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                
                                <template v-if="tertiary.tertiary_unitsearned">
                                        {{tertiary.tertiary_unitsearned}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td class="tc f7 fa8 bl5 br5 fmp bb5">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                                <template v-if="tertiary.tertiary_yeargraduated">
                                        {{tertiary.tertiary_yeargraduated}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
                <td  class="tc fa8 bl5 br1 fmp bb5 ws">
                    <template v-if="gradstudies">
                        <template v-if="gradstudies.length > 0">
                        <template v-for="(tertiary, key) in gradstudies">
                            <template v-if="key === 0">
                                <template v-if="tertiary.tertiary_awards">
                                        {{tertiary.tertiary_awards}}
                                </template>
                                <template v-else>
                                    N/A
                                </template>
                            </template>
                        </template>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                </td>
            </tr>
            <tr>
                <td colspan="14" class="bt1 bb1 tc t700 fa8 bl1 br1 bgg it fmp" style=" color:#ff0000"> (Continue on separate sheet if necessary) </td>
            </tr>
            <tr class="h40">
                <td colspan="3" class="bgg bl1 br1 fmp tc t700 it bb1"> SIGNATURE </td>
                <td colspan="6" class="br1 bgw t700 tc fmp bb1"> &nbsp; </td>
                <td colspan="2" class="bgg br1 bb1 tc t700 fmp it"> DATE </td>
                <td colspan="3" class="br1 bb1 tc t700 bgw fmp"> &nbsp; </td>
            </tr>
            <tr class="h10">
                <td colspan="14" class="fa8 f7 fmp tr it"> <span></span>CS FORM 212 (Revised 2017), Page 1 of 4 </td>
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
        const vocational = computed(function(){
            if(officerecord.value.pdseducationalbackgroundtertiary){
                return officerecord.value.pdseducationalbackgroundtertiary.filter(
                    (or) => (or.tertiary_type && or.tertiary_type == 1)
                );
            }            
        });
        const college = computed(function(){
            if(officerecord.value.pdseducationalbackgroundtertiary){
                return officerecord.value.pdseducationalbackgroundtertiary.filter(
                    (or) => (or.tertiary_type && or.tertiary_type == 2)
                );
            }            
        });
        const gradstudies = computed(function(){
            if(officerecord.value.pdseducationalbackgroundtertiary){
                return officerecord.value.pdseducationalbackgroundtertiary.filter(
                    (or) => (or.tertiary_type && or.tertiary_type == 3)
                );
            }            
        });

        return{
            errors,
            officerecord,
            moment,
            vocational,
            college,
            gradstudies
            
        }
    }
}


</script>