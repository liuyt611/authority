<template>
  <div>
    <!-- <el-menu class="side-menu" router='true' :default-active="$route.path">
      <el-menu-item v-for="list in menu" :key="list.id" :route="{name: link.named}" :index="linkTo.link">{{ list.menuName }}</el-menu-item>
      
    </el-menu> -->
    <el-menu :default-active="$route.path" class="side-menu" router="true">
          <el-menu-item index="/plan" :route="{name:'Plan'}">投放管理</el-menu-item>
          <el-menu-item index="/clue" :route="{name:'Clue'}">线索管理</el-menu-item>
          <el-menu-item index="/financial" :route="{name:'Financial'}">财务管理</el-menu-item>
          <el-menu-item index="/authority" :route="{name:'Authority'}">权限管理</el-menu-item>          
    </el-menu>
  </div>
</template>
<script>
import Vue from 'vue';
import { Menu, MenuItem } from 'element-ui';

Vue.use(Menu);
Vue.use(MenuItem);
export default {
  data() {
    return {
      // menu: [
      //   { menuName: '投放管理' },
      //   { menuName: '线索管理' },
      //   { menuName: '财务管理' },
      //   { menuName: '权限管理' },
      // ],
      // link: [
      //   { linkTo: '/advertisement', named: 'Advertisement' },
      //   { linkTo: '/clue', named: 'Clue' },
      //   { linkTo: '/financial', named: 'Financial' },
      //   { linkTo: '/authority', named: 'Authority' },
      // ],
    };
  },
};
</script>

