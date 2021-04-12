
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Follow from '../views/Follow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'
import Home from '../views/Home.vue'
import Manage from '../views/Manage.vue'
import PostDetail from '../views/PostDetail.vue'

Vue.use(VueRouter)
// 全局的把push的异常给处理了
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/', component: Home, name: 'home' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/my-comment', component: MyComment, name: 'my-comment' },
  { path: '/my-star', component: MyStar, name: 'my-star' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' }

]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  const topath = ['/user', '/user-edit', '/follow', '/my-comment', '/my-star']
  if (!topath.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
