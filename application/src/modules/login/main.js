// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Element from 'element-ui' //element-ui
import 'element-ui/lib/theme-default/index.css'; //element-ui

import Login from './page/Login'
import Sign from './page/Sign'
import VuexCommon from '../../store/store'
import config from '../../config/config'

Vue.config.productionTip = false

//使用插件
Vue.use(VueRouter)
Vue.use(Vuex)


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

const store = new Vuex.Store({
	modules:{
		common: VuexCommon
	}
})

const router = new VueRouter({
	routes: routes
})

router.beforeEach((to, from, next) =>{
	next();
})


/* eslint-disable no-new */
const app = new Vue({
	router,
	store
}).$mount('#login')
