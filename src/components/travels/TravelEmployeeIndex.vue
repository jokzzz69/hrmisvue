<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>My Travels</h2>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-auto">
                    <router-link :to="{ name: 'travel.create' }" class="btn btn-blue">New Travel <i class="fa-solid fa-plus"></i></router-link>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" name="inputSearch" placeholder="search..." class="form-control border-blue" v-model="searchQuery">
                    </div>
                </div>
            </div>
            <table class="mtable mt-2 mb-2 table nottbllink">
                <thead>
                    <tr>
                        
                        <th @click="sortTable('travelemployees')">Employee(s)
                            <span v-if="sortColumn == 'travelemployees'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th @click="sortTable('travelordernumber')">Travel Order #
                            <span v-if="sortColumn == 'travelordernumber'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th @click="sortTable('travelstart')">Travel Start
                            <span v-if="sortColumn == 'travelstart'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th @click="sortTable('travelend')">Travel End
                            <span v-if="sortColumn == 'travelend'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th @click="sortTable('location')">Location
                            <span v-if="sortColumn == 'location'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th class="w-25" @click="sortTable('purpose')">Purpose
                            <span v-if="sortColumn == 'purpose'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th @click="sortTable('createdby')">Created By
                            <span v-if="sortColumn == 'createdby'" class="material-icons">{{arrowIconName}}</span>
                            <span v-else class="material-icons">sort</span>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="travel in filteredTravels" :key="travel.id">
                        <tr>
                            <td class="ttc">
                                <template v-if="travel.travelemployees">
                                    <template v-for="(emp,k) in travel.travelemployees" :key="emp.id">      
                                        <template v-if="emp.employee">                  
                                            {{ emp.employee.name }}                     
                                        </template>
                                        <template v-if="k < travel.travelemployees.length - 1">, &nbsp;</template>
                                    </template>                 
                                </template>
                            </td>
                            <td>
                                {{travel.travelordernumber}}
                            </td>
                            <td>
                                <template v-if="travel.travelstart">
                                    {{moment(travel.travelstart).format('MMMM D, Y')}}
                                </template>                         
                            </td>
                            <td>
                                <template v-if="travel.travelend">
                                    {{moment(travel.travelend).format('MMMM D, Y')}}
                                </template>   
                            </td>
                            <td>
                                {{travel.location}}
                            </td>
                            <td>
                                {{travel.purpose}}
                            </td>
                            <td>
                                <template v-if="travel.createdby">
                                    {{travel.createdby.name}}
                                </template>
                            </td>
                            <td>
                                <ul class="ls-frmbutton text-end"  v-if="travel.creatorid === authid">
                                    <li><router-link :to="{name: 'travel.edit', params : {id: travel.id}}" class="btn btn-violet">Edit</router-link></li>
                                    <li><button title="delete" class="btn btn-outline-danger" @click="deleteTravel(travel.id)"><i class="fa-solid fa-trash-can"></i> Delete</button></li>
                                </ul>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import useTravels from '@/composables/composables-travel';
    import {onMounted ,ref, computed, inject} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment';
    import { useAuthStore } from '@/stores/store.js'

    import { useHead } from '@unhead/vue'


    export default{
        setup(){
            useHead({
                title: 'My Travels | BFAR - CAR HRMIS'
            })
            const store = useAuthStore();
            const id = ref(store.details[0]);

            const userrole = ref(store.getdetails[1]);
            const authid = ref(store.getdetails[0]);

            const {travels, getMyTravels, destroyTravel} = useTravels();

            const searchQuery = ref("");
            const swal = inject('$swal')
            let sort = ref(false);
            const router = useRouter()          
            const sortColumn = ref("id");
            const sortDirection = ref(1);
            const arrowIconName = ref("arrow_drop_up");     
            onMounted(() => {
                getMyTravels(id.value);
            })  


            const filteredTravels = computed(function(){
                return travels.value.filter(
                    (travel) => travel.location.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1 || 
                                travel.purpose.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1  ||
                                travel.travelordernumber.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1  ||
                                moment(travel.travelstart).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1  ||
                                moment(travel.travelend).format('MMMM D, Y').toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
                );
            });



            const sortTable = (columnName) => {
                sortColumn.value = columnName;
                sortDirection.value = -1 * sortDirection.value;
                if (sortDirection.value == 1) {
                    arrowIconName.value = "arrow_drop_up";
                    filteredTravels.value.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
                } else {
                    arrowIconName.value = "arrow_drop_down";
                    filteredTravels.value.sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
                }
            }
            const deleteTravel = async (id) =>{
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
                    await destroyTravel(id);
                    await getMyTravels(id.value).then(() => {
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
            
            const goshow = (id) => {
                router.push({name: 'roles.edit', params: { id: id }});
            }
            const checkText = (text) => {
                let newText = text.toLowerCase().replace(/ /g, '');
                let x = false;
                if(newText !== 'n/a' && newText !== 'na'){
                    x = true;
                }
                return x;
            }
            return{
                filteredTravels,
                searchQuery,
                sortTable,
                sortColumn,
                goshow,
                arrowIconName,
                moment,
                checkText,
                deleteTravel,
                authid,
                userrole

            }
        }
    }
</script>