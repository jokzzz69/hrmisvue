<template>
	<div class="p404 position-absolute top-50 start-50 translate-middle">
        <p class="txt404">403</p>
        <h1 class="">We are Sorry...</h1>
        <p>The page you're trying to access has restricted access.</p>
        <div class="text-center">
        	<a class="btn btn-blue" :href="$router.resolve({name: 'recordpersonal.show'}).href">Take me Back</a>
        </div>
    </div>
</template>
<script>
	import {onMounted ,ref, computed, inject} from 'vue';
	import {useRouter} from 'vue-router'
	import { useHead } from '@unhead/vue'

	export default{
		setup(){
			useHead({
                title: 'Forbidden Page | BFAR - CAR HRMIS'
            })
			const router = useRouter()
		
			onMounted(() => {
			  const sbar = document.querySelector(".sidebarleft");
			  sbar.classList.add("d-none");
			})		
		}
	}
</script>