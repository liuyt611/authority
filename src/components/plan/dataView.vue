<template>
  <viewCont :title="title">
    <ul class="view-cont-list">
        <li v-for="(item,index) in listData" :key="index">
          <p class="list-title">
            {{item.label}}
              <el-popover :key="index" v-if="!!item.explain" ref="'popover'+index" placement="top-start" width="200" trigger="hover">
                <p class="text-smaller">{{item.explain}}</p>
                <i class="el-icon-question" slot="reference" v-popover:popover+index></i>
              </el-popover>
          </p>
          <p class="list-value">
            {{item.val}}
          </p>
        </li>
      </ul>
  </viewCont>
  
</template>
<script>
import viewCont from './viewCont.vue';

export default {
  name: 'DataView',
  props: {
    title: String,
    listData: Array,
  },
  components: {
    viewCont,
  },
  data() {
    return {
      title: '',
      listData: [
        {
          label: '目标预算（元）',
          val: '500，000',
        },
      ],
    };
  },
};
</script>
