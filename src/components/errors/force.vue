<template>
	<div class="p404 position-absolute top-50 start-50 translate-middle">
        <p class="txt404">404</p>
        <h1 class="">PAGE NOT FOUND</h1>
        <div class="text-center">

        	<a class="btn btn-blue" :href="$router.resolve({name: 'recordpersonal.show'}).href">Take me Back</a>
        </div>
    </div>
</template>
<script>
	import { onMounted, onUnmounted } from "vue";

	export default{
		setup(){

			onMounted(() => {
			  const sbar = document.querySelector(".sidebarleft");
			  sbar.classList.add("d-none");
			})
		}
	}
</script>