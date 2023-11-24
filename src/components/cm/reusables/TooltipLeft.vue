<template>
  
<div class="spNamesRight" v-if="arr.length > 0">
    {{msg}}: 
      <template v-if="arr.length > 15">
          <ul class="mw-350">
              <li class="w-50 f-left" v-for="receiver in arr">{{receiver.formattedName}}</li>
          </ul>
      </template>
      <template v-else>
          <ul class="mw-150">
              <li v-for="receiver in arr">{{receiver.formattedName}}</li>
          </ul>
      </template>       
</div>



</template>

<script>


export default {
  name: "Tooltip",
  props: {
    arr: {
      type: Object,
      default:'',
    },
    msg: {
      default: "right",
      type: String,
    },
  }
};
</script>
