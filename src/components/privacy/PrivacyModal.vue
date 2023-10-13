<template>
	<div v-if="showModal" class="modal-mask pvcmodal">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <div class="col">
            	<h3>DATA PRIVACY CONSENT</h3>
            </div>
          </div>  

          <div class="modal-body">
              <p>In compliance with the Data Privacy Act of 2012, (DPA) and its Implementing Rules and Regulations (IRR) effective on October 25 to 26, 2016,</p>
              <p>I agree and authorize the Department of Agriculture - Bureau of Fisheries and Aquatic Resources – Cordillera Administrative Region Human Resource Management Information System (HRMIS) to collect, process and store sensitive personal information of permanent, contract of service and job order personnel of the Department of Agriculture - Bureau of Fisheries and Aquatic Resources – Cordillera Administrative Region. </p>
              <p>Rest assured that all sensitive personal data are safe and secured in the Regional Office ICT servers. These data will not be shared to anyone except designated personnel who are authorized to access the employees consolidated record. Only the account holder can modify the Personal Data Sheet and other personal records. The Human Resource Section can only update, view, monitor and consolidate records for permanent, contract of service and job orders personnel.</p>
              <p>For inquiries, concerns, and complaints, you may contact our Regional Fisheries Information Management Center staff below:</p>
              <div class="row">
              	<div class="col">              		
              		<p><strong>Arnold L. Paleng</strong><br/>OIC / Aquaculturist I<br/></p>
              	</div>
              	<div class="col">              		
              		<p><strong>Albert M. Palma</strong><br/>Network Administrator <br/></p>
              	</div>
              	<div class="col">
              		<p><strong>Joel P. Sangway</strong><br/>System Administrator</p>
              	</div>
              </div>
              <p class="text-muted"><i>Note: It is highly recommended to use a desktop, laptop or similar devices with large screen size considering the display size of data and forms.</i></p>
          </div>
          <div class="modal-footer justify-center">              
          	<ul class="list-unstyled ul-inlineblock">
          		<li class="me-2">
                <form v-on:submit.prevent="acceptFunc">
                  <button class="btn btn-outline-success">I Agree</button>
                </form>                
              </li>
          		<li>
  
          				<button class="btn btn-outline-danger" @click="logoutFunc">I do not agree</button>
     			
          		</li>
          	</ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
	import useUsers from '@/composables/userscomposables';
  import {ref, onMounted} from 'vue';

  import useAuthenticate from '@/composables/composables-authenticate';
  import useEventsBus from '@/components/helper/Eventbus';
  import { usePrivacyStore } from '@/stores/pristore.js'



	export default {
		setup(){
      const {bus,emit}=useEventsBus()
      const {logout} = useAuthenticate();

			const {logoutuser,acceptPrivacy, getUser, user, privacy, getPrivacy} = useUsers()
      const showModal = ref(false)
      const pristore = usePrivacyStore();


      onMounted(() => {

        getPrivacy().then(res => {
          if(privacy.value > 0){
            showModal.value = false
          }else{
            showModal.value = true
          }
        })
      })

      

      
      const acceptFunc = async () => {
          await acceptPrivacy('')  
          showModal.value = false
          pristore.setdil(true);

      }


			const logoutFunc = async () => {
        await logout().then(res => {
          emit('isLoggedin', false);
        });
      }


      return {
      	logoutFunc,
        acceptFunc,
        showModal
      }
		}

	}
</script>