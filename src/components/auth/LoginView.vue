<template>
     
        <div class="container">
        <div class="loginPage align-items-center">
            <div class="row justify-content-center ">
                <div class="col-12 text-center mt-3">
                    <div class="webHead">
                        <a href="https://bfarcar.da.gov.ph/" target="_blank" title="Bureau of Fisheries and Aquatic Resources Cordillera Administrative Region">
                            <img class="img-res" src="/img/bfarr1.png" alt="BFAR">
                        </a>
                    </div>
                </div>     
                <div class="col-12 col-xxl-8  mt-2 webHead-text text-center">
                    <span>BUREAU OF FISHERIES AND AQUATIC RESOURCES</span>
                    <span>Cordillera Administrative Region</span>
                </div>   
            </div>
            <div class="row justify-content-center">        
                <div class="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 loginwrap align-items-center d-flex">     
                    <div class="formwrap mt-4 bb bg-w">                
                        <h1>Regional Integrated<br/>Online System</h1>
                        <form id="loginForm" @submit.prevent="AuthLogin">                                                               
                                <div class="form-floating mb-3">
                                    <input id="username" type="username" class="form-control" name="username" :class="errors.username ? 'is-invalid' : ''" v-model="auth.username" placeholder="Username" autocomplete="username" autofocus>                        
                                    <label for="username">Username</label>                  
                                    <span class="input-group-prepend"><i class="fa-solid fa-user-tie"></i></span>
                                    <span v-if="errors.username" class="text-danger m-error">{{errors.username[0]}}</span>
                                </div>  
                    
                            <div class="form-floating mb-3">
                                
                                <input id="password" type="password" class="form-control" name="password" v-model="auth.password" :class="errors.password ? 'is-invalid' : ''" autocomplete="password" placeholder="Password">
                                <label class="pwlabel" for="password">Password</label>
                                <span class="input-group-prepend plock"><i class="fa-solid fa-lock"></i></span>                                
                                <div class="input-group-append passwordEye">
                                    <span class="input-group-text" @click="password_show_hide">
                                      <i class="fas fa-eye" id="show_eye"></i>
                                      <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                                    </span>
                                </div>

                                <span v-if="errors.password" class="text-danger m-error">{{errors.password[0]}}</span>
                            </div>        
                            <div class="btn-loginwrap">
                                <button type="submit" class="btn btn-login">
                                    LOGIN
                                </button>
                            </div>                    
                        </form>                                
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <SiteSeal/> -->
</template>
<script>

    import {reactive} from 'vue'
    import SiteSeal from '@/components/content/SiteSeal.vue';
    import useEventsBus from '@/components/helper/Eventbus';
    import useAuthenticate from '@/composables/composables-authenticate';
    import { useHead } from '@unhead/vue'
    export default{
        components:{
            SiteSeal
        },
        setup(){
            useHead({
                title: 'BFAR - CAR HRMIS | Login'
            })


            const {login,errors} = useAuthenticate();
            const {emit} = useEventsBus();
            const auth = reactive({
                'username': '',
                'password': ''
            });

            const AuthLogin = async() =>{
                await login({...auth});

            }
            const password_show_hide = async() =>{
                var x = document.getElementById("password");
                  var show_eye = document.getElementById("show_eye");
                  var hide_eye = document.getElementById("hide_eye");
                  hide_eye.classList.remove("d-none");
                  if (x.type === "password") {
                    x.type = "text";
                    show_eye.style.display = "none";
                    hide_eye.style.display = "block";
                  } else {
                    x.type = "password";
                    show_eye.style.display = "block";
                    hide_eye.style.display = "none";
                  }
            }
            return{
                auth,
                AuthLogin,
                password_show_hide,
                errors
            }
        }
    }
</script>