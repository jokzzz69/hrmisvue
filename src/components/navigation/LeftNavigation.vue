<template>
  <aside class="sidebarleft">  
    <nav id="sidenav" class="flex-column flex-shrink-0 pt-3 pb-5 ps-2 text-white" >
      <div id="sidenavcollapse">
      <ul class="nav nav-pills flex-column mb-auto leftnav-wrap">       

       <template v-if="userslug == 'super-admin' || userslug == 'admin'">
         <AdminNavigation/>
       </template>
       <template v-else-if="userslug == 'hr'">
         <HrNavigation/>
       </template>
       <template v-else-if="userslug == 'employee' || userslug == 'office-head'">
         <EmployeeNavigation/>
       </template>

        <li class="nav-link">
            <router-link :to="{ name: 'about.index' }"><i class="fa-solid fa-circle-info"></i> About</router-link>
        </li>
      </ul>
    </div>
  </nav>
  </aside>
</template>
<script>
  import {ref} from 'vue'
  import { useAuthStore } from '@/stores/store.js'
  import AdminNavigation from '@/components/navigation/AdminNavigation.vue';
  import HrNavigation from '@/components/navigation/HrNavigation.vue';
  import EmployeeNavigation from '@/components/navigation/EmployeeNavigation.vue';
  export default{
    components: {
      AdminNavigation,
      HrNavigation,
      EmployeeNavigation
    },
    setup(){
      const store = useAuthStore();

      const userslug = ref(store.details[1]);

      return {
        userslug
      }
    }
  }
</script>