/*
*公共vuex
 */

const state = {
	user: {
		
	}
}

const getters = {

}

const mutations = {
	USER(state, user){
		console.log(user)
		state.user = user
	}
}

const actions = {

}

export default {
	state,
	getters,
	mutations,
	actions
}