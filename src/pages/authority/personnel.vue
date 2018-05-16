<template>
  <div class="advertiser">
    <topMenu :menuData = 'menuList'></topMenu>
    <div class="page-btn">
      <el-button icon="el-icon-plus"  size="medium" @click="addDealer">添加运营人员</el-button>
      <el-dialog title="详情" :visible.sync="dialogFormVisible" @open="open()">
        <el-form :model="personnel" ref="personnel" :rules="rules">
      	  <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="personnel.userName" auto-complete="off"></el-input>
          </el-form-item>
      	  <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input type="password" v-model="personnel.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
	          <el-input class="" v-model="personnel.mobile"></el-input>
          </el-form-item>
          <el-form-item label="所属经销商" :label-width="formLabelWidth" prop="dealer">
            <el-select
              v-model="value1"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请选择/搜索"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in dealer"
                :key="item.advertiserId"
                :label="item.advertiserName"
                :value="item.advertiserId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营权限" :label-width="formLabelWidth" prop="roleId">
            <el-radio v-model="personnel.roleId" v-for="role in roleLists" :key="role.id" :label=role.roleId>{{ role.roleName }}</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPerson('personnel')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
		<div class="dataTable">
      <template>
        <el-table
          :data="tableData.personData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="userName"
            label="运营人员名字"
            width="180">
          </el-table-column>
          <!-- <el-table-column
            prop="wechatid"
            label="微信号">
          </el-table-column> -->
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="advertiserName"
            label="所属经销商">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editer(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog title="编辑" :visible.sync="editPerson">
      <el-form :model="editPersonnel" ref="editPersonnel" :rules="editRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="editPersonnel.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="广告主" :label-width="formLabelWidth" prop="dealer">
            <el-select
              v-model="value2"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请选择/搜索"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in dealer"
                :key="item.advertiserId"
                :label="item.advertiserName"
                :value="item.advertiserId">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
          <el-radio v-model="editPersonnel.roleId" v-for="role in roleLists" :key="role.id" :label=role.roleId>{{ role.roleName }}</el-radio>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
          <el-input class="" v-model="editPersonnel.mobile"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="editPersonnel.password" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input class="" v-model="editPersonnel.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPerson = false">取 消</el-button>
        <el-button type="primary" @click="editPersons('editPersonnel')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios';
  import topMenu from '../../components/topMenu.vue';

  export default {
    components: { topMenu },
    data() {
      const addMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          const telNum = /^1[34578][0-9]{9}$/;
          if (telNum.test(this.personnel.mobile)) {
            callback();
          } else {
            callback(new Error('请输入手机号码'));
          }
        }
      };
      const editMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else {
          const telNum = /^1[34578][0-9]{9}$/;
          if (telNum.test(this.editPersonnel.mobile)) {
            callback();
          } else {
            callback(new Error('请输入手机号码'));
          }
        }
      };
      return {
        menuList: [{
          link: '/authority',
          name: '广告主管理',
        },
        {
          link: '/authority/personnel',
          name: '人员管理',
        }],
        // 添加 - 所属经销商
        dealer: [],
        state: '',
        // 添加 - 运营权限
        roleLists: [],
        // 表格
        editPerson: false,
        dialogFormVisible: false,
        personnel: {
          userName: '',
          mobile: '',
          password: '',
          roleId: 1,
          dealer: '',
          advertiserId: '',
          value1: '',
        },
        formLabelWidth: '120px',
        tableData: {
          total: '',
          personData: [],
          pageSize: '',
          currentPage: 1,
        },
        editPersonnel: {
          userName: '',
          advertiserName: '',
          roleId: '',
          mobile: '',
          password: '',
          remark: '',
          userId: '',
          advertiserId: '',
          value2: '',
        },
        rules: {
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '请输入 6 到 16 位数字或字母', trigger: 'blur' },
          ],
          mobile: [
            { validator: addMobile, required: true, trigger: 'blur' },
          ],
          dealer: [
            { required: true, message: '请选择经销商', trigger: 'blur' },
          ],
          roleId: [
            { required: true, message: '请选择运营权限', trigger: 'blur' },
          ],
        },
        editRules: {
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          ],
          advertiserName: [
            { required: true, message: '请输入广告主', trigger: 'blur' },
            { min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '请输入 6 到 16 位数字或字母', trigger: 'blur' },
          ],
          mobile: [
            { validator: editMobile, required: true, trigger: 'blur' },
          ],
          roleId: [
            { required: true, message: '请选择运营权限', trigger: 'blur' },
          ],
          dealer: [
            { required: true, message: '请选择经销商', trigger: 'blur' },
          ],
        },
      };
    },
    created() {
      this.personnelData();
      this.roleList();
    },
    methods: {
      personnelData(opt) {
        // 获取列表数据
        const opts = Object.assign({
          page: this.currentPage,
          pageSize: this.pageSize,
        }, opt);
        axios.post('/user/list', opts).then((res) => {
          const data = res.data;
          if (data.status === 0) {
            this.tableData.total = data.total;
            this.tableData.pageSize = data.pageSize;
            this.tableData.personData = data.data;
          }
        });
      },
      // 分页
      handleSizeChange(val) {
        this.personnelData({
          pageSize: val,
        });
      },
      handleCurrentChange(val) {
        console.log(val);
        this.personnelData({
          page: val - 1,
        });
      },
      open() {
        // 打开弹层时，重置表单
        this.personnel.userName = '';
        this.personnel.mobile = '';
        this.personnel.radio = 1;
      },
      addPerson(personnel) {
        // 添加运营人员
        this.$refs[personnel].validate((valid) => {
          if (valid) {
            const opt = {
              userName: this.personnel.userName,
              password: this.personnel.password,
              mobile: this.personnel.mobile,
              roleId: this.personnel.roleId,
              advertiserId: this.personnel.advertiserId,
            };
            axios.post('/user/add', opt).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.personnelData();
              }
            });
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      roleList() {
        // 添加运营人员中的 运营权限
        axios.post('/role/list', {}).then((res) => {
          console.log(res);
          const data = res.data;
          if (data.status === 0) {
            let roleObj = {};
            const roleLists = [];
            const dataList = data.data;
            for (let i = 0; i < dataList.length; i++) {
              roleObj = {
                roleId: dataList[i].roleId,
                roleName: dataList[i].roleName,
              };
              roleLists.push(roleObj);
            }
            this.roleLists = roleLists;
            this.roleId = 1;
          }
        });
      },
      // 添加经销商
      addDealer() {
        axios.post('/advertiser/search', { name: 'ss' }).then((res) => {
          this.dealer = res.data.data;
        });
        this.dialogFormVisible = true;
      },
      // 编辑
      editer(row) {
        console.log(row);
        this.editPersonnel = {
          advertiserName: row.advertiserName,
          userName: row.userName,
          mobile: row.mobile,
          roleId: row.roleId,
          password: row.password,
          remark: row.remark,
          userId: row.userId,
          advertiserId: row.advertiserId,
        };
        axios.post('/advertiser/search', { name: 'ss' }).then((res) => {
          this.dealer = res.data.data;
        });
        this.editPerson = true;
      },
      // 编辑- 确定
      editPersons(editPersonnel) {
        this.$refs[editPersonnel].validate((valid) => {
          if (valid) {
            const opt = {
              userId: this.editPersonnel.userId,
              advertiserName: this.editPersonnel.advertiserName,
              userName: this.editPersonnel.userName,
              mobile: this.editPersonnel.mobile,
              roleId: this.editPersonnel.roleId,
              remark: this.editPersonnel.remark,
              advertiserId: this.editPersonnel.advertiserId,
            };
            axios.post('/user/update', opt).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.personnelData();
              }
            });
            this.editPerson = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  };
</script>
