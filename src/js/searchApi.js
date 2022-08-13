import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '29165629-e4560c22cdc5666e7412722cd';

export const getApiImg = async (name, page) => {
  const respons = await axios.get(
    `?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${name}&safesearch=true&per_page=40&page=${page}`
  );
  return await respons.data;
};
