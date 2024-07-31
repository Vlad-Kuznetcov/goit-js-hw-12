import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45057307-b447de7416eadb33be54d4a0d';
const STATUS_BAD_REQUEST = 400;

export async function getImages(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: page,
  };

  try {
    const response = await axios.get(BASE_URL, { params: params });
    return response.data;
  } catch (error) {
    if (error.response.status === STATUS_BAD_REQUEST) {
      iziToast.error({
        message: `Request error: ${error}`,
        position: 'topRight',
      });
    }
  }
}
