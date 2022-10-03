import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      public: true,
      requireAuth: false,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      public: false,
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.public)) {
    next();
  } else if (to.matched.some((ruta) => ruta.meta.requireAuth)) {
    const user = 'ok'; //TODO usuario actual Esta Logueado
    if (!user) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next({ name: 'Login' });
  }
});

export default router;
