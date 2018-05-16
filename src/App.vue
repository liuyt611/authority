<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '123',
      sysTitle: '权限管理',
    };
  },

  methods: {
  },
};
</script>

<style>
/* #app {
  font-family: Helvetica, sans-serif;
  text-align: center;
} */
</style>
