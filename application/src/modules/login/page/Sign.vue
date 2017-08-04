<style scoped>
	.login_til{text-align: center; color: #20a0ff;}
	.text{padding-left: 10px; color: #20a0ff; font-size: 14px;}
</style>

<template>
<el-row>
  <h1 class="login_til">Sign up</h1>
  <el-col :span="7" :offset="8">
	<el-form :model="loginForm" :rules="login" ref="loginForm" label-width="100px" class="demo-loginForm">
	  <el-form-item label="用户名" prop="name">
	    <el-input v-model.number="loginForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" prop="pass">
	    <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
	  </el-form-item>
	  <el-form-item label="确认密码" prop="repass">
	    <el-input type="password" v-model="loginForm.repass" auto-complete="off"></el-input>
	  </el-form-item>
	  <el-col :span="20" :offset="10">
	    <el-button type="primary" @click="submitForm(loginForm, 'loginForm')">注册</el-button>
	    <el-button @click="resetForm('loginForm')">重置</el-button>
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
			loginForm: {
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
							type: 'warning'
						})
					}
					this.$refs[formName].resetFields();
				}, reject => {
					this.$message({
						message: reject,
						type: 'warning'
					})
				})
			}
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		isValidate(formName){
			if (this.loginForm.name == '') {
				this.$message({
					message: '用户名不能为空',
					type: 'warning'
				})
				return false
			}
			if (this.loginForm.pass == '') {
				this.$message({
					message: '密码不能为空',
					type: 'warning'
				})
				return false
			}
			if (this.loginForm.repass == '') {
				this.$message({
					message: '确认密码不能为空',
					type: 'warning'
				})
				return false
			}
			if (this.loginForm.pass != this.loginForm.repass) {
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