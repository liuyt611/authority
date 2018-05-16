<template>
    <div class="view-cont">
         <div class="view-cont-title">
          {{title}}
        </div>
        <div class="view-cont-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
