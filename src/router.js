import { createRouter, createWebHistory } from 'vue-router';

import CoacheDetail from './pages/coaches/CoacheDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoacheRegistration from './pages/coaches/CoacheRegistration.vue'
import ContactCoache from './pages/requests/ContactCoache.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoacheDetail,
      children: [{ path: 'contact', component: ContactCoache }]
    },
    { path: '/register', component: CoacheRegistration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
