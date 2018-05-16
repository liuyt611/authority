<template>
  <div class="planData">
    <topMenu :menuData = 'menuList'></topMenu>
    <el-row :gutter="20">
      <el-col :span="20">
        <label class="el-form-item__label">广告名称</label>
          <div class="el-form-item__content">
            <el-select v-model="statusVal" placeholder="请选择/搜索" filterable @change="changeCondition">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
      </el-col>
      <el-col :span="4" class="text-right">
        <el-button size="small" class="link" round icon="el-icon-download">
          下载报表
        </el-button>
      </el-col>
    </el-row>
    <dataView title="关键指标" :list-data="data1"></dataView>
    <viewCont title="关系指标趋势">
      <el-select v-model="chartType" filterable placeholder="请选择" @change="changeType">
        <el-option v-for="item in typeList" :key="item.id" :label="item.title" :value="item.id">
        </el-option>
      </el-select>
      <charts></charts>
    </viewCont>
    <viewCont title="关系指标明细表">
      <div class="page-table">
        <el-table :data="tableData" stripe style="width: 100%">
          <!-- TODO change the api keywords -->
          <el-table-column prop="time" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="aa" label="花费（元）">
          </el-table-column>
          <el-table-column prop="bb" label="曝光次数">
          </el-table-column>
          <el-table-column prop="cc" label="点击次数">
          </el-table-column>
          <el-table-column prop="dd" label="点击率">
          </el-table-column>
          <el-table-column prop="ee" label="转化指标">
          </el-table-column>
          <el-table-column prop="ff" label="转化成本（元）">
          </el-table-column>
        </el-table>
      </div>
      <div class="page-pagenum">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 50, 100]"
          :page-size="tablePageSize" layout="total,sizes, prev, pager, next" :total="tablePageTotal">
        </el-pagination>
      </div>
    </viewCont>
  </div>
</template>
<script>
import topMenu from '../../components/topMenu.vue';
import dataView from '../../components/plan/dataView.vue';
import Charts from '../../components/plan/echarts.vue';
import ViewCont from '../../components/plan/viewCont.vue';

export default {
  components: { topMenu, dataView, Charts, ViewCont },
  data() {
    return {
      menuList: [{
        link: '/plan',
        name: '投放管理',
      },
      {
        link: '/plan/data',
        name: '数据报表',
      }],
      data1: [
        {
          label: '花费（元）',
          val: '500，000',
        },
        {
          label: '曝光次数',
          val: '500，000',
        },
        {
          label: '点击次数',
          val: '500，000',
        },
        {
          label: '点击率',
          val: '500，000',
        },
        {
          label: '转化指标',
          val: '500，000',
        },
        {
          label: '每千次展示均价（元）',
          val: '73.9',
        },
      ],
    };
  },
};
</script>

