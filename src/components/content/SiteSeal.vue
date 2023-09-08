<template>
<div class="container-fluid">
    <div class="row">
        <div class="col ssl text-center">
            <!--- DO NOT EDIT - GlobalSign SSL Site Seal Code - DO NOT EDIT ---><table width=125 border=0 cellspacing=0 cellpadding=0 title="CLICK TO VERIFY: This site uses a GlobalSign SSL Certificate to secure your personal information." ><tr><td  id="sstd"><span id="ss_img_wrapper_gmogs_image_125-50_en_dblue"><a href="https://www.globalsign.com/" target="_blank" title="GlobalSign Site Seal" rel="nofollow"><img alt="SSL" border=0 id="ss_img" src="//seal.globalsign.com/SiteSeal/images/gs_noscript_125-50_en.gif"></a></span></td></tr></table><!--- DO NOT EDIT - GlobalSign SSL Site Seal Code - DO NOT EDIT --->
        </div>
    </div>
</div>
</template>

<script>
    import{onMounted} from 'vue'
    //import { useScriptTag } from '@vueuse/core'

    export default{
        setup(){
            const siteSealScript = document.createElement("script");

            onMounted( () =>{            
                siteSealScript.setAttribute(
                    "type",
                    "text/javascript"
                );
                siteSealScript.setAttribute(
                  "src",
                  "//seal.globalsign.com/SiteSeal/gmogs_image_125-50_en_dblue.js"
                );
                document.getElementById('sstd').appendChild(siteSealScript);
            })

            return {
                
            }
        }
    }

</script>