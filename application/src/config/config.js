/*
*全局配置
 */

let token = window.localStorage.getItem('token');
let URL = `${window.location.hostname}:${window.location.port}`

export default {
	URL: URL,
	token: token,
	dbURL: 'http://127.0.0.1:3000'
}