<template>
    <div class="row shts">
        <div class="col pAgeEmail--title">
            <ul class="d-flex list-unstyled align-items-center mh-45 mb-2">
                <li class="col col-auto me-4"><h2 class="ps-1">Actions Taken</h2></li>
                <li class="col col-sm-5 pAgeEmail__input">
                    <div class="input-group">
                      <div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
                      <input name="s" type="text" class="form-control" placeholder="Search" v-model="searchQuery.search" @keypress.enter="searchData" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 fs-5">     
            <div class="bg-mid-trans tblWrap f85 mb-3 pb-3" v-sheight>
                <table class="tbl actionstaken table">
                    <thead>
                        <tr> 
                            <th>
                                <input class="chk__p form-check-input" type="checkbox" @change="checkParentAC" v-model="allcheckedac">                         
                            </th>  

                            <th>
                                <ul class="list-inline mb-0 bulkIcons" v-if="withChecked">
                                    <li class="list-inline-item"><span title="Delete" @click="deleteSelected"><i class="fa-solid fa-trash-can"></i></span></li>
                                </ul>
                                Communications
                            </th>                
                            <th>Action Taken</th>
                            <th></th>                   
                            <th class="text-end">
                                <template v-if="actiontakenMeta.last_page > 1">                     
                                    <Pagination @show-Page="showPage" :meta="metaString" :prev="hasPrev" :next="hasNext"/>                                    
                                </template>                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <template v-if="actionstaken.length > 0">
                            <template v-for="actiontaken in actionstaken" :key="actiontaken.id">
                                
                                <tr @click="show(actiontaken.id)">
                                    <td @click.stop>
                                        <input name="cs" class="form-check-input chk__c" type="checkbox" :value="actiontaken.id" v-model="formData.selectedactionstaken" @change='perActiontakenCheck()'>
                                    </td>
                             
                                    <td>
                                        <template v-if="actiontaken.communication">
                                            <span>
                                                {{actiontaken.communication.documentnumber}}
                                            <template v-if="actiontaken.communication.documenttype">
                                               - {{actiontaken.communication.documenttype.name}}
                                            </template>
                                            <template v-if="actiontaken.communication.classification">
                                                - {{actiontaken.communication.classification.name}}
                                            </template>
                                            <template v-if="actiontaken.communication.subject">
                                                 / {{actiontaken.communication.subject}}
                                            </template>
                                            <template v-else>
                                               - (No Subject) 
                                            </template>
                                            </span>
                                            
                                        </template>
                                    </td>                             
                                    <td>
                                        <span>{{formatString(actiontaken.message) }}</span>
                                    </td>                                
                                    
                                    <td class="text-end" colspan="2" title="Date / Time Created"><span>{{formatmaildate(actiontaken.updated_at)}}</span></td>
                                </tr>
                            </template>
                              <!-- {{actiontakenLinks}} -->

                        </template>
                        <template v-else>
                            <template v-if="!noData">
                                <tr class="pr nodata">
                                    <td colspan="6">
                                        <LoadingComponent/>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <template v-if="noData">
                            <tr class="nodata">
                                <td colspan="6 text-center"> Actions Taken Empty</td>
                            </tr>
                        </template>
                    </tbody>
                </table>  

            </div>
        </div>
    </div>


</template>

<script>
    import useCommunications from '@/composables/composables-communications';
    import {onMounted ,ref, computed, inject, reactive, watch} from 'vue';
    import { sortBy} from 'lodash';
    import {useRouter} from 'vue-router'
    import moment from 'moment'
    import Pagination from '@/components/cm/reusables/Pagination.vue';
    import LoadingComponent from '@/components/loader/LoadingComponent.vue';
    import {formatmaildate} from '@/helper/formatmaildate';
    import Tooltip from "@/components/cm/reusables/Tooltip.vue";
    import useEventsBus from '@/components/helper/Eventbus';
    import {useActionTakenStore} from "@/stores/actiontakenstore.js"
    import {useNotificationStore} from '@/stores/notificationstore.js'
    import useActionsTaken from '@/composables/composables-actionstaken';

    export default{
        components: {
            Pagination,
            Tooltip,
            LoadingComponent
        },
        props: {
            id: {
                type: String,
                required: true
            }
        },
        setup(props){
      

            const {getUserActionsTaken, actionstaken, actiontakenLinks, actiontakenMeta, bulkactionsAC, getUserActionsTakenPage} = useActionsTaken()


            const {bus}=useEventsBus()
            const swal = inject('$swal')
            const details = ref();

            const actiontakenstore = useActionTakenStore();
            const notificationstore = useNotificationStore();

            const searchQuery = reactive({
                'search': ''
            });
            const totals = ref();
            const formData = reactive({
                'message': '',
                'selectedactionstaken': []
            });




            const sH = ref(window.innerHeight - 178);
            const sW = ref(window.innerWidth);




            const metaString = ref('');
            const hasPrev = ref(false);
            const hasNext = ref(false);
            const router = useRouter()
            


            const noData = ref(false)

            const allcheckedac = ref(false);
            const withChecked = ref(false);

            const loadData = (pageid) =>{
                getUserActionsTakenPage(pageid).then(() =>{
                    metaString.value = actiontakenMeta.value.current_page+' of '+actiontakenMeta.value.last_page;
                    if(actiontakenLinks.value.next){
                        hasNext.value = true;
                    }
                    if(actiontakenLinks.value.prev){
                        hasPrev.value = true;
                    }

                    if(actionstaken.value.length > 0){
                        noData.value = false;
                    }else{
                        noData.value = true;
                    }                    
                })
            }

            const formatString = (str) => {
                let regex = /&(nbsp|amp|quot|lt|gt);/g;
                let newString = str.replace(/<\/?[^>]+>/gi, ' ').replace(regex,' ');
                let total = newString.replace(/\s+/g, '').length;

                if(total > 25){
                    return newString.substr(0,newString.lastIndexOf(' ',90))+'...';
                }else{
                    return newString;
                }

            }


            notificationstore.$subscribe((m,s) => {
                loadData(props.id)
            })
            onMounted(() =>{               
                loadData(props.id);

                if(sessionStorage.getItem('selectedac')){
                    if(JSON.parse(sessionStorage.getItem('selectedac')).length > 0){
                        formData.selectedactionstaken = JSON.parse(sessionStorage.getItem('selectedac'));
                        withChecked.value = true;
                    }
                }
                

            })


           const show = (id) => {
                actiontakenstore.setinitialac(1);
                router.push({name: 'actionstaken.edit', params: { id: id}});
            }




            const searchData = async() => {            

                if(searchQuery.search){
                    if(searchQuery.search.trim().length !== 0){
                        const tosearch = searchQuery.search.replace(/\s/g, "+");
                        router.push({name: 'actionstaken.search', params: { content: tosearch}});
                    }
                }
                              
            }

            const showPage = (n) => {
                if(n == 1){
                    const id = actiontakenLinks.value.next.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'actionstaken.page', params: { id: id[id.length-1] }});
                }else{
                    const id = actiontakenLinks.value.prev.match(/([^\/]*)\/*$/)[1].split('=');
                    router.push({name: 'actionstaken.page', params: { id: id[id.length-1] }});
                }
            }
            const clearStorage = () =>{
                sessionStorage.clear();
            }
            const checkParentAC = () =>{
                if(allcheckedac.value){
                    formData.selectedactionstaken = [];
                    for (var x in actionstaken.value) {
                       formData.selectedactionstaken.push(actionstaken.value[x].id);   
                 
                    }           
                    if(formData.selectedactionstaken.length > 0){
                        withChecked.value = true;
                    }
                }else{
                    formData.selectedactionstaken = [];
                      
                    withChecked.value = false;
                }

                sessionStorage.setItem('selectedac', JSON.stringify(formData.selectedactionstaken))  
            }
     
            const perActiontakenCheck = async () =>{

                sessionStorage.setItem('selectedac', JSON.stringify(formData.selectedactionstaken))

                allcheckedac.value = false;

                if(actionstaken.value.length ==  formData.selectedactionstaken.length){
                    allcheckedac.value = true;
                }
                if(formData.selectedactionstaken.length > 0){
                     withChecked.value = true;
                }else{
                     withChecked.value = false;
                }
            }
            const deleteSelected = async() =>{

               formData.current_page = actiontakenMeta.value.current_page

               let x = 0; //trigger

                await swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#506fd9',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {         
                    x = 1;
                  }
                })
                if (x > 0) {

                    allcheckedac.value = false;
                
                    sessionStorage.clear();

                    await bulkactionsAC({...formData});

                    await getUserActionsTakenPage(props.id).then(() => {
                        swal.fire({
                            toast: true,
                            position: 'top-end',
                            title: 'Actions Taken Deleted',
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

                        metaString.value = actiontakenMeta.value.current_page+' of '+actiontakenMeta.value.last_page;
                        if(actiontakenLinks.value.next){
                            hasNext.value = true;
                        }
                        if(actiontakenLinks.value.prev){
                            hasPrev.value = true;
                        }

                        if(actionstaken.value.length > 0){
                            noData.value = false;
                        }else{
                            noData.value = true;
                        }

                    withChecked.value = false;

                    });

                }

                
               
               
            }
           return {

                actionstaken,
                formatmaildate,
                moment,
                searchQuery,
                show,
                formData,
                actiontakenLinks,
                actiontakenMeta,
                metaString,
                showPage,
                searchData,
                hasPrev,
                hasNext,
                noData,
                details,
                sH,
                formatString,
                perActiontakenCheck,
                allcheckedac,
                checkParentAC,
                withChecked,
                deleteSelected
           }
        }
    }
</script>