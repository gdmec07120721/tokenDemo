// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Routes from './route/routes'
import VuexCommon from '../../store/store'

import config from '../../config/config'

Vue.config.productionTip = false

//使用插件
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		common: VuexCommon
	}
})

const router = new VueRouter({
	routes: Routes
})

function getUserInfo(){
	return new Promise((resolve, reject) => {
		if (config.token) {
			console.log('登录...')
			resolve()
		}else{
			console.log('没有登录...')
			
		}
	})
}

router.beforeEach((to, from, next) => {
	getUserInfo().then(resolve => {
		
	},reject => {

	})
	next()
})

/* eslint-disable no-new */
const app = new Vue({
	router,
	store
}).$mount('#app')
