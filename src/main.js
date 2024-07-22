import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { renderImg } from './js/render-functions';
import simpleLightbox from 'simplelightbox';

const refs = {
  btnSubEl: document.querySelector('.btn-search'),
  formEl: document.querySelector('.form'),
  input: document.querySelector('input'),
  ul: document.querySelector('ul'),
};

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  refs.ul.innerHTML = '';
  if (refs.input.value.trim()) {
    const res = searchImages(refs.input.value.trim());
    res
      .then(response => {
        if (response.total !== 0) {
          renderImg(response.hits);
          let gallery = new simpleLightbox('.gallery a');
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
        document.querySelector('.loader').remove();
      });
    refs.input.value = '';
  } else {
    iziToast.error({
      message: 'Please fill in the input field :c',
      position: 'topRight',
    });
  }
});
