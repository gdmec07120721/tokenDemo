<style scoped>
	.login_til{text-align: center; color: #20a0ff;}
	.text{padding-left: 10px; color: #20a0ff; font-size: 14px;}
</style>

<template>
<el-row>
  <h1 class="login_til">Sign up</h1>
  <el-col :span="7" :offset="8">
	<el-form :model="signForm" :rules="login" ref="signForm" label-width="100px" class="demo-signForm">
	  <el-form-item label="用户名" prop="name">
	    <el-input v-model.number="signForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" prop="pass">
	    <el-input type="password" v-model="signForm.pass" auto-complete="off"></el-input>
	  </el-form-item>
	  <el-form-item label="确认密码" prop="repass">
	    <el-input type="password" v-model="signForm.repass" auto-complete="off"></el-input>
	  </el-form-item>
	  <el-col :span="20" :offset="10">
	    <el-button type="primary" @click="submitForm(signForm, 'signForm')">注册</el-button>
	    <el-button @click="resetForm('signForm')">重置</el-button>
	    <router-link to="/login" class="text" >登录</router-link>
	  </el-col>
	</el-form>
  </el-col>
</el-row>	

</template>

<script>
import axios from 'config/axios'

export default {
    data() {
		return {
			signForm: {
			  name: '',
			  pass: '',
			  repass: ''
			},
			login: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				pass: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
				],
				repass: [
					{ required: true, message: '请输入确认密码', trigger: 'blur' },
					{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
				]
	        }
		};
    },
    methods: {
		submitForm(formData, formName) {
			let self = this 

			if (this.isValidate()) {
				axios({
					url: '/users/sign',
					method: 'post',
					data: formData
				}).then(o => {
					if (o.data.rescode == 0) {
						this.$message({
							message: '注册成功！请登录。',
							type: 'warning'
						})
						self.$router.push('/login')
					}else{
						this.$message({
							message: o.data.resmsg,
							type: 'success'
						})
					}
					this.$refs[formName].resetFields();
				}, reject => {
					this.$message({
						message: reject,
						type: 'error'
					})
				})
			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		isValidate(formName){
			if (this.signForm.name == '') {
				this.$message({
					message: '用户名不能为空',
					type: 'error'
				})
				return false
			}
			if (this.signForm.pass == '') {
				this.$message({
					message: '密码不能为空',
					type: 'error'
				})
				return false
			}
			if (this.signForm.repass == '') {
				this.$message({
					message: '确认密码不能为空',
					type: 'error'
				})
				return false
			}
			if (this.signForm.pass != this.signForm.repass) {
				this.$message({
					message: '确认密码不一致',
					type: 'error'
				})
				return false
			}
			return true
		}
	}
}
</script>