// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Routes from './routes'
import VuexCommon from '../../store/store'

import Cookie from '../../utils/cookie'

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
		if (Cookie.get() && sessionStorage.getItem('sessionId')) {
			
		}else{
			console.log('没有登录...')
			resolve()
		}
	})
}

router.beforeEach((to, from, next) => {
	getUserInfo().then(resolve => {
		
	},reject => {

	})
})

/* eslint-disable no-new */
const app = new Vue({
	router,
	store
}).$mount('#app')
