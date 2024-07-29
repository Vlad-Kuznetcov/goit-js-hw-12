import { getImages } from './js/pixabay-api';
import { renderImg } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// console.log('hello main');

const refs = {
  btnSearch: document.querySelector('.btn-search'),
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
  ul: document.querySelector('ul'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.ul.innerHTML = '';

  if (refs.input.value.trim()) {
    const result = getImages(refs.input.value);
    result
      .then(response => {
        if (response.total !== 0) {
          renderImg(response.hits);
          let gallery = new SimpleLightbox('.gallery a');
          gallery.refresh();
        } else {
          iziToast.error({
            message:
              'SSorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        refs.input.value = '';
      });
  } else {
    iziToast.error({
      message: 'Enter value',
      position: 'topRight',
    });
  }
});
