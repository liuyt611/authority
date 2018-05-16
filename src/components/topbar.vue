<template>
  <div class="topbar">
    <div class="logo">
      {{this.sysTitle}}
    </div>
    <div class="username">
      {{username}}
      <span class="logout" title="登出" @click="logout"><i class="icon el-icon-upload2"></i></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      sysTitle: '12345权限管理',
    };
  },
  created() {
    this.username = this.$root.username || localStorage.username || 'admin';
  },
  methods: {
    logout() {
      delete localStorage.token;
      delete localStorage.username;
      this.$root.$router.replace('/login');
    },
  },
};
</script>
