<template> 
  <template v-if="loggedin">
    <TopNavigation/>
    <div class="mainwrap" :class="changed == true ? '' : 'nosidebar'">
      <LeftNavigation/>
      <main class="content-wrap">
        <div class="container-fluid">
          <RouterView :key="$route.fullPath"/>
        </div>
      </main>
    </div>
  </template>
  <template v-else>
    <main class="guest">
      <RouterView/>
    </main>
  </template>
  <Footer/>
</template>

<script>
  import useEventsBus from '@/components/helper/Eventbus';
  import {ref,watch,onMounted} from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import LeftNavigation from '@/components/navigation/LeftNavigation.vue'
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import { useAuthStore } from '@/stores/store.js'
  import Footer from '@/components/content/Footer.vue';
  import { usePasswordChange } from '@/stores/changepasswordstore.js'

  export default{
    components: {
      LeftNavigation,
      TopNavigation,
      Footer
    },
    setup(){
      const {bus}=useEventsBus()
      const loggedin = ref(false);
      const store = useAuthStore();
      const changepasswordstore = usePasswordChange();
      const changed = ref(changepasswordstore.passwordstate);



      onMounted(() =>{
            if(store.details){
              loggedin.value = true;
            }
        })
        watch(()=>bus.value.get('isLoggedin'), (val) => {
            [loggedin.value] = val ?? []             
        })
        watch(()=>bus.value.get('isChanged'), (val) => {
            [changed.value] = val ?? []
        })
        return{
          loggedin,
          changed
        }
    }
  }
</script>

