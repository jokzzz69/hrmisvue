<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Biometrics</h2>
        </div>
    </div>
	<div class="row">
        <div class="col col-md-8 col-sm-12 col-lg-6 col-xl-5 col-xxl-3">
            <div class="actionsWrap border-blue pt-3 pb-3 ps-3 pe-3">
                <span class="actionsWrapTitle"><i class="fa-solid fa-tachograph-digital"></i> Main</span>
                <ul class="list-unstyled mb-0 ls-flp">
                    <li class="mb-3">
                        <ul class="list-unstyled mb-0 ls-fl">
                            <li>
                                <form  @submit.prevent="getTimeMAIN">
                                    <button type="submit" class="btn btn-blue mt-3">Refresh <i class="fa-solid fa-arrows-rotate"></i></button>
                                </form>
                            </li>
                            <li>
                                <div class="form-floating">
                                    <label class="form-control bb-1">
                                        <template v-if="mainbio">
                                            {{moment(mainbio.time).format('llll')}}
                                        </template>
                                        <template v-else>
                                            <span class="text-danger">Can't Connect to Main Biometrics</span>
                                        </template>
                                    </label>
                                    <label>Saved Time</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>                        
                        <form  @submit.prevent="setTimeMAIN">
                            <button type="submit" class="btn btn-outline-success alw-100">Update Time</button>
                        </form> 
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="col col-md-8 col-sm-12 col-lg-6 col-xl-5 col-xxl-3">
            <div class="actionsWrap border-blue pt-3 pb-3 ps-3 pe-3">
                <span class="actionsWrapTitle"><i class="fa-solid fa-tachograph-digital"></i> RFIMC</span>
                <ul class="list-unstyled mb-0 ls-flp">
                    <li class="mb-3">
                        <ul class="list-unstyled mb-0 ls-fl">
                            <li>
                                <form @submit.prevent="getTimeRFIMC">
                                    <button type="submit" class="btn btn-blue mt-3">Reload <i class="fa-solid fa-arrows-rotate"></i></button>    
                                </form>
                            </li>
                            <li>
                                <div class="form-floating">
                                    <label class="form-control bb-1">
                                        <template v-if="rfimcbio">
                                            {{moment(rfimcbio.time).format('llll')}}
                                        </template>
                                        <template v-else>
                                            <span class="text-danger">Can't Connect to RFIMC Biometrics</span>
                                        </template>
                                    </label>
                                    <label>Saved Time</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>                        
                        <form  @submit.prevent="setTimeRFIMC">
                            <button type="submit" class="btn btn-outline-success alw-100">Update Time</button>
                        </form> 
                    </li>
                </ul>
            </div>            
        </div>
        <div class="col col-md-8 col-sm-12 col-lg-6 col-xl-5 col-xxl-3">
            <div class="actionsWrap border-blue pt-3 pb-3 ps-3 pe-3">
                <span class="actionsWrapTitle"><i class="fa-solid fa-tachograph-digital"></i> FMRED</span>
                <ul class="list-unstyled mb-0 ls-flp">
                    <li class="mb-3">
                        <ul class="list-unstyled mb-0 ls-fl">
                            <li>
                                <form  @submit.prevent="getTimeFMRED">
                                    <button type="submit" class="btn btn-blue mt-3">Reload <i class="fa-solid fa-arrows-rotate"></i></button>
                                </form>
                            </li>
                            <li>
                                <div class="form-floating">
                                    <label class="form-control bb-1">
                                        <template v-if="fmredbio">
                                            {{moment(fmredbio.time).format('llll')}}
                                        </template>
                                        <template v-else>
                                            <span class="text-danger">Can't Connect to FMRED Biometrics</span>
                                        </template>
                                    </label>
                                    <label>Saved Time</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>                        
                        <form  @submit.prevent="setTimeFMRED">
                            <button type="submit" class="btn btn-outline-success alw-100">Update Time</button>
                        </form> 
                    </li>
                </ul>
            </div>            
        </div>
        <div class="col col-md-8 col-sm-12 col-lg-6 col-xl-5 col-xxl-3">
            <div class="actionsWrap border-blue pt-3 pb-3 ps-3 pe-3">
                <span class="actionsWrapTitle"><i class="fa-solid fa-tachograph-digital"></i> PFO Benguet</span>
                <ul class="list-unstyled mb-0 ls-flp">
                    <li class="mb-3">
                        <ul class="list-unstyled mb-0 ls-fl">
                            <li>
                                <form  @submit.prevent="getTimeBENGUET">
                                    <button type="submit" class="btn btn-blue mt-3">Reload <i class="fa-solid fa-arrows-rotate"></i></button>
                                </form>
                            </li>
                            <li>
                                <div class="form-floating">
                                    <label class="form-control bb-1">
                                        <template v-if="benguetbio">
                                            {{moment(benguetbio.time).format('llll')}}
                                        </template>
                                        <template v-else>
                                            <span class="text-danger">Can't Connect to FMRED Biometrics</span>
                                        </template>
                                    </label>
                                    <label>Saved Time</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>                        
                        <form  @submit.prevent="setTimeBENGUET">
                            <button type="submit" class="btn btn-outline-success alw-100">Update Time</button>
                        </form> 
                    </li>
                </ul>
            </div>            
        </div>
    </div>

</template>

<script>
	import useBioDevice from '../../composables/composables-biometricsdevice';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    import { useHead } from '@unhead/vue'

	export default{
		setup(){
            useHead({
                title: 'Biometrics | BFAR - CAR HRMIS'
            })
            const {getPage, 
                batch, 
                getBioTimeMain, 
                setBioTimeMain, 
                mainbio, 
                errors, 
                getBioTimeRFMIC, 
                setBioTimeRFMIC,
                rfimcbio,
                getBioTimeFMRED,
                setBioTimeFMRED,
                fmredbio,
                getBioTimeBENGUET,
                setBioTimeBENGUET,                
                benguetbio,
                currRFMIC,
                currFMRED,
                currBENGUET


            } = useBioDevice();
            const swal = inject('$swal')

            onMounted(() => {
                getBioTimeMain(),
                currRFMIC(),
                currFMRED(),
                currBENGUET()
            })
            const getTimeMAIN = async () => {
               await getBioTimeMain();
            }

            const setTimeMAIN = async () => {
                await setBioTimeMain().then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated Main Biometrics',
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
                });
                getBioTime();
            }
            const setTimeRFIMC = async() => {
                await setBioTimeRFMIC().then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated RFIMC Biometrics',
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
                });
            }
            const setTimeFMRED = async() => {
                await setBioTimeRFMIC().then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated FMRED Biometrics',
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
                });
            }
            const setTimeBENGUET = async() => {
                await setBioTimeRFMIC().then(() => {
                    if(!errors.value){
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Updated PFO Benguet Biometrics',
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
                });
            }
            


            const getTimeRFIMC = async () => {
                await getBioTimeRFMIC();
                setTimeout(function(){
                    currRFMIC();
                },25000)
            }
            const getTimeFMRED = async () => {
                await getBioTimeFMRED();
                setTimeout(function(){
                    currFMRED();
                },25000)
            }
            const getTimeBENGUET = async () => {
                await getBioTimeBENGUET();
            }
           return{
            getTimeMAIN,
            setTimeMAIN,
            setTimeRFIMC,
            setTimeFMRED,
            setTimeBENGUET,
            mainbio,
            moment,
            errors,
            getTimeRFIMC,
            getTimeFMRED,
            getTimeBENGUET,
            rfimcbio,
            fmredbio,
            benguetbio
           }
		}
	}
</script>