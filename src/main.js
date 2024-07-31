import { getImages } from './js/pixabay-api';
import { renderImg } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  btnSearch: document.querySelector('.btn-search'),
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
  ul: document.querySelector('ul.gallery'),
  loadBtn: document.querySelector('.load-btn'),
};

let page = 1;
let query = '';
let gallery = new SimpleLightbox('.gallery a');
refs.loadBtn.classList.add('hiddenBtn');
refs.form.addEventListener('submit', async e => {
  try {
    refs.loadBtn.classList.remove('hiddenBtn');
    e.preventDefault();
    query = refs.input.value.trim();
    if (query === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query',
      });
      return;
    }

    refs.ul.innerHTML = '';
    page = 1;
    startLoader();
    const result = await getImages(query, page);
    stopLoader();

    if (result.hits.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'No images found. Please try a different query.',
      });
      refs.loadBtn.classList.add('hiddenBtn');
    } else {
      renderImg(result.hits);
      gallery.refresh();
      if (result.hits.length < 15) {
        refs.loadBtn.classList.add('hiddenBtn');
      } else {
        refs.loadBtn.classList.remove('hiddenBtn');
      }
    }
  } catch (error) {
    stopLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong.',
    });
  }
});

refs.loadBtn.addEventListener('click', async () => {
  page += 1;
  startLoader();
  const result = await getImages(query, page);
  stopLoader();

  if (result.hits.length === 0) {
    refs.loadBtn.classList.add('hiddenBtn');
    iziToast.info({
      title: 'No more results',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    renderImg(result.hits);
    gallery.refresh();
    if (result.hits.length < 15) {
      refs.loadBtn.classList.add('hiddenBtn');
      iziToast.info({
        title: 'No more results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }
  scrollToEnd();
});

function scrollToEnd() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}

function startLoader() {
  refs.loadBtn.insertAdjacentHTML(
    'afterend',
    '<div id="loader" class="loader"></div>'
  );
}
function stopLoader() {
  document.querySelector('.loader').remove();
}
