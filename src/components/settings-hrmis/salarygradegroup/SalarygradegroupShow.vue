<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <ul class="ulwidback">
                <li>
                    <router-link :to="{ name: 'salarygradegroup.index' }" class="btn btn-back" title="Return to List"><i class="fa-solid fa-arrow-left"></i></router-link>
                </li>  
                <li>
                    <h2>{{salarygradegroup.name}}</h2>
                </li>
            </ul>
            
        </div>
    </div>
	<div class="row" v-if="authuser.roles">
        <div class="col" v-if="authuser.roles[0].slug == 'super-admin'">
            <div class="form-group">
                <input type="text" name="inputSearch"  placeholder="search..." class="form-control border-blue" v-model="searchQuery">
            </div>
        </div>

    </div>
	<table class="mtable hasActions mt-2 mb-2 table">
            <thead>
                <tr>
                    <th @click="sortTable('name')">Name
                        <span v-if="sortColumn == 'name'" class="material-icons">{{arrowIconName}}</span>
                        <span v-else class="material-icons">sort</span>
                    </th>
                    <th>Step 1</th>
                    <th>Step 2</th>
                    <th>Step 3</th>
                    <th>Step 4</th>
                    <th>Step 5</th>
                    <th>Step 6</th>
                    <th>Step 7</th>
                    <th>Step 8</th>
                </tr>
            </thead>                
            <tbody>

                <template v-if="salarygradegroup.salarygrades">
                    <tr v-for="salarygrade in filteredSalarygradeGroups" :key="salarygrade.id">
                        <td>{{salarygrade.name}}</td>
                        <template v-if="salarygrade.salarygradesteps">
                            <td v-for="step in salarygrade.salarygradesteps">
                                {{formatPrice(step.value)}}
                            </td>
                        </template>     
                    </tr>
                </template>
            </tbody>
        </table>

</template>

<script>

	import useSalaryGradeGroup from '@/composables/composables-salarygradegroup';
    import useUsers from '@/composables/userscomposables';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import { useHead } from '@unhead/vue'

	export default{
        props: {
            id: {
                required: true,
                type: String
            }

        },
		setup(props){
            useHead({
                title: 'Settings - Salary Grade | BFAR - CAR HRMIS'
            })
            const swal = inject('$swal')            
			const {salarygradegroup, getSalaryGradeGroup, destroySalaryGradeGroup} = useSalaryGradeGroup()
            const {authuser, getAuthuser} = useUsers()
            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const router = useRouter()
			
			const formatPrice = (value) =>  {
		        let val = (value/1).toFixed(2);
		        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		    }
            const filteredSalarygradeGroups = computed(() =>{
                    
                   return salarygradegroup.value.salarygrades.filter( 
                        (salarygrade) => salarygrade.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                                        
                      );
            });

 
            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredSalarygradeGroups.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredSalarygradeGroups.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(() => {
                getSalaryGradeGroup(props.id),
                getAuthuser()
            })
    
    

			return {
		
                salarygradegroup,
                filteredSalarygradeGroups,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                formatPrice,
                authuser

			}
		}
	}
</script>