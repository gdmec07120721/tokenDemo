<style scoped>
	.login_til{text-align: center; color: #20a0ff;}
	.text{padding-left: 10px; color: #20a0ff; font-size: 14px;}
</style>

<template>
<div>欢迎<span>{{user.name}}</span> <a href="javascript:;" @click="logout">退出</a></div>

</template>

<script>
import axios from 'config/axios'
import config from 'config/config'

export default {
	data(){
		return{
			user: {
				name: ''
			}
		}
	},
	created(){
		axios({
			url: '/users/info',
			method: 'post',
		}).then(o => {
			console.log(o)
		}, reject => {
		})
		this.user = this.$store.state.common.user
	},
	methods: {
		logout(){
			axios({
				url: '/users/logout',
				method: 'get',
			}).then(o => {
				if (o.data.rescode === 0) {
					window.localStorage.removeItem('token')
					window.location.href = `//${config.URL}/login.html#/`
				}
			}, reject => {
			})
		}
	}
}
</script>