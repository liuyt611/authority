<template>
  <div class="advertiser">
    
    <topMenu :menuData = 'menuList'></topMenu>
    <div class="page-btn">
      <el-button icon="el-icon-plus"  size="medium"  @click="addAdver = true">添加广告主</el-button>
      <el-dialog title="新增广告主" :visible.sync="addAdver" @open="openAdvers()">
        <el-form :model="add" ref="add" :rules="addRules">
      	  <el-form-item label="广告主名称" :label-width="formLabelWidth" prop="advertiserName">
            <el-input v-model.trim="add.advertiserName" ></el-input>
          </el-form-item>
          <el-form-item label="广告主电话" :label-width="formLabelWidth" prop="telephone">
            <el-input class="tel" v-model.trim="add.telephone" placeholder="区号-固定电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addAdver=false">取 消</el-button>
            <el-button type="primary" @click="addAdvers('add')">添 加</el-button>
        </div>
      </el-dialog>
    </div>
		<div class="dataTable">
      <template>
        <el-table
          :data="tableData.adverData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="advertiserName"
            label="广告主名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="authorizerAppid"
            label="AppID">
          </el-table-column>
          <el-table-column
            prop="wxId"
            label="原始ID">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="授权时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="授权状态"
            :filters="filters"
            :filter-method="filterStatus"
            :filter-multiple=false>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editer(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" @click="information(scope.row)" size="small">详情</el-button>
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
    <!-- 编辑dialog -->
    <el-dialog title="编辑广告主信息" :visible.sync="editAdver">
      <el-form :model="edit" ref="edit" :rules="editRules">
        <el-form-item label="广告主名称" :label-width="formLabelWidth" prop="advertiserName">
          <el-input v-model="edit.advertiserName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="广告主电话" :label-width="formLabelWidth" prop="telephone">
          <el-input class="tel" v-model.trim="edit.telephone" placeholder="区号-固定电话"></el-input>
        </el-form-item>
        <!-- <el-form-item label="广告主电话" :label-width="formLabelWidth">
          <el-input class="area-code" v-model="edit.areaCode" placeholder="区号"></el-input> 
          <span class="line">-</span>
          <el-input class="tel" v-model="edit.telephone" placeholder="固定电话"></el-input>
        </el-form-item> -->
        <el-form-item label="上传资质" :label-width="formLabelWidth" prop="upload">
          <el-upload
            class="upload-demo"
            drag
            action="/advertiser/qualification/upload"
            headers= "{'Content-Type': 'multipart/form-data'}"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAdver = false">取 消</el-button>
        <el-button type="primary" @click="editAdvers('edit')">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 详情dialog -->
    <el-dialog title="详情" :visible.sync="detailsAdver">
      <el-form :model="details">
        <el-form-item label="用户公众号" :label-width="formLabelWidth">
          <el-input v-model="details.advertiserName" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="details.wxCompany" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" :label-width="formLabelWidth">
          <el-input v-model="details.telephone" auto-complete="off" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" :label-width="formLabelWidth">
          <el-row :gutter="12">
            <el-col :span="15">
              <el-card shadow="always">
                <img :src="details.fileUrl" width="307" alt="">
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsAdver = false">取 消</el-button>
        <el-button type="primary" @click="detailsAdver = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <dialogDetails :visible="detailsAdver" :details="details" @detailsVisible="detailsVisible"></dialogDetails> -->
  </div>
</template>
<script>
  import axios from 'axios';
  import topMenu from '../../components/topMenu.vue';
  // import dialogDetails from '../../components/authority/dialogDetails.vue';

  export default {
    components: { topMenu },
    // components: { topMenu, dialogDetails },
    data() {
      const addTelphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入固定电话'));
        } else {
          const telNum = /^0[0-9]{2,3}-[1-9]{7,8}$/; // /^[0-9]{3,4}-[1-9]{7,8}$/;
          if (telNum.test(this.add.telephone)) {
            callback();
          } else {
            callback(new Error('请输入固定电话'));
          }
        }
      };
      const eidtTelphone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入固定电话'));
        } else {
          const telNum = /^0[0-9]{2,3}-[1-9]{7,8}$/; // /^[0-9]{3,4}-[1-9]{7,8}$/;
          if (telNum.test(this.edit.telephone)) {
            callback();
          } else {
            callback(new Error('请输入固定电话'));
          }
        }
      };
      return {
        numberValidateForm: {
          age: '',
        },
        menuList: [{
          link: '/authority',
          name: '广告主管理',
        },
        {
          link: '/authority/personnel',
          name: '人员管理',
        }],
        add: {
          advertiserName: '',
          areaCode: '',
          telephone: '',
        },
        addRules: {
          advertiserName: [
            { required: true, message: '请输入广告主名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' },
          ],
          telephone: [
            { validator: addTelphone, required: true, trigger: 'blur' },
          ],
        },
        editRules: {
          advertiserName: [
            { required: true, message: '请输入广告主名称', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' },
          ],
          telephone: [
            { validator: eidtTelphone, required: true, trigger: 'blur' },
          ],
          upload: [
            { required: true, message: '请上传资质', trigger: 'blur' },
          ],
        },
        details: {
          advertiserName: '',
          wxCompany: '',
          telephone: '',
          fileUrl: '',
        },
        edit: {
          advertiserName: '',
          advertiserId: '',
          telephone: '',
        },
        formLabelWidth: '120px',
        addAdver: false,
        editAdver: false,
        detailsAdver: false,
        tableData: {
          total: '',
          pageSize: '',
          adverData: [],
          currentPage: 1,
          filterStatusArr: [],
        },
        filters: [
          { text: '待绑定公众号', value: '待绑定公众号' },
          { text: '待上传认证资料', value: '待上传认证资料' },
          { text: '车慧处理中', value: '车慧处理中' },
          { text: '腾讯', value: '腾讯' },
          { text: '腾讯处理中', value: '腾讯处理中' },
          { text: '认证完成', value: '认证完成' },
          { text: '车慧驳回', value: '车慧驳回' },
          { text: '腾讯驳回', value: '腾讯驳回' },
        ],
      };
    },
    created() {
      this.adverData();
    },
    methods: {
      as(row) {
        console.log(row);
      },
      // 显示列表
      adverData(opt) {
        const opts = Object.assign({
          page: this.currentPage,
          pageSize: this.pageSize,
        }, opt);
        axios.post('/advertiser/list', opts).then((res) => {
          const data = res.data;
          console.log(data);
          if (data.status === 0) {
            this.tableData.total = data.total;
            this.tableData.pageSize = data.pageSize;
            this.tableData.adverData = data.data;
            const dataList = this.tableData.adverData;
            const state = {
              0: '待绑定公众号',
              1: '待上传认证资料',
              2: '车慧处理中',
              3: '腾讯',
              4: '腾讯处理中',
              5: '认证完成',
              6: '车慧驳回',
              7: '腾讯驳回',
            };
            for (let i = 0; i < dataList.length; i++) {
              this.tableData.adverData[i].status = state[dataList[i].status];
            }
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
      // 列表中的搜索经销商
      filterStatus(value, row) {
        return row.status === value;
      },
      // 编辑
      editer(row) {
        console.log('点击编辑');
        console.log(row);
        this.edit = {
          advertiserName: row.advertiserName,
          // areaCode: row.telephone === null ? '' : row.telephone.split('-')[0],
          advertiserId: row.advertiserId,
          telephone: row.telephone === null ? '' : row.telephone,
        };
        this.editAdver = true;
      },
      // 查看详情
      information(row) {
        console.log('查看详情');
        axios.get(`/advertiser/get/${row.advertiserId}`).then((red) => {
          const data = red.data.data;
          let url = '';
          if (data.qualifications.length > 0) {
            url = data.qualifications[0].fileUrl;
          } else {
            url = '';
          }
          this.details = {
            advertiserName: data.advertiserName,
            wxCompany: data.wxCompany,
            telephone: data.telephone,
            fileUrl: url,
          };
          this.detailsAdver = true; // 显示弹层
        });
      },
      // 添加广告主
      addAdvers(add) {
        this.$refs[add].validate((valid) => {
          if (valid) {
            const opt = {
              advertiserName: this.add.advertiserName,
              telephone: this.add.telephone,
            };
            axios.post('/advertiser/add', opt).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.adverData();
                console.log(909);
              } else {
                console.log(8);
              }
            });
            this.addAdver = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 编辑广告主
      editAdvers(edit) {
        this.$refs[edit].validate((valid) => {
          if (valid) {
            const opt = {
              advertiserId: this.edit.advertiserId,
              advertiserName: this.edit.advertiserName,
              telephone: this.edit.telephone,
            };
            axios.post('/advertiser/update', opt).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.adverData();
                console.log(909);
              }
            });
            this.editAdver = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 打开添加用户时，清空列表
      // resetForm(add) {
      //   this.$refs[add].resetFields();
      // },
      openAdvers() {
        // this.$refs[add].resetFields();
        this.add = {
          name: '',
          areaCode: '',
          telephone: '',
        };
      },
    },
  };
</script>
