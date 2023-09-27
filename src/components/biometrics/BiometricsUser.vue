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
    <table class="mtable mt-2 mb-2 table">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>                     
                </tr>
            </thead>

            <tbody>
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
            </tbody>
        </table>
</template>

<script>
	import useBioDevice from '../../composables/composables-biometricsdevice';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'

	export default{
		setup(){
            useHead({
                title: 'Biometrics Registered | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')
            
			const {mainbiousers, getmainbiometricsuser } = useBioDevice()

            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const router = useRouter()
			
            onMounted(() => {
                getmainbiometricsuser().then(res => {

                })
            })

            const getBioUsers = async () =>{
                await getmainbiometricsuser();

            }

            

			return {
                getBioUsers,
                mainbiousers
			}
		}
	}
</script>