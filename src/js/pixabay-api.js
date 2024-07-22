import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

export async function searchImages(value) {
  const form = document.querySelector('.form');
  form.insertAdjacentHTML('afterend', '<div id="loader" class="loader"></div>');
  const params = new URLSearchParams({
    key: '45057307-b447de7416eadb33be54d4a0d',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 20,
  });
  const baseUrl = 'https://pixabay.com/api/';
  const response = await fetch(`${baseUrl}?${params}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
