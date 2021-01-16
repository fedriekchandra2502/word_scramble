import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        admin: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).status : 0
    },
    getters: {
        loggedIn(state) {
            return state.user !== null
        },
        isAdmin(state) {
            return state.admin
        }
    },
    mutations: {
        login(state) {
            state.user = localStorage.getItem("user")
            state.admin = JSON.parse(localStorage.getItem("user")).status
        },
        logout(state) {
            state.user = null
        }
    },
    actions: {
        login(context, credentials) {
            return new Promise((resolve,reject) => {
                axios.get('/sanctum/csrf-cookie').then(resp => {
                    axios.post('/login',credentials).then(res => {
                        let user = {
                            id: res.data.id,
                            name: res.data.name,
                            email: res.data.email,
                            status: res.data.admin
                        };
                        localStorage.setItem("user", JSON.stringify(user));
                        context.commit('login')
                        resolve(res)
                    })
                    .catch(error => {
                        reject(error)
                    })
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        logout(context) {
            return new Promise((resolve, reject) => {
                axios.post('/logout').then(res => {
                    localStorage.removeItem('user')
                    context.commit('logout')
                    resolve(res);
                })
                .catch(error => {
                    localStorage.removeItem('user')
                    context.commit('logout')
                    reject(error)
                })
            })
        }
    }
})
