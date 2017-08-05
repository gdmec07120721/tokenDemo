<style scoped>
	.login_til{text-align: center; color: #20a0ff;}
	.text{padding-left: 10px; color: #20a0ff; font-size: 14px;}
</style>

<template>
<el-row>
  <h1 class="login_til">Login</h1>
  <el-col :span="7" :offset="8">
	<el-form :model="loginForm" :rules="login" ref="loginForm" label-width="100px" class="demo-loginForm">
	  <el-form-item label="用户名" prop="name">
	    <el-input v-model.number="loginForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" prop="pass">
	    <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
	  </el-form-item>
	  <el-col :span="20" :offset="10">
	    <el-button type="primary" @click="submitForm(loginForm, 'loginForm')">登录</el-button>
	    <el-button @click="resetForm('loginForm')">重置</el-button>
	    <router-link to="/sign" class="text" >注册</router-link>
	  </el-col>
	</el-form>
  </el-col>
</el-row>	

</template>

<script>
import axios from 'config/axios'
import config from 'config/config'

export default {
    data() {
		return {
			loginForm: {
			  name: '',
			  pass: ''
			},
			login: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				pass: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
				]
	        }
		};
    },
    methods: {

		submitForm(formDame, formName) {
			let self = this

			if (this.isValidate()) {
				axios({
					url: '/users/login',
					method: 'post',
					data: formDame
				}).then(o => {
					if (o.data.rescode === 0 ) {
						let user = o.data.resresult[0]
						this.$store.commit('USER', user)
						window.localStorage.setItem('token', user.token)
						window.location.href = `//${config.URL}/index.html#/`
					}
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
			return true
		}
	}
}
</script>