import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginComponent from '../pages/Login.vue'
import RegisterComponent from '../pages/Register.vue'
import DashboardComponent from '../pages/Dashboard.vue'
import NotFoundComponent from '../pages/NotFound.vue'
import LogoutComponent from '../pages/Logout.vue'
import MyHistoryComponent from '../pages/MyHistory.vue'
import UserListComponent from '../pages/UserList.vue'
import UserHistoryComponent from '../pages/UserHistory.vue'
import { store } from '../store/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: LoginComponent,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterComponent,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: LogoutComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/myhistory',
        name: 'myhistory',
        component: MyHistoryComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users',
        name: 'userlist',
        component: UserListComponent,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/user/:id/history',
        name: 'userhistory',
        component: UserHistoryComponent,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '*',
        component: NotFoundComponent
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!store.getters.loggedIn) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            if(to.matched.some(record => record.meta.requiresAdmin)) {
                if(!store.getters.isAdmin) {
                    next({
                        path: '/dashboard',
                        query: { redirect: to.fullPath }
                    })
                } else {
                    next()
                }
            } else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.requiresGuest)) {
        if(store.getters.loggedIn) {
            next({
                path: '/dashboard',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
        next()
    } else {
        next()
    }
})

export default router
