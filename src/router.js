import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './pages/index.vue';
import Plan from './pages/plan/plan.vue';
import Plandata from './pages/plan/data.vue';
import Clue from './pages/clue/clue.vue';
import Financial from './pages/financial/financial.vue';
import Personnel from './pages/authority/personnel.vue';
import Authority from './pages/authority/advertiser.vue';
import Login from './pages/login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: {
        name: 'advertisement',
      },
      children: [{
        path: '/plan',
        name: 'Plan',
        component: Plan,
      },
      {
        path: '/plan/data',
        name: 'Plandata',
        component: Plandata,
      },
      {
        path: '/clue',
        name: 'Clue',
        component: Clue,
      },
      {
        path: '/financial',
        name: 'Financial',
        component: Financial,
      },
      {
        path: '/authority',
        name: 'Authority',
        component: Authority,
      },
      {
        path: '/authority/personnel',
        name: 'Personnel',
        component: Personnel,
      }],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
export default router;
