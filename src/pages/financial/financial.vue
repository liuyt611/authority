<template>
  <div class="financial">
    <el-menu router=true class="el-menu-demo" mode="horizontal">
      <el-menu-item index="">财务管理</el-menu-item>
    </el-menu>
    <div class="dataTable">
      <template>
        <el-table
          :data="tableData.financialData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="advertiserId"
            label="广告主账号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="advertiserName"
            label="广告主名称"
            width="180">
          </el-table-column>
          <!-- <el-table-column
            prop="authorizerAppid"
            label="AppID">
          </el-table-column> -->
          <el-table-column
            prop="balance"
            label="账户余额">
          </el-table-column>
          <el-table-column
            prop="createTime"
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
    <!-- 充值对话框 -->
    <el-dialog v-if="balanceDialog" title="财务信息" :visible.sync="balanceDialog" :before-close="handleClose">
      <el-form :model="balanceD" ref="balanceD" :rules="rules">
        <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
          <span>{{ balanceD.name }}</span>
        </el-form-item> -->
        <el-form-item label="充值金额" :label-width="formLabelWidth" prop="money">
          <el-input v-model="balanceD.money" auto-complete="off" @change="limit">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认充值金额" :label-width="formLabelWidth" prop="remoney" @change="relimit">
          <el-input v-model="balanceD.remoney" auto-complete="off">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="balanceDialog = false">取 消</el-button>
        <el-button type="primary" @click="balanceDia('balanceD')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    const money = (rule, value, callback) => {
      // value = Number(value).toFixed(2);
      if (value === '') {
        callback(new Error('请输入充值金额'));
      } else {
        // console.log(value);
        if (this.balanceD.remoney !== '') {
          this.$refs.balanceD.validateField('remoney');
        }
        callback();
      }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入数字值'));
      //   }
      // }, 1000);
    };
    const remoney = (rule, value, callback) => {
      // value = Number(value).toFixed(2);
      // console.log(value);
      if (value === '') {
        callback(new Error('请再次输入金额'));
      } else if (value !== this.balanceD.money) {
        callback(new Error('两次输入的金额不一致!'));
      } else {
        callback();
      }
    };
    return {
      tableData: {
        financialData: [],
        total: '',
        pageSize: '',
        currentPage: 1,
      },
      balanceDialog: false,
      formLabelWidth: '120px',
      balanceD: {
        advertiserId: '',
        amount: '',
        paymentType: 1,
        money: '',
        remoney: '',
      },
      rules: {
        money: [
          { validator: money, required: true, trigger: 'blur' },
        ],
        remoney: [
          { validator: remoney, required: true, trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.financialList();
  },
  methods: {
    handleClose() {
      this.resetFormData();
      this.balanceDialog = false;
    },
    // 加载列表信息
    financialList(opt) {
      const opts = Object.assign({
        page: this.currentPage,
        pageSize: this.pageSize,
      }, opt);
      axios.post('/advertiser/list', opts).then((res) => {
        console.log(res);
        if (res.status === 200) {
          const data = res.data;
          this.tableData.total = data.total;
          this.tableData.pageSize = data.pageSize;
          this.tableData.financialData = data.data;
          const dataList = this.tableData.financialData;
          for (let i = 0; i < dataList.length; i++) {
            this.tableData.financialData[i].balance = dataList[i].balance / 100;
          }
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.financialList({
        pageSize: val,
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.financialList({
        page: val - 1,
      });
    },
    // 充值
    balance(row) {
      this.balanceD = {
        advertiserId: row.advertiserId,
        amount: row.money,
        paymentType: 1,
      };
      this.balanceDialog = true;
    },
    // 充值-确定
    balanceDia(balanceD) {
      this.$refs[balanceD].validate((valid) => {
        if (valid) {
          const opt = {
            advertiserId: this.balanceD.advertiserId,
            amount: this.balanceD.money * 100,
            paymentType: this.balanceD.paymentType,
          };
          axios.post('/fin/recharge', opt).then((res) => {
            console.log(res);
            if (res.data.status === 0) {
              this.financialList();
            }
          });
          this.resetFormData();
          this.balanceDialog = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消提交
    cancelEdit() {
      this.resetFormData();
    },

    // 清空表单
    resetFormData() {
      Object.assign(this.balanceD, { money: '', remoney: '' });
    },
    limit() {
      this.balanceD.money = Number(this.balanceD.money).toFixed(2);
    },
    relimit() {
      this.balanceD.remoney = Number(this.balanceD.remoney).toFixed(2);
    },
  },
};
</script>

