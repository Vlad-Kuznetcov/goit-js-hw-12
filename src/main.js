import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { renderImg } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  btnSubEl: document.querySelector('.btn-search'),
  formEl: document.querySelector('.form'),
  input: document.querySelector('input'),
  ul: document.querySelector('ul'),
  loader: document.querySelector('.loader'),
};

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  refs.ul.innerHTML = '';

  if (refs.input.value.trim()) {
    showLoader();

    const res = searchImages(refs.input.value.trim());
    res
      .then(response => {
        if (response.total !== 0) {
          renderImg(response.hits);
          let gallery = new SimpleLightbox('.gallery a');
          showLoader();
          gallery.refresh();
        } else {
          iziToast.error({
            message: 'Image is not found',
            position: 'topRight',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        hideLoader();
        // clearGallery();
        refs.input.value = '';
      });
  } else {
    iziToast.error({
      message: 'Please fill in the input field',
      position: 'topRight',
    });
  }
});

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}
