<template>	 
    <div class="row w-right-nav">
        <div class="col leftpdscontent ptpb">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="rff fs-3">References and Other Information</h2>
                    <div class="pdsupdatedtime mb-2">
                        <template v-if="officerecord.pdspersonalinformation">
                            <span v-if="officerecord.pdspersonalinformation.updated_at">
                                Updated as of {{moment(officerecord.pdspersonalinformation.updated_at).format('MMMM D, YYYY [at] h:mm A')}}
                            </span>
                        </template>
                    </div>                   
                </div>
            </div>   
            <form v-on:submit.prevent="savepds">       
                
                    <div class="pPDSwrap container-fluid pb-4">
                        <template v-if="officerecord.pdslastinformation">
                            <div class="row mt-2 mb-1">
                                <div class="col">
                                    <p class="mb-0">34. Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or Department where you will be apppointed,</p>
                                </div>
                            </div>
                            <div class="row d-flex">
                                <div class="col-auto">
                                    <p class="mb-0">a. within the third degree?</p>
                                </div>
                                <div class="col">
                                    <ul class="list-unstyled">
                                        <li>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_affinity_thirddegree" id="trd-yes" v-model="officerecord.pdslastinformation.li_affinity_thirddegree" value="1">
                                              <label class="form-check-label" for="trd-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_affinity_thirddegree" id="trd-no" v-model="officerecord.pdslastinformation.li_affinity_thirddegree" value="0">
                                              <label class="form-check-label" for="trd-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">b. within the fourth degree (for Local Government Unit - Career Employees)?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_affinity_fourthdegree" id="fth-yes" v-model="officerecord.pdslastinformation.li_affinity_fourthdegree" value="1">
                                              <label class="form-check-label" for="fth-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_affinity_fourthdegree" id="fth-no" v-model="officerecord.pdslastinformation.li_affinity_fourthdegree" value="0">
                                              <label class="form-check-label" for="fth-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_affinity_fourthdegree == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_affinity_fourthdegree_details" v-model="officerecord.pdslastinformation.li_affinity_fourthdegree_details">
                                                <label>If YES, give details: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">35. a. Have you ever been found guilty of any administrative offense?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_adminoffense" id="admin-yes" v-model="officerecord.pdslastinformation.li_adminoffense" value="1">
                                              <label class="form-check-label" for="admin-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_adminoffense" id="admin-no" v-model="officerecord.pdslastinformation.li_adminoffense" value="0">
                                              <label class="form-check-label" for="admin-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_adminoffense == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_adminoffense_details" v-model="officerecord.pdslastinformation.li_adminoffense_details">
                                                <label>If YES, give details: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="ps-4 mb-0">b. Have you been criminally charged before any court?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_courtcharged" id="crt-yes" v-model="officerecord.pdslastinformation.li_courtcharged" value="1">
                                              <label class="form-check-label" for="crt-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_courtcharged" id="crt-no" v-model="officerecord.pdslastinformation.li_courtcharged" value="0">
                                              <label class="form-check-label" for="crt-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <template  v-if="officerecord.pdslastinformation.li_courtcharged == 1">
                                            <li class="col">                                   
                                                <div class="form-floating">
                                                    <input type="text" placeholder="text" class="form-control fcmNB" name="li_courtcharged_details" v-model="officerecord.pdslastinformation.li_courtcharged_details">
                                                    <label>If YES, give details: </label>
                                                </div>
                                            </li>
                                            <li class="col ">                                            
                                                <Datepicker class="date-form-floating" v-model="officerecord.pdslastinformation.li_courtcharged_date" auto-apply :enable-time-picker="false" name="startdate" placeholder="Date Filed"></Datepicker>
                                            </li>
                                            <li class="col">                                            
                                                <div class="form-floating">
                                                    <input type="text" placeholder="text" class="form-control fcmNB" name="li_courtcharged_details" v-model="officerecord.pdslastinformation.li_courtcharged_status">
                                                    <label>Status of Case/s:</label>
                                                </div>
                                            </li>

                                        </template>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">36. Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_crime" id="cnvicted-yes" v-model="officerecord.pdslastinformation.li_crime" value="1">
                                              <label class="form-check-label" for="cnvicted-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_crime" id="cnvicted-no" v-model="officerecord.pdslastinformation.li_crime" value="0">
                                              <label class="form-check-label" for="cnvicted-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_crime == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_crime_details" v-model="officerecord.pdslastinformation.li_crime_details">
                                                <label>If YES, give details: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">37. Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls,<br/>dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_resignation" id="resig-yes" v-model="officerecord.pdslastinformation.li_resignation" value="1">
                                              <label class="form-check-label" for="resig-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_resignation" id="resig-no" v-model="officerecord.pdslastinformation.li_resignation" value="0">
                                              <label class="form-check-label" for="resig-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_resignation == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_resignation_details" v-model="officerecord.pdslastinformation.li_resignation_details">
                                                <label>If YES, give details: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">38. a. Have you ever been a candidate in a national or local election held within the last year (except Barangay election)?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_election" id="election-yes" v-model="officerecord.pdslastinformation.li_election" value="1">
                                              <label class="form-check-label" for="election-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_election" id="election-no" v-model="officerecord.pdslastinformation.li_election" value="0">
                                              <label class="form-check-label" for="election-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_election == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_affinity_fourthdegree_details" v-model="officerecord.pdslastinformation.li_election_details">
                                                <label>If YES, give details: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0 ps-4">b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or local candidate?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_resignation_service" id="resserv-yes" v-model="officerecord.pdslastinformation.li_resignation_service" value="1">
                                              <label class="form-check-label" for="resserv-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_resignation_service" id="resserv-no" v-model="officerecord.pdslastinformation.li_resignation_service" value="0">
                                              <label class="form-check-label" for="resserv-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_resignation_service == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_affinity_fourthdegree_details" v-model="officerecord.pdslastinformation.li_resignation_service_details">
                                                <label>If YES, give details: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">39. Have you acquired the status of an immigrant or permanent resident of another country?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_immigrant" id="immig-yes" v-model="officerecord.pdslastinformation.li_immigrant" value="1">
                                              <label class="form-check-label" for="immig-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_immigrant" id="immig-no" v-model="officerecord.pdslastinformation.li_immigrant" value="0">
                                              <label class="form-check-label" for="immig-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_immigrant == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_immigrant_details" v-model="officerecord.pdslastinformation.li_immigrant_details">
                                                <label>If YES, give details (country): </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row mt-2 mb-1">
                                <div class="col">
                                    <p class="mb-0">40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items: </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">a. Are you a member of any indigenous group?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_indigineous" id="indi-yes" v-model="officerecord.pdslastinformation.li_indigineous" value="1">
                                              <label class="form-check-label" for="indi-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_indigineous" id="indi-no" v-model="officerecord.pdslastinformation.li_indigineous" value="0">
                                              <label class="form-check-label" for="indi-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_indigineous == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_indigineous" v-model="officerecord.pdslastinformation.li_indigineous_details">
                                                <label>If YES, please specify: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">b. Are you a person with disability?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_disability" id="dis-yes" v-model="officerecord.pdslastinformation.li_disability" value="1">
                                              <label class="form-check-label" for="dis-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_disability" id="dis-no" v-model="officerecord.pdslastinformation.li_disability" value="0">
                                              <label class="form-check-label" for="dis-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_disability == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_disability_details" v-model="officerecord.pdslastinformation.li_disability_details">
                                                <label>If YES, please specify ID No.: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto d-flex align-items-center mh-75">
                                    <p class="mb-0">c. Are you a solo parent?</p>
                                </div>
                                <div class="col mh-75 d-flex align-items-center">
                                    <ul class="list-unstyled row mw-100 mb-0">
                                        <li class="col-auto d-flex align-items-center">
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_soloparent" id="solo-yes" v-model="officerecord.pdslastinformation.li_soloparent" value="1">
                                              <label class="form-check-label" for="solo-yes">
                                                Yes
                                              </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input" type="radio" name="li_soloparent" id="solo-no" v-model="officerecord.pdslastinformation.li_soloparent" value="0">
                                              <label class="form-check-label" for="solo-no">
                                                No
                                              </label>
                                            </div>
                                        </li>
                                        <li class="col" v-if="officerecord.pdslastinformation.li_soloparent == 1">                                            
                                            <div class="form-floating">
                                                <input type="text" placeholder="text" class="form-control fcmNB" name="li_soloparent_details" v-model="officerecord.pdslastinformation.li_soloparent_details">
                                                <label>If YES, please specify ID No.: </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                        <div class="row mt-3 mb-3 headingtitle">
                            <div class="c_p col pPDSwrap-title text-left">
                                <h2>References</h2>                                
                            </div>
                        </div>                   
                        <template v-if="officerecord.pdslastinformationreferences">
                            <template v-for="(div, key) in divs">      
                                <div class="row mb-2 mt-2 cmpads sss" >                                        
                                    <div class="col col-sm-3 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="li_reference_name" class="form-control" placeholder="enter reference name" v-model="officerecord.pdslastinformationreferences[key].li_reference_name">   
                                            <label class="form-label">Name</label>
                                        </div>
                                    </div> 
                                    <div class="col col-sm-6 c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="li_reference_address" class="form-control" placeholder="enter reference address" v-model="officerecord.pdslastinformationreferences[key].li_reference_address">   
                                            <label class="form-label">Address</label>
                                        </div>
                                    </div> 
                                    <div class="col c_p">
                                        <div class="form-floating">                                    
                                            <input type="text" name="li_reference_telno" class="form-control" placeholder="enter reference telephone number" v-model="officerecord.pdslastinformationreferences[key].li_reference_telno">   
                                            <label class="form-label">Telephone No.</label>
                                        </div>
                                    </div>                                      
                                    
                                    <div class="col-auto pt-2">
                                        <button class="btn btn-danger" title="Remove row" @click.prevent="removerow(key)"><i class="fa-solid fa-minus"></i></button>
                                    </div>                                    
                                </div>       

                            </template>   
                            <div class="row  mb-2">
                                <div class="col text-center">
                                    <button class="btn btn-primary" @click.prevent="addreference">+ Add Reference</button>
                                </div>
                            </div>             
                        </template>                 
                        <template v-if="officerecord.pdslastinformation">
                            <div class="row mt-3 mb-3 headingtitle">
                                <div class="c_p col pPDSwrap-title text-left">
                                    <h2>Government Issued ID <small>(i.e.Passport, GSIS, SSS, PRC, Driver's License, etc.)</small><br/>PLEASE INDICATE ID Number and Date of Issuance </h2>                                
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col mb-2">
                                    <div class="form-floating">                                    
                                        <input type="text" id="li_govissuedid" name="li_govissuedid" class="form-control" placeholder="enter reference name" v-model="officerecord.pdslastinformation.li_govissuedid">   
                                        <label for="li_govissuedid" class="form-label">Government Issued ID:</label>
                                    </div>
                                </div> 
                            </div>                       
                            <div class="row">
                                <div class="col mb-2">
                                    <div class="form-floating">                                    
                                        <input id="li_licenseno" type="text" name="li_licenseno" class="form-control" placeholder="enter reference name" v-model="officerecord.pdslastinformation.li_licenseno">   
                                        <label for="li_licenseno" class="form-label">ID/License/Passport No.:</label>
                                    </div>
                                </div> 
                            </div>
                            <div class="row">
                                <div class="col mb-2">
                                    <div class="form-floating">                                    
                                        <input id="li_placeordate" type="text" name="li_placeordate" class="form-control" placeholder="enter reference name" v-model="officerecord.pdslastinformation.li_placeordate">   
                                        <label for="li_placeordate" class="form-label">Date/Place of Issuance:</label>
                                    </div>
                                </div> 
                            </div>  
                        </template>
                    </div>        
    
            <div class="form-row">
                <div class="col mt-3 text-end">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>
      
        </form>
        </div>


        <RightNavigation :id="id" />

        

    </div>
</template>

<script>

import useOfficerecord from '@/composables/composables-record';
import RightNavigation from '@/components/navigation/RightNavigation.vue';
import { onMounted, ref, inject, onUpdated, reactive} from 'vue';
import moment from 'moment'
import { useAuthStore } from '@/stores/store.js'
import { useHead } from '@unhead/vue'

export default{
    components: {
        RightNavigation
    },
    setup (){
        useHead({
            title: 'PDS References and Other Information | BFAR - CAR HRMIS'
        })
        const store = useAuthStore();
        const id = ref(store.details[0]);

        const swal = inject('$swal')
        const resMun = ref([]);

        const {errors, updateMypdsLastInformationReference, officerecord, getPersonalRecord } = useOfficerecord()


        const divs = reactive([]); //vocational

        const add = ref(0); //vocational


        onMounted(() => {   
            getPersonalRecord(id.value).then(() => {
                for(let x in officerecord.value.pdslastinformationreferences){
   
                    divs.push({
                        id: x,
                    })

                }                

                add.value = divs.length;
            })
        })
        
        const savepds = async () => {
            await updateMypdsLastInformationReference(id.value).then(() => {
                if(!errors.value){
                    swal.fire({
                        toast: true,
                        position: 'top-end',
                        title: 'Successfully Updated',
                        showConfirmButton: false,            
                        icon: 'success',
                        width: '300',
                        padding: '.5em 1em',
                        timerProgressBar: true,
                        timer:1500,
                        customClass: {
                            container: 'swaltopright'
                        }
                    })
                }

            })
            await getPersonalRecord(id.value)
        }

        const addreference =  async() => {
            divs.push({
                id: add.value,
            })
            add.value++;
            officerecord.value.pdslastinformationreferences.push({
                'li_reference_name' : '',
                'li_reference_address' : '',
                'li_reference_telno' : '',
            });

        }

        
        const removerow = async(index) =>{
            officerecord.value.pdslastinformationreferences.splice(index,1);
            divs.splice(index,1);
        }

        


        return{
            errors,
            savepds,
            officerecord,
            moment,
            addreference,
            removerow,
            divs,
            id
        
        }
    }
}


</script>