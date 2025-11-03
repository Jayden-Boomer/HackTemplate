import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AuthView from '../views/AuthView.vue'
import ChatView from '../views/ChatView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/chat', name: 'Chat', component: ChatView },
  { path: '/auth', name: 'Auth', component: AuthView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  
})

export default router