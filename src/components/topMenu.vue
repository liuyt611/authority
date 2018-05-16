<template>
  <div class="topmenu">
    <el-menu router=true :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="list in menuData" :key="list.id" :index="list.link">{{ list.name }}</el-menu-item>
      <!-- <el-menu-item index="/authority/personnel">人员管理</el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
  export default {
    props: ['menuData'],
    data() {
      return {
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>
