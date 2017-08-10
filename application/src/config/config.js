/*
*全局配置
 */

let token = window.localStorage.getItem('token');
let URL = `${window.location.hostname}:${window.location.port || 80}`

export default {
	URL: URL,
	token: token,
	dbURL: 'http://127.0.0.1:3000'
}