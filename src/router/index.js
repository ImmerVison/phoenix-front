import { createRouter, createWebHistory} from 'vue-router';
const routes = [

  {
    path: '/categories/1',
    component: () => import('~/components/Categories.vue'),
  },
  {
    path: '/blog/:filepath*',
    component: () => import('~/pages/Home.vue'),
  },

  {path: '/home', name: 'home', component: () => import('~/components/homePage/HomePage.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/', name: 'index', component: () => import('~/pages/Home.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/about', name: 'about', component: () => import('~/pages/About.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/upload',name: 'upload',component: () => import('~/pages/UploadView.vue'),meta: {keepAlive: true,noCache: true}},
  {path: '/:pathMatch(.*)',name: 'fnf',component: () => import('~/pages/404.vue'),meta: {keepAlive: false,noCache: true}},

]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
