import Vue from 'vue'
import Router from 'vue-router'
import $cookie from 'vue-cookie'

import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import Lobby from '@/pages/Lobby'
import Play from '@/pages/Play'
import NotFound from '@/pages/404'
import Unauthorized from '@/pages/401'
import Forbidden from '@/pages/403'

Vue.use(Router)

export const router = new Router({
  history: true,
  routes: [
    {
      path: '/',
      name: 'Lobby',
      component: Lobby,
      meta: {
        requireAuth: true,
        public: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        public: true
      }
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      meta: {
        public: true
      }
    },
    {
      path: '*',
      redirect: '/404',
      meta: {
        public: true
      }
    },
    {
      path: '/401',
      name: '401',
      component: Unauthorized,
      meta: {
        public: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      meta: {
        public: true
      }
    },
    {
      path: '/403',
      name: '403',
      component: Forbidden,
      meta: {
        public: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let token = localStorage._token
  let userSession = $cookie.get('userSession')

  if (to.meta.public) {
    return next()
  }

  if (to.meta.requireAuth) {
    if (!token) {
      console.error("Token was invalid. Proceed to login.")
      return next('/login')
    } else {
      if (userSession) {
        console.error("Multiple Login Detected. Cannot continue.")
        return next('/403')
      } else {
        return next()
      }
    }
  } else {
    return next('/login');
  }
});

export default router
