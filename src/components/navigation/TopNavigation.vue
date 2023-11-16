<template>
	<nav class="top-navbar navbar navbar-expand-md navbar-light fixed-top bg-light">
  <div class="container-fluid">
    <button class="btn btntopnavbars" type="button" id="sidenavtoggler" @click="displayleftnav">
      <i class="fa-solid fa-bars"></i>
    </button>

    <a :href="$router.resolve({name: 'recordpersonal.show'}).href" class="navbar-brand"><span class="nb-mob">HRMIS</span><span class="nb-de">Regional Integrated Online System</span></a>

        <ul class="navbar-nav ms-auto navbarRight">
            <!-- Authentication Links -->
            <li class="nav-item d-flex align-items-center">
                <div class="text-light pstTime pe-3 ps-3">                   
                    <span id="datestring">{{newDate}}</span>
                    <span id="timestring">{{newTime}}</span>
                </div>
                
            </li>
            <li class="nav-item dropdown" v-if="userslug.includes('communicationencoder') || userslug.includes('communicationviewer') || userslug.includes('super-admin') || userslug.includes('admin')">
                <Notifications/>
            </li>
            <li class="nav-item dropdown">
                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{loggedinName}}</a>

                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <ul class="ul-dptop">
                        <li>

                            <router-link  class="dropdown-item" :to="{ name: 'profile.edit' }"> Change Password</router-link>            
                        </li>
                        <li>
                            <button class="dropdown-item"  @click="signout">Logout</button>
                        </li>
                    </ul>
                </div>
            </li>

        </ul>
    </div>

</nav>

</template>
<script>
	import useAuthenticate from '@/composables/composables-authenticate';
    import useEventsBus from '@/components/helper/Eventbus';
    import {watch,ref, onMounted} from 'vue';
    import { useNavigationStore } from '@/stores/navigationstore.js';
    import { useAuthStore } from '@/stores/store.js'
    import Notifications from '@/components/cm/notifications/Notifications.vue';

	export default{
        components: {
            Notifications
        },
		setup(){
			const {bus,emit}=useEventsBus()
			const {logout} = useAuthenticate();
            const loggedinName = ref();
            const shown = ref();
            const store = useAuthStore();
            const navigationstore = useNavigationStore();
            
            const userslug = ref(store.details[1]);

            watch(()=>bus.value.get('userLoggedIn'), (val) => {
                [loggedinName.value] = val ?? []
            })

            watch(()=>bus.value.get('leftdisplay'), (val) => {
                [shown.value] = val ?? []
            })


			const signout = async () => {
				await logout().then(res => {
				  emit('isLoggedin', false);
				});
			}

            var newTime = ref('');

            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var n = new Date();
            var newDate = ref(day[n.getDay()]+", "+n.getDate()+" "+month[n.getMonth()]+" "+n.getFullYear());            

            const getTime = () => {
                let date = new Date(); 
                let hh = date.getHours();
                let mm = date.getMinutes();
                let ss = date.getSeconds();
                let session = "AM";
                if(hh == 0){
                  hh = 12;
                }
                if(hh > 12){
                  hh = hh - 12;
                  session = "PM";
                }
                hh = (hh < 10) ? "0" + hh : hh;
                mm = (mm < 10) ? "0" + mm : mm;
                ss = (ss < 10) ? "0" + ss : ss; 
                newTime.value = hh + ":" + mm + ":" + ss + " " + session;       
            }

            onMounted(() => {
                setInterval(() => {
                    getTime();
                },1000);
                
                if(!loggedinName.value){
                    loggedinName.value = navigationstore.getname;  
                }      
            })

            const displayleftnav = () => {
                shown.value = !shown.value;
                emit('leftdisplay', shown.value);
            }
            
			return{
				signout,
                loggedinName,
                newDate,
                newTime,
                displayleftnav,
                userslug
			}
		}
	}
</script>