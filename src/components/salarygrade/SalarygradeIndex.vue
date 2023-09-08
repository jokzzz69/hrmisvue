<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2></h2>
        </div>
    </div>
	<div class="row">

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
                <template v-for="salarygrade in filteredSalarygrades" :key="salarygrade.id">
                    <tr>
                        <td>
                            {{ salarygrade.name }}
                        </td>
                        <td>{{ formatPrice(salarygrade.step_1) }}</td>
                        <td>{{ formatPrice(salarygrade.step_2) }}</td>
                        <td>{{ formatPrice(salarygrade.step_3) }}</td>
                        <td>{{ formatPrice(salarygrade.step_4) }}</td>
                        <td>{{ formatPrice(salarygrade.step_5) }}</td>
                        <td>{{ formatPrice(salarygrade.step_6) }}</td>
                        <td>{{ formatPrice(salarygrade.step_7) }}</td>
                        <td>{{ formatPrice(salarygrade.step_8) }}</td>
                      </tr>
                </template>
            </tbody>
        </table>
</template>

<script>
	import useSalaryGrade from '../../composables/composables-salarygrade';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'

	export default{
        props: {
            id: {
                required: true,
                type: String
            }

        },
		setup(props){
            
            const swal = inject('$swal')            
			const {salarygrades, getSalaryGrades, destroySalaryGrades} = useSalaryGrade()
            const searchQuery = ref("");
            const arrowIconName = ref("arrow_drop_up");     
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const router = useRouter()
			
			const formatPrice = (value) =>  {
		        let val = (value/1).toFixed(2);
		        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		    }

            const filteredSalarygrades = computed(function(){
                return salarygrades.value.filter(
                    (salarygrade) =>    salarygrade.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
                                        salarygrade.step_1.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_2.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_3.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_4.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_5.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_6.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_7.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 ||
                                        salarygrade.step_8.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 
                );
            });

            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredSalarygrades.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredSalarygrades.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }

            onMounted(getSalaryGrades(props.id))

            const deleteSalarygrade = async (id) =>{
                
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

                    await destroySalaryGrades(id);
                    await getSalaryGrades().then(() => {
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

    

			return {
		
                filteredSalarygrades,
                sortTable,
                sortColumn,
                arrowIconName,
                sortDirection,
                searchQuery,
                deleteSalarygrade,
                formatPrice,
                props
			}
		}
	}
</script>