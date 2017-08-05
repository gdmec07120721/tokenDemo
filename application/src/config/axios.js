/*
*接口配置
 */

var axios = require('axios')
var config = require('./config')

console.log(config)

module.exports = axios.create({
	baseURL: config.default.dbURL,
	/*withCredentials: true,//允许跨域请求发送cookie等用户认证凭据*/
	dataType: 'JSONP',
	headers: {
		_session_token: config.default.token
	}
})