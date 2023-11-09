<template>
  <div class="spNames">
    {{msg}} :
    <ul class="mw-150">
        <li>{{tooltipText}}</li>
    </ul>
  </div>         
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    tooltipText: {
      type: String,
      default: "Tooltip text",
    },
    msg: {
      type: String,
      default: "Tooltip text",
    },
  },
};
</script>
