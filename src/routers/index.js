// BUG FIXED: Menggunakan Static Import untuk mencegah Blank Screen pada Vite
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import Landing from '../views/Landing.vue';
import Shop from '../views/Shop.vue';
import TutorDetail from '../views/TutorDetail.vue';
import Checkout from '../views/Checkout.vue';
import Classroom from '../views/Classroom.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Landing', component: Landing },
      { path: 'shop', name: 'Shop', component: Shop },
      { path: 'tutor/:id', name: 'TutorDetail', component: TutorDetail },
      { path: 'checkout/:id', name: 'Checkout', component: Checkout },
      { path: 'classroom', name: 'Classroom', component: Classroom },
      { path: 'profile', name: 'Profile', component: Profile }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Selalu scroll ke atas saat pindah halaman
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;