import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30780991-15ded2d5552668bc218cc390e';

export const obj = {
  params: {
    key: KEY,
    q: 'at',
    page: 1,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
};

export const fetchImg = async (page, query) => {
  obj.params.page = page;
  obj.params.q = query;

  if (obj.params.q.length === 0) {
    return;
  }
  const response = await axios.get(BASE_URL, obj);
  console.log(response.data.hits);

  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webSize: webformatURL,
        largeSize: largeImageURL,
        tags,
      };
    }
  );
  return images;
};

export * from './galleryApi';
