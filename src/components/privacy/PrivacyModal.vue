<template>
	<div v-if="showModal" class="modal-mask maintenance">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <div class="col text-center">
            	<h1>UNDER<br/>MAINTENANCE</h1>
            </div>
          </div>  

          <div class="modal-body">
              <h1 class="text-center">
                <i class="fa-solid fa-person-digging"></i>
              </h1>
          </div>
          <div class="modal-footer justify-center">              
          	<ul class="list-unstyled ul-inlineblock">
          		<li class="me-2" v-if="userslug.includes('super-admin')">
                <form v-on:submit.prevent="acceptFunc">
                  <button class="btn btn-outline-success">I Agree</button>
                </form>                
              </li>
          		<li>      
          				<button class="btn btn-dark" @click="logoutFunc">Close</button>     			
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
  import { useAuthStore } from '@/stores/store.js'

  import useAuthenticate from '@/composables/composables-authenticate';
  import useEventsBus from '@/components/helper/Eventbus';
  import { usePrivacyStore } from '@/stores/pristore.js'



	export default {
		setup(){
      const {bus,emit}=useEventsBus()
      const {logout} = useAuthenticate();
      const store = useAuthStore();
      const userslug = ref(store.details[1]);
			const {logoutuser,acceptPrivacy, privacy, getPrivacy} = useUsers()
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
        showModal,
        userslug
      }
		}

	}
</script>