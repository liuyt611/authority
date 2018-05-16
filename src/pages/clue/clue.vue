<template>
  <div class="cule">
    <el-menu router=true class="el-menu-demo" mode="horizontal">
      <el-menu-item index="">线索统计</el-menu-item>
    </el-menu>
    <el-row :gutter="20">
      <el-col :span="6">
        <label class="el-form-item__label">广告主</label>
          <div class="el-form-item__content">
            <el-select v-model="statusVal" placeholder="请选择/搜索" filterable @change="changeCondition">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
      </el-col>
      <el-col :span="6">
        <label class="el-form-item__label">广告</label>
          <div class="el-form-item__content">
            <el-select v-model="statusVal" placeholder="请选择/搜索" filterable @change="changeCondition">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </el-col>
      <el-col :span="4" class="text-right">
        <el-button size="small" class="link" round icon="el-icon-download">
          下载报表
        </el-button>
      </el-col>
    </el-row>
    <div class="dataTable">
      <template>
        <el-table
          :data="tableData.clueData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="customerName"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="customerContact"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="广告名称">
          </el-table-column>
          <el-table-column
            prop="extra"
            label="车型">
          </el-table-column>
          <el-table-column
            prop="orderTime"
            label="提交时间">
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

export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      value7: '',
      tableData: {
        clueData: [],
        total: '',
        pageSize: '',
        currentPage: 1,
      },
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ['asl', 'asw', 'bsa', 'bsl'],
    };
  },
  created() {
    this.clueList();
  },
  // mounted() {
  //   this.list = this.states.map((item) => {
  //     return { value: item, label: item };
  //   });
  // },
  methods: {
    // 加载列表信息
    clueList(opt) {
      const opts = Object.assign({
        page: this.currentPage,
        pageSize: this.pageSize,
      }, opt);
      axios.post('/leads/list', opts).then((res) => {
        console.log(res);
        const data = res.data;
        if (data.status === 0) {
          this.tableData.total = data.total;
          this.tableData.pageSize = data.pageSize;
          this.tableData.clueData = data.data;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.adverData({
        pageSize: val,
      });
    },
    handleCurrentChange(val) {
      this.adverData({
        page: val - 1,
      });
    },
    // remoteMethod(query) {
    //   if (query !== '') {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       this.options4 = this.list.filter((item) => {
    //         return item.label.toLowerCase()
    //           .indexOf(query.toLowerCase()) > -1;
    //       });
    //     }, 200);
    //   } else {
    //     this.options4 = [];
    //   }
    // },
  },
};
</script>
