<template>
  <el-dialog title="详情----" :visible.sync="visible" @close="cancel">
		<el-form :model="details">
			<el-form-item label="用户公众号" :label-width="formLabelWidth">
				<el-input v-model="details.wxName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="企业名称" :label-width="formLabelWidth">
				<el-input v-model="details.wxCompany" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="联系人电话" :label-width="formLabelWidth">
				<el-input v-model="details.telephone" auto-complete="off"></el-input>
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
			<el-button @click="cancel">取 消</el-button>
			<el-button type="primary" @click="cancel">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
export default {
  props: ['visible', 'details'],
  data() {
    return {
      formLabelWidth: '120px',
      visible: false,
      // detailsAdver: 'detailsAdver',
    };
  },
  methods: {
    cancel() {
      this.visible = false;
      this.$emit('detailsVisible', this.visible);
    },
  },
};
</script>

