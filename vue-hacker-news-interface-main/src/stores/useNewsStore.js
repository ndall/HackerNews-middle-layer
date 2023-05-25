import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetNews } from '../composables/useGetNews';

export const useNewsStore = defineStore('newsData', () => {
  const news = ref(null);
  const category = ref('top');
  const listLength = ref(50);
  const intervalDelay = ref(30);
  const intervalId = ref(null);

  function updateNews(isLoading) {
    useGetNews(news, category.value, listLength.value, isLoading);

    clearInterval(intervalId.value);

    intervalId.value = setInterval(
      () => useGetNews(news, category.value, listLength.value, isLoading),
      intervalDelay.value * 1000
    );
  }

  return {
    news,
    category,
    listLength,
    intervalDelay,
    intervalId,
    updateNews,
  };
});
