import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem('access-token') || null,
        admin: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")).status : 0
    },
    getters: {
        loggedIn(state) {
            return state.user !== null
        },
        isAdmin(state) {
            return state.admin
        },
        config(state) {
            let config = {
                headers: {
                    Authorization: 'Bearer ' + state.token
                }
            };
            return config
        }
    },
    mutations: {
        login(state) {
            state.user = localStorage.getItem("user")
            state.token = localStorage.getItem("access-token")
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
                            id: res.data.user.id,
                            name: res.data.user.name,
                            email: res.data.user.email,
                            status: res.data.user.admin
                        };
                        const $token = res.data.token
                        localStorage.setItem("user", JSON.stringify(user))
                        localStorage.setItem("access-token", $token)
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
                    localStorage.removeItem('access-token')
                    context.commit('logout')
                    resolve(res);
                })
                .catch(error => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('access-token')
                    context.commit('logout')
                    reject(error)
                })
            })
        },
        register(context) {
            return new Promise((resolve, reject) => {
                axios.get('/sanctum/csrf-cookie').then(res => {
                    axios.post('/register',this.formData).then(res => {
                        console.log(res);
                        let user = {
                            id: res.data.user.id,
                            name: res.data.user.name,
                            email: res.data.user.email,
                            status: res.data.user.admin
                        };
                        const $token = res.data.token
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("access-token", $token)
                        context.commit('login')
                        resolve(res)
                    })
                    .catch(error => {
                        reject(error)
                    });
                });
            })
        }
    }
})
