<template>
	<div class="row">
        <div class="col pAgeEmail--title">
            <ul class="pAgeEmail--title__wrap">
                <li class="pAgeEmail--title__content"><h2 class="ps-1">My Locator Slip</h2></li>
            </ul>
        </div>
    </div>
    <div class="row">
    	<div class="col-sm-12 mb-2">
    		<div class="row">
    			<div class="col">
    				<div class="col-auto">
			    		<router-link :to="{ name: 'locatorslips.create' }" class="btn btn-blue">New Locator Slip <i class="fa-solid fa-plus"></i></router-link>
			    	</div>
    			</div>
    		</div>
    	</div>
    </div>
    <div class="row">
        <div class="col-sm-12 fs-5">     
            <div class="bg-mid-trans tblWrap f85 mb-3 pb-3" v-sheight>
                <table class="tbl tblEmail--Wrap communications table wp">
                    <thead>
                        <tr>
                            <th></th>
                            <th><span>Type</span></th>
                            <th><span>Duration</span></th>
                            <th><span>Reason</span></th>                             
                            <th><span>Status</span></th>                                                    
                            <th class="text-end">
                             
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    	
                    </tbody>
                </table>  

            </div>
        </div>
    </div>
</template>
<script>
	import {ref,reactive, onMounted} from 'vue';

	import useLocatorSlips from '@/composables/forms/composables-locatorslip';
	

	export default{
		setup(){
			const {getMyLocatorSlips, locatorslips} = useLocatorSlips();

			onMounted(() => {
				getMyLocatorSlips().then(() => {
					console.log('weee');
				})
			})
			return{
				
			}
		}
	}
</script>