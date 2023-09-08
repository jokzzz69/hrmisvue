<template>
	<nav class="top-navbar navbar navbar-expand-md navbar-light fixed-top bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" id="sidenavtoggler" data-bs-toggle="collapse" data-bs-target="#sidenavcollapse" aria-controls="sidenavcollapse" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars"></i>
    </button>

    <a :href="$router.resolve({name: 'recordpersonal.show'}).href" class="navbar-brand"><span class="nb-mob">HRMIS</span><span class="nb-de">Human Resource Management Information System</span></a>

        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav me-auto">

        </ul>

        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ms-auto">
            <!-- Authentication Links -->
            <li class="nav-item me-3 d-flex align-items-center">
                <div class="text-light pstTime d-none d-sm-block pe-3 ps-3">                   
                    <span id="datestring"></span>
                    <span id="timestring"></span>
                </div>
                
            </li>
            
            <li class="nav-item dropdown">
                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                    NAME                    
                </a>

                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <ul class="ul-dptop">
                        <li>

                            <router-link  class="dropdown-item" :to="{ name: 'profile.edit' }"> Change Password</router-link>            
                        </li>
                        <li>
                            <a class="nav-link" href="#" @click="signout">Sign out</a>
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

	export default{

		setup(){
			const {emit}=useEventsBus()
			const {logout} = useAuthenticate();

			const signout = async () => {
				await logout().then(res => {
				  emit('isLoggedin', false);
				});
			}
			return{
				signout
			}
		}
	}
</script>