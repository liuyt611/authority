<template>
  <div class="app-page">
    <div class="header">
      <topbar></topbar>
    </div>
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="mainCont">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Menu, MenuItem } from 'element-ui';
import Topbar from '../components/topbar.vue';
import sidebar from '../components/sidebar.vue';

Vue.use(Menu);
Vue.use(MenuItem);
export default {
  components: { Topbar, sidebar },
};
</script>
