import axios from 'axios';
import { PICTURES_ON_PAGE } from '../constants/constants';

const axiosPixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '30822635-da19196ea06d6070ef0548dd1',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PICTURES_ON_PAGE,
  },
});

async function fetchPixabayImages(q, page) {
  const { data } = await axiosPixabay.get('', { params: { q, page } });
  return data;
}

export default fetchPixabayImages;
