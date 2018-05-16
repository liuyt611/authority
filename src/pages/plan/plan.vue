<template>
  <div class="plan">
    <topMenu :menuData = 'menuList'></topMenu>
    <div class="dataTable">
      <template>
        <el-table
          :data="tableData.financialData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="wxName"
            label="公众号名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="authorizerAppid"
            label="AppID">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="账户余额">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="balance(scope.row)">充值</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="page-num">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[10, 20, 50, 100]"
          :page-size=this.tableData.pageSize
          layout="total, sizes, prev, pager, next"
          :total=this.tableData.total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import topMenu from '../../components/topMenu.vue';

export default {
  components: { topMenu },
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
      tableData: {
        financialData: [],
        total: '',
        pageSize: '',
      },
      formLabelWidth: '120px',
      // balanceD: {
      //   name: '',
      //   money: '',
      //   remoney: '',
      // },
    };
  },
  created() {
    this.financialList();
  },
  methods: {
    // 加载列表信息
    financialList() {
      axios.post('/advertiser/list', {}).then((res) => {
        console.log(res);
        if (res.status === 200) {
          const data = res.data;
          this.tableData.total = data.total;
          this.tableData.pageSize = data.pageSize;
          const financialData = [];
          let financialObj = {};
          const dataList = data.data;
          for (let i = 0; i < dataList.length; i++) {
            financialObj = {
              wxName: dataList[i].wxName,
              financialData: dataList[i].financialData,
              balance: dataList[i].balance,
              updateTime: dataList[i].updateTime,
            };
            financialData.push(financialObj);
          }
          this.tableData.financialData = financialData;
        }
      });
    },
  },
};
</script>

