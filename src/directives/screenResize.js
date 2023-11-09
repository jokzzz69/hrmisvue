import { ref} from "vue";

const sH = ref(window.innerHeight);
const ddH = ref(178);
const fH = ref(sH.value - ddH.value);

function init(el,binding){
	if(binding.value){
		ddH.value = binding.value
	}
	if(window.innerHeight > 600){          

        fH.value = window.innerHeight - ddH.value;

    }else{
        fH.value = 375;
    }    
    el.style.height = fH.value+"px";
}
const screenresizedirective = (app) => {

    app.directive('sheight',{
    	mounted(el, binding){

   			window.addEventListener('resize',() => {
   				init(el,binding)
   			});

    		init(el,binding)

    	},
    	unmounted(el,binding){
    		window.removeEventListener('resize',() => {
   				init(el,binding)
   			});
    	}

    	

    	
    })
           
}

export default screenresizedirective;