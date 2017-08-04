/*
*公共路由
 */

import App from './page/App'

const routes =  [
	{path: '*',redirect: '/index'},
	{path: '/index', component: App, meta:{title: '首页'}}

]

export default routes