import { auth } from '~/plugins/firebase'

export const state = () => ({
    user: '',
    login: false,
})

export const actions = {
    confirmLogin({ commit }) {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                commit('yesLogin');
            } else {
                commit('noLogin');
            }
        })
    }
}

export const mutations = {
    yesLogin(state) {
        state.user.login = true;
    },
    noLogin(state) {
        state.user.login = false;
    },
    signOut(state) {
        state.user = '';
        state.user.login = false;
    }
}

export const getters = {
    login: state => state.login === true,
    logout: state => state.login === false
}