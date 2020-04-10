import Vue from 'vue'
import VueRouter from 'vue-router'
import terminalRoutes from './terminal-router'
import errorRoutes from './error-router'

Vue.use(VueRouter)

const routes = []
routes.push(...terminalRoutes)
routes.push(...errorRoutes)

const router = new VueRouter({
  routes: routes
})

export default router
