import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import { getApiImg } from './js/searchApi.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  inputForm: document.querySelector('.form-input'),
  gallery: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('.load-more'),
};

// let inputValue = refs.inputForm.value.trim();
let page = 1;

const lightbox = new SimpleLightbox('.gallery a');

Notiflix.Notify.init({
  width: '480px',
});

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  let inputValue = refs.inputForm.value.trim();

  if (!inputValue) {
    clearGallery();
    return;
  }

  try {
    const searchGallery = await getApiImg(inputValue, page);
    createGallery(searchGallery.hits);

    if (searchGallery.totalHits) {
      Notiflix.Notify.success(
        `Hooray! We found ${searchGallery.totalHits} images.`
      );
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
  page += 1;
});

// refs.loadMoreBtn.addEventListener('click', async () => {
//   let inputValue = refs.inputForm.value.trim();

//   const searchGallery = await getApiImg(inputValue, page);
//   createGallery(searchGallery.hits);
//   page += 1;
// });

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function createMarkupItem({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <a class="photo__link" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" loading="lazy" alt="${tags}" />
      </a>
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    <span>${likes}</span>
  </p>
  <p class="info-item">
    <b>Views</b>
    <span>${views}</span>
  </p>
  <p class="info-item">
    <b>Comments</b>
    <span>${comments}</span>
  </p>
  <p class="info-item">
    <b>Downloads</b>
    <span>${downloads}</span>
  </p>
</div>
</div>`;
}

function createGallery(arr) {
  clearGallery();
  const galleryList = arr.reduce(
    (acc, item) => acc + createMarkupItem(item),
    ''
  );
  return refs.gallery.insertAdjacentHTML('beforeend', galleryList);
}
