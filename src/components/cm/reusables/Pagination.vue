<template>
    <ul class="list-inline mb-0  me-2 ulchangepage">
        <li class="list-inline-item">{{props.meta}}</li>
        <li class="list-inline-item">
            <template v-if="props.prev">
                <span @click="$emit('show-Page',0)" title="Newer"><i class="fa-solid fa-angle-left"></i></span>
            </template>
            <template v-else>
                <span class="disabled" title="Newer"><i class="fa-solid fa-angle-left"></i></span>
            </template>
        </li>
        <li class="list-inline-item">
            <template v-if="props.next">
                <span  title="Older" @click="$emit('show-Page',1)"><i class="fa-solid fa-angle-right"></i></span>
            </template>
            <template v-else>
                <span class="disabled" title="Older"><i class="fa-solid fa-angle-right"></i></span>
            </template>
        </li>
    </ul>


</template>
<script>
    export default{
    	props:{
            meta: {
                required: true,
                type: String
            },
            prev: {
                required: true,
                type: Boolean
            },
            next: {
                required: true,
                type: Boolean
            }
    	},
    	setup(props){

	    	return {
                props
	    	}
	    }
    }
	
</script>
