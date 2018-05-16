import Vue from 'vue';
import particles from 'particles.js';
import {
  MessageBox,
  Loading,
  Message,
  Row,
  Col,
  Cascader,
  Step,
  Steps,
  Select,
  Option,
  OptionGroup,
  Popover,
  Form,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  TimePicker,
  Tag,
  Pagination,
  FormItem,
  Input,
  Button,
  DatePicker,
  Dialog,
  InputNumber,
  Switch,
  Upload,
  Card,
  Radio,
  Autocomplete,
} from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import './assets/index.scss';

Vue.use(particles);
Vue.use(VueRouter);
Vue.use(Row);
Vue.use(Col);
Vue.use(Cascader);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(TimePicker);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(InputNumber);
Vue.use(Loading.directive);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Radio);
Vue.use(Autocomplete);
// 注册提示框等组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

// new Vue(
//   Vue.util.extend({
//     router,
//   }, App),
// ).$mount('#app');

// use vue devtools
Vue.config.devtools = process.env.NODE_ENV === 'production';
