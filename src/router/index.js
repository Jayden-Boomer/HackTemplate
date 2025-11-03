import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AuthView from '../views/AuthView.vue'
import ChatView from '../views/ChatView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/chat', component: ChatView },
  { path: '/auth', component: AuthView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  
})

export default router