import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import globalComponentInstaller from './components/_globals'

import 'bootstrap/dist/css/bootstrap.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@views/login.vue')
        },
        {
            path: '/contacts',
            name: 'Contacts',
            component: () => import('@views/home.vue')
        },
        {
            path: '/conversations',
            name: 'Conversations',
            component: () => import('@views/home.vue')
        }
    ]
})

const app = createApp(App)
    .use(router)
    .use(globalComponentInstaller)

router.isReady().then(()=> app.mount('#app'))


