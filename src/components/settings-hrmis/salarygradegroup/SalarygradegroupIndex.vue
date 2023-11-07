<template>
    <div class="row">
        <div class="col col-w-settings">
            <div class="row">
                <div class="col-md-12 p-title">
                    <h2>Salary Grades</h2>
                </div>
            </div>
            <div class="row">

                <div class="col-auto" v-if="authuser.roles">
                    <template v-if="authuser.roles[0].slug == 'super-admin'">
                        <router-link :to="{ name: 'salarygradegroup.create' }" title="Create New" class="btn btn-blue">New Salary Grade <i class="fa-solid fa-plus"></i></router-link>
                    </template>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>

            </div>
            <table class="mtable hasActions mt-2 mb-2 table tbllink">
                    <thead>
                        <tr>
                            <th @click="sortTable('name')">Name
                                <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                                <span v-else class="material-icons">sort</span>
                            </th>     
                            <th></th>             
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="salarygradegroup in filteredSalaryGradeGroups" :key="salarygradegroup.id">
                            <tr @click="goshow(salarygradegroup.id,salarygradegroup.name)">
                                <td>
                                    {{ salarygradegroup.name }}
                                </td>
                                <td @click.stop>
                                    <ul v-if="userrole == 'super-admin'" class="ls-frmbutton text-end">
                                        <li><button title="delete" class="btn btn-outline-danger" @click="deleteSalaryGradeGroup(salarygradegroup.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
                                    </ul>                           
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
        </div>
        <RightNavHrmis/>
    </div>
</template>

<script>
	import useSalaryGradeGroup from '@/composables/composables-salarygradegroup';
    import useUsers from '@/composables/userscomposables';

    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useAuthStore } from '@/stores/store.js'
    import { useHead } from '@unhead/vue'
    import RightNavHrmis from '@/components/navigation/RightNavHrmis.vue';

	export default{
        components: {
            RightNavHrmis
        },
		setup(){
            useHead({
                title: 'Settings - Salary Grades | BFAR - CAR HRMIS'
            })
            const store = useAuthStore();
            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);
            const swal = inject('$swal')            
			const {salarygradegroups, getSalaryGradeGroups, destroySalaryGradeGroup} = useSalaryGradeGroup()
            const {authuser,getAuthuser} = useUsers()
            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);

            const router = useRouter()



            const filteredSalaryGradeGroups = computed(function(){
                return salarygradegroups.value.filter(
                    (salarygradegroup) => salarygradegroup.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });
            

            const sortTable = (columnName) => {
        
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredSalaryGradeGroups.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredSalaryGradeGroups.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() => {
                getSalaryGradeGroups(),
                getAuthuser()
            })

            const deleteSalaryGradeGroup = async (id) =>{
                
                let x = 0; //trigger

                await swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {         
                    x = 1;
                  }
                })
                if (x > 0) {

                    await destroySalaryGradeGroup(id);
                    await getSalaryGradeGroups().then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Successfully Deleted',
                            showConfirmButton: false,            
                            icon: 'success',
                            width: '300',
                            padding: '.5em 1em',
                            timerProgressBar: true,
                            timer:1500,
                            customClass: {
                                container: 'swaltopright-del'
                            }
                        })
                    })
                }
                
            }

            const goshow = (id,title) => {
               router.push({name: 'salarygradegroup.show', params: { id: id }});
            }

			return {	
                filteredSalaryGradeGroups,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteSalaryGradeGroup,
                goshow,
                authuser,
                authid,
                userrole
			}
		}
	}
</script>