import { createRouter, createWebHistory} from 'vue-router';
const routes = [
  // {path: '/', name: 'home', component: () => import('~/pages/Home.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/', name: 'home', component: () => import('~/pages/UploadView.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/upload',name: 'upload',component: () => import('~/pages/UploadView.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/:pathMatch(.*)',name: 'fnf',component: () => import('~/pages/404.vue'),meta: {keepAlive: false,noCache: true}},

]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
