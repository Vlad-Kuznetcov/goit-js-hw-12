import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
// console.log('hello api');

export function getImages(img) {
  const form = document.querySelector('.form');
  form.insertAdjacentHTML('afterend', '<div class="loader"></div>');

  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '45057307-b447de7416eadb33be54d4a0d',
    q: img,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 20,
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    })
    .finally(() => {
      const loader = document.querySelector('.loader');
      if (loader) {
        loader.remove();
      }
    });
}
