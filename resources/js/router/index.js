import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: '',
        meta: {}
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
