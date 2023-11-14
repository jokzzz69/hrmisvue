<template>
	<div class="loaderMask">
     <div class="divloaderWrap">
       <div id="preview-area">    
        <div class="spinner">
          <div class="bounce bounce1">B</div>
          <div class="bounce bounce2">F</div>
          <div class="bounce bounce3">A</div>
          <div class="bounce bounce4">R</div>
          <div class="bounce bounce5">-</div>
          <div class="bounce bounce6">C</div>
          <div class="bounce bounce7">A</div>
          <div class="bounce bounce8">R</div>
        </div>

      </div>
    </div>  
  </div>

</template>
<script>
	export default{
		setup(){

		}
	}

</script>
<style scoped>
.loaderMask{
  position: fixed;
  background: rgb(249 249 249 / 60%);
  overflow: hidden;
  top: 0;
  height: 100%;
  width: calc(100% - 14%);
  z-index: 999;
}
.divloaderWrap{  
  left: calc(50% - 90px);
  top:45%;
  transform: translate(-50%, -50%); 
  position: absolute;
}
#preview-area {
    width: 180px;
    height: 60px;
    position: absolute;
    top: 3rem;
    left: 0;
    bottom: 60px;
    right: 0;
    margin: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.spinner {
  margin: 0 auto 0;
  width: 180px;
  text-align: center;
}

.spinner > div {
  width: 20px;
  height: 20px;


  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.bounce1,
.bounce3,
.bounce5,
.bounce7{
  background-color: #506fd9;
}
.bounce2,
.bounce4,
.bounce6,
.bounce8{
  background-color: #4B91DB;
}
.bounce{
  color:#fff;
}
.spinner .bounce1
{
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2
{
  -webkit-animation-delay: -0.24s;
  animation-delay: -0.24s;
}
.spinner .bounce3
{
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.spinner .bounce4
{
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.spinner .bounce5
{
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
.spinner .bounce6
{
  -webkit-animation-delay: 0.24s;
  animation-delay: 0.24s;
}
.spinner .bounce7
{
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}
.spinner .bounce8
{
  -webkit-animation-delay: 0.48s;
  animation-delay: 0.48s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 767.98px){
  .loaderMask{
    left: 0;
    width: 100%;
  }
}
@media(min-width: 768px) and (max-width:991px){
  .loaderMask{
    width: calc(100% - 26%);
  }
}
@media(min-width: 992px) and (max-width:1024px){
  .loaderMask{
    width: calc(100% - 25%);
  }
}
@media(min-width: 1025px) and (max-width:1199px){
  .loaderMask{
    width: calc(100% - 23%);
  }
}
@media(min-width: 1200px) and (max-width:1320px){
  .loaderMask{
    width: calc(100% - 21%);
  }
}
@media(min-width: 1321px) and (max-width:1680px){
  .loaderMask{
    width: calc(100% - 19%);
  }
}

@media(min-width: 1681px) and (max-width:1780px){
  .loaderMask{
    width: calc(100% - 16%);
  }
}
</style>