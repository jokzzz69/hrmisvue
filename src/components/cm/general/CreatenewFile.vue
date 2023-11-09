<template> 
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>New</h2>
        </div>
    </div>

    <div class="row">
        <div class="col">     
            <div class="bg-light tblWrap mb-3 py-3 px-3">
                <div class="row">
                    <div class="col">
                        <div class="form-floating">
                            <select class="form-select" v-model="form.typeValue" id="st">
                                <option disabled value="">Select file type</option>
                                <option value="1">Communication</option>
                                <option value="2">Document</option>
                            </select>
                            <label for="st">Type</label>
                        </div>
                    </div>
                </div>


                <template v-if="form.typeValue == 1">
                    <CommunicationCreate :id="form.typeValue"/>
                </template>
                <template v-else>
                    
                </template>


            </div>
        </div>
    </div>


    

    
</template>

<script>
    import { reactive,inject} from "vue";
    import CommunicationCreate from '@/components/communications/CommunicationCreate.vue';

    

    export default {
        components: {
            CommunicationCreate,
        },
        setup(){
            const form = reactive({
                'typeValue': ''
            });

            return{
                form
            }
        }
        
    }
</script>