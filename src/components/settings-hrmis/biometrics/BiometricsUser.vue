<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Biometrics User</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <button @click="getBioUsers" class="btn btn-primary">Get Main BIO Users</button>
        </div>
    </div>
    <div class="tblWrap mt-2">
        <table class="mtable table">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>                     
                </tr>
            </thead>

            <tbody>
                <template v-if="!tblloader">
                    <template v-for="biouser in mainbiousers" :key="biouser.uid">
                        <tr>
                            <td>
                                {{ biouser.userid }}
                            </td>
                            <td>                            
                                {{ biouser.name }}
                            </td>
                        </tr>
                    </template>
                    <template v-if="searchQuery">
                        <template v-if="!mainbiousers.length">
                            <tr class="nodata">
                                <td colspan="2">
                                    No Results Found
                                </td>
                            </tr>
                        </template>                         
                    </template>
                    <template v-else>
                        <template v-if="!mainbiousers.length">
                            <tr class="nodata">
                                <td colspan="2">
                                    No Entry!
                                </td>
                            </tr>
                        </template> 
                    </template>  
                </template>
                <template v-else>
                    <tr class="nodata pr">
                        <td colspan="2">
                            <LoadingComponent/>
                        </td>
                    </tr>
                </template>  
                
            </tbody>
        </table>
    </div>
</template>

<script>
	import useBioDevice from '@/composables/composables-biometricsdevice';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'
    import LoadingComponent from '@/components/loader/LoadingComponent.vue'


	export default{
        components: {            
            LoadingComponent
        },
		setup(){
            useHead({
                title: 'Settings - Biometrics Registered | '+import.meta.env.VITE_BFAR_AGENCY
            })
            const swal = inject('$swal')
            
			const {mainbiousers, getmainbiometricsuser } = useBioDevice()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const router = useRouter()
			const tblloader = ref(true);
            onMounted(() => {
                getmainbiometricsuser().then(res => {
                    tblloader.value = false;
                })
            })

            const getBioUsers = async () =>{
                await getmainbiometricsuser();

            }



			return {
                getBioUsers,
                mainbiousers,
                tblloader,
                searchQuery
			}
		}
	}
</script>