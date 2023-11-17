<template>
    <div class="row">
        <div class="col-md-12 p-title">
            <h2>Content Soon</h2>
        </div>
    </div>
   	<div class="row">   
   		<div class="col">
        	<a class="btn btn-blue" href="#" @click="$router.go(-1)">Take me Back</a>
        </div>
   	</div>
</template>

<script>

import {useRouter} from 'vue-router'
import { useHead } from '@unhead/vue'

export default {
	setup(){
        useHead({
            title: 'Content Soon on BFAR CAR | '+import.meta.env.VITE_BFAR_AGENCY
        })
	}

}
</script>