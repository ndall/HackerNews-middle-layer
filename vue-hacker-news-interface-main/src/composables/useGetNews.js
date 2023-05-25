import axios from 'axios';
import { useGetStory } from './useGetStory';

export async function useGetNews(news, newsCategory, listLength, isLoading) {
  try {
    isLoading.value = true;

    let { data } = await axios.get(
      // `https://hacker-news.firebaseio.com/v0/${newsCategory}stories.json`
      // `http://localhost:8000/getStories?newsCategory=${newsCategory}`

      //Nuvolaris
      `http://localhost:3233/api/v1/web/nuvolaris/default/getStories.json?newsCategory=${newsCategory}`
    );

    //Uncomment line bellow if Nuvolaris is used since Nuvolaris getStories action returns the news in a field called response
    data = data.response;

    data = await Promise.all(
      data.slice(0, listLength).map((id) => useGetStory(id))
    );

    news.value = data;
  } catch (error) {
    console.log('Failed to get a news list: ', error);
  } finally {
    isLoading.value = false;
  }
}
