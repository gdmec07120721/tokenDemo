// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui' //element-ui
import 'element-ui/lib/theme-default/index.css'; //element-ui

import Login from './page/Login'
import Sign from './page/Sign'

Vue.config.productionTip = false

//使用插件
Vue.use(VueRouter)
Vue.use(Element) //element-ui

const routes =  [{
	path: '*',
	redirect: '/login'
},{
	path: '/login', 
	component: Login, 
	meta:{
		title: '登录'
	}
},{
	path: '/sign', 
	component: Sign, 
	meta:{
		title: '注册'
	}
}]

const router = new VueRouter({
	routes: routes
})


/* eslint-disable no-new */
const app = new Vue({
	router
}).$mount('#login')
