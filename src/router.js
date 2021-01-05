import { createRouter, createWebHistory } from 'vue-router';

import CoacheDetail from './pages/coaches/CoacheDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoacheRegistration from './pages/coaches/CoacheRegistration.vue';
import ContactCoache from './pages/requests/ContactCoache.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoacheDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoache }]
    },
    {
      path: '/register',
      component: CoacheRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
