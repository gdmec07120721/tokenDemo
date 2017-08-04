/*
*接口配置
 */

var axios = require('axios')

module.exports = axios.create({
	baseURL: 'http://127.0.0.1:3000',
	/*withCredentials: true,//允许跨域请求发送cookie等用户认证凭据*/
	dataType: 'JSONP'
})