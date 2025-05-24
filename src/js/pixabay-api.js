import axios from 'axios';

const API_KEY = '50367317-4b50f00e153dc123b8b56efd6';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  const response = await axios.get(BASE_URL, { params });

  return response.data;
}