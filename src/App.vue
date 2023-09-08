<template> 
  <template v-if="loggedin">
    <TopNavigation/>
    <div class="mainwrap">
      <LeftNavigation/>

    <main class="content-wrap">
      <RouterView />
    </main>
  </div>
  </template>
  <template v-else>
    <main>
      <RouterView />
    </main>
  </template>
</template>

<script>
  import useEventsBus from '@/components/helper/Eventbus';

  import {ref,watch,onMounted} from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import LeftNavigation from '@/components/navigation/LeftNavigation.vue'
  import TopNavigation from '@/components/navigation/TopNavigation.vue'
  import { useAuthStore } from '@/stores/store.js'

  export default{
    components: {
      LeftNavigation,
      TopNavigation
    },
    setup(){
      const {bus}=useEventsBus()
      const loggedin = ref(false);
      const store = useAuthStore();

      onMounted(() =>{
            if(store.details){
              loggedin.value = true;
            }
        })

        watch(()=>bus.value.get('isLoggedin'), (val) => {
            [loggedin.value] = val ?? []             
        })

        return{
          loggedin
        }
    }
  }
</script>

