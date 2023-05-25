import axios from 'axios';

export async function useGetStory(id, ref = null) {
  try {
    const { data } = await axios.get(
      //Hacker news original api
      // `https://hacker-news.firebaseio.com/v0/item/${id}.json`

      //Middle layer
      // `http://localhost:8000/getItem?id=${id}`

      //Nuvolaris 
      `http://localhost:3233/api/v1/web/nuvolaris/default/getItem.json?id=${id}`
    );

    if (ref) {
      ref.value = data;
    } else {
      return data;
    }
  } catch (error) {
    console.log('Failed to get a story: ', error);
  }
}
