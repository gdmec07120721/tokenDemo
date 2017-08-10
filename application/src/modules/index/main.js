// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Routes from './route/routes'

import VuexCommon from '../../store/store'

import axios from 'config/axios'
import config from 'config/config'

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
			if (store.state.common.user.name) {
				resolve(store.state.common.user)
			}else {
				axios({
					url: '/users/info',
					method: 'post',
				}).then(o => {
					if (o.data.rescode === 0) {
						resolve(o.data.resresult[0])
					}else{
						reject()
					}
				}, err => {
					reject()
				})
			}
		}else{
			window.location.href = `//${config.URL}/login.html#/`
		}
	})
}



router.beforeEach((to, from, next) => {
	getUserInfo().then(resolve => {
		store.commit('USER', resolve)
		next()
	},reject => {
		window.location.href = `//${config.URL}/login.html#/`
	})
	
})

/* eslint-disable no-new */
const app = new Vue({
	router,
	store
}).$mount('#app')
