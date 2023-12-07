<template>
	<div class="input-group">
		<div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
		<input name="s" type="text" class="form-control inSearch" @click.prevent="clickSearch" placeholder="Search" v-model="searchQuery.search" @keypress.enter="ekSearchData" />
		<div class="input-group-text lcIGT" id="excludebtn"><i class="fa-solid fa-filter" title="Filter" @click.prevent='clickFilter'></i></div>
	</div>
	<div class="filterContentsWrap" v-if="showFilter" v-click-outside:excludebtn="closeFilter">
        <form>
        	<div class="pfilterContent">
            <div class="pfilterContentLabel">
                <span>From</span>
            </div>
            <div class="pfilterContentInput">
                <Datepicker class="searchdatepick no-autoapply" :teleport="true" :enable-time-picker="false" v-model="searchQuery.searchFrom"  week-start="0" name="searchFrom"></Datepicker> 
            </div>
            <div class="pfilterContentLabel">
                <span>To</span>
            </div>
            <div class="pfilterContentInput">
                <Datepicker class="searchdatepick no-autoapply" :teleport="true" :enable-time-picker="false" v-model="searchQuery.searchTo"  week-start="0" name="searchTo"></Datepicker> 
            </div>
        </div>
        <div class="pfilterContent">
            <div class="pfilterContentLabel single">
                <span>Search word(s)</span>
            </div>
            <div class="pfilterContentInput">
                   <input type="text" name="wordTosearch" v-model="searchQuery.search" class="form-control">
            </div>
        </div>
        <div class="pfilterContent">
            <div class="pfilterContentLabel single">
                <span>Type</span>
            </div>
            <div class="pfilterContentInput">
                    <select name="documenttype" placeholder="documenttype" id="documenttype" class="form-select" @change="showCheckInclusiveDate" v-model="searchQuery.documenttype">
                    <option value="">--</option>
                    <option :value="documenttype.id" v-for="documenttype in documenttypes">{{documenttype.name}}</option>
                </select>
            </div>
        </div>

        <div class="pfilterContent">
            <div class="pfilterContentLabel single">
                <span>Classification</span>
            </div>
            <div class="pfilterContentInput">
                <select name="classification" placeholder="classification" id="classification" class="form-select" v-model="searchQuery.classification">
                    <option value="">--</option>
                    <option :value="classification.id" v-for="classification in classifications">{{classification.name}}</option>
                </select>
            </div>
        </div>
        <div class="pfilterSubmit">
            <ul class="list-inline">
                <li class="list-inline-item">
                    <button class="btn btn-secondary" @click.prevent="clearFilter">Clear Filter</button>
                </li>
                <li class="list-inline-item">
                    <button class="btn btn-semiblue" type="submit" @click.prevent="frmSearchData">Search</button>
                </li>
            </ul>
        </div>
        </form>
    </div> 
</template>
<script>

	import {onMounted ,ref, computed, inject, reactive, watch} from 'vue';
	import {useRouter,useRoute} from 'vue-router'
	import useDocumentTypes from '@/composables/composables-documenttypes';
	import useClassifications from '@/composables/composables-classifications';
    import moment from 'moment'

	export default{
		setup(){



			const router = useRouter()
			const route = useRoute();

			const showFilter = ref(false);
			const {classifications, getClassifications} = useClassifications()
            const {documenttypes, getDocumentTypes} = useDocumentTypes()

            const ekSearchData = () => {
            	searchQuery.nf = false;

            	if(searchQuery.search){
            		if(searchQuery.search.trim().length !== 0){
	            		searchData(searchQuery.search);
	            	}
            	}
            }
            const frmSearchData = () => {
                
            	searchQuery.nf = true;
            	let dt = 'all';
            	let cs = 'all';
            	let sf = 'all';
            	let st = 'all';
            	let search = '';
                let trimmed = '';
                
            	if(searchQuery.search){
            		search = searchQuery.search;
            	}
            	if(searchQuery.searchFrom){
            		sf = moment(searchQuery.searchFrom).format('YYYY-MM-DD');
            	}
            	if(searchQuery.searchTo){
            		st = moment(searchQuery.searchTo).format('YYYY-MM-DD');
            	}
            	if(searchQuery.documenttype){
            		dt = searchQuery.documenttype;
            	}
            	if(searchQuery.classification){
            		cs = searchQuery.classification;
            	}

                if(searchQuery.search || searchQuery.searchFrom ||searchQuery.searchTo || searchQuery.documenttype || searchQuery.classification){
                    router.push({name: 'communications-routed.search', query: { search : search,
                        from: sf,
                        to: st,
                        classifications: cs,
                        documenttypes: dt }
                    });
                }        	
            }

			const searchData = async(tosearch) => {               
                router.push({name: 'communications-routed.search', query: { search: tosearch}});                                                          
            }

            const searchQuery = reactive({
                'search': '',
                'searchFrom': '',
                'searchTo':'',
                'documenttype': '',
                'classification': '',
                'nf': false
            });

            const clearFilter = () =>{
				searchQuery.searchFrom = '';
				searchQuery.searchTo = '';
				searchQuery.documenttype = '';
				searchQuery.classification = '';
            }
            const clickFilter = () => {
            	showFilter.value = !showFilter.value;
            }
            const clickSearch = () => {
            	clearFilter();
            	showFilter.value = false;
            }
            const closeFilter = () =>{
                showFilter.value = false;
            }
            onMounted(() => {
            	getClassifications();
                getDocumentTypes().then(() =>{
                    if(route.query){
                        searchQuery.search = route.query.search;
                        if(route.query.from && route.query.from != 'all'){
                            searchQuery.searchFrom = route.query.from;
                        }
                        if(route.query.to && route.query.to != 'all'){
                            searchQuery.searchTo = route.query.to;
                        }
                        if(route.query.documenttypes && route.query.documenttypes != 'all'){
                            searchQuery.documenttype = route.query.documenttypes;
                        }
                        if(route.query.classifications && route.query.classifications != 'all'){
                            searchQuery.classification = route.query.classifications;
                        }
                    }

                });

                
            })
            return {
            	searchData,
            	searchQuery,
            	classifications,
				documenttypes,
				clearFilter,
				showFilter,
				clickFilter,
				clickSearch,
				ekSearchData,
				frmSearchData,
                closeFilter
            }
		}
	}
</script>