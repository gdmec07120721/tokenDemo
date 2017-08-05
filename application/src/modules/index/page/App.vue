<style scoped>
	.login_til{text-align: center; color: #20a0ff;}
	.text{padding-left: 10px; color: #20a0ff; font-size: 14px;}
</style>

<template>
<div>asdasd</div>
</template>

<script>
import axios from 'config/axios'
import config from 'config/config'

export default {
	created(){
		axios({
			url: '/users/info',
			method: 'get',
			data: ''
		}).then(o => {
			console.log(o)
		}, reject => {
		})
	},
}
</script>