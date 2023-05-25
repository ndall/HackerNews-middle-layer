import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import StoryView from '../views/StoryView.vue';
import NotFound from '../views/NotFound.vue';
import { useNewsStore } from '../stores/useNewsStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },

    {
      path: '/storyid=:id(\\d+)',
      name: 'story',
      component: StoryView,
      props: (route) => ({ id: Number(route.params.id) }),
      beforeEnter: (to) => {
        const { news } = useNewsStore();
        const story = news.find((item) => item.id === Number(to.params.id));

        if (!story)
          return {
            name: '404',
            params: { pathMatch: to.path.slice(1).split('/') },
            query: to.query,
            hash: to.hash,
          };
      },
    },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return to.name === 'main' ? savedPosition : { top: 0 };
  },
});

export default router;
