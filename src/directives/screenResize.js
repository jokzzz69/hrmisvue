import { ref, nextTick} from "vue";

export default function screenResize() {
    const sH = ref(window.innerHeight);
    const ddH = ref(178);
    const fH = ref(sH.value - ddH.value);
    const pVal = ref(); 


    function init(el,binding){
        if(binding.value){
            ddH.value = binding.value
        }
        if(window.innerHeight > 600){          

            fH.value = window.innerHeight - ddH.value;

        }else{
            fH.value = 375;
        }

        pVal.value = fH.value;

        el.style.height = fH.value+"px";
    }
    function tbodyinit(el,binding){
        nextTick(() => {
            if(pVal.value){
                var x = pVal.value - 50;
                el.style.height = x+"px";
            }
        })
        
        
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


    const tbodyresizedirective = (app) => {

        app.directive('tbheight',{
            mounted(el, binding){

                window.addEventListener('resize',() => {
                    tbodyinit(el,binding)
                });

                tbodyinit(el,binding)

            },
            unmounted(el,binding){
                window.removeEventListener('resize',() => {
                    tbodyinit(el,binding)
                });
            }       
        })           
    }



    return {
        screenresizedirective,
        tbodyresizedirective
    }
}

