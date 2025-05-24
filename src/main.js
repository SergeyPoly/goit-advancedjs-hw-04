import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  showDOMElement,
  hideDOMElement,
  renderGallery,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
let totalImages = 0;
let loadedImages = 0;

function getIziToastOptions({ message, icon, color }) {
  return ({
    icon,
    iconColor: 'white',
    message,
    messageColor: 'white',
    position: 'topRight',
    timeout: 3000,
    color,
    maxWidth: '432px',
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = form.elements.query.value.trim();

  if (!currentQuery) {
    iziToast.show(getIziToastOptions({
      message: 'Please enter a search query!',
      color: '#EF4040',
      icon: 'fa-solid fa-circle-exclamation',
    }));
    return;
  }

  clearGallery();
  currentPage = 1;
  loadedImages = 0;
  hideDOMElement(loadMoreBtn);
  showDOMElement(loader);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    const images = data.hits;
    totalImages = data.totalHits;

    if (!images.length) {
      iziToast.show(getIziToastOptions({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        color: '#EF4040',
        icon: 'fa-solid fa-circle-exclamation',
      }));
      return;
    }

    renderGallery(images);
    loadedImages += images.length;

    if (loadedImages < totalImages) {
      showDOMElement(loadMoreBtn);
    }
  } catch (error) {
    iziToast.show(getIziToastOptions({
      message: 'Something went wrong. Please try again later.',
      color: '#EF4040',
      icon: 'fa-solid fa-circle-exclamation',
    }));
  } finally {
    hideDOMElement(loader);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideDOMElement(loadMoreBtn);
  showDOMElement(loader);

  try {
    const data = await fetchImages(currentQuery, currentPage);
    const images = data.hits;
    loadedImages += images.length;
    renderGallery(images);

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (loadedImages >= totalImages) {
      iziToast.show(getIziToastOptions({
        message: 'We\'re sorry, but you\'ve reached the end of search results.',
        color: '#00BFFF',
        icon: 'fa-solid fa-circle-info',
      }));
    } else {
      showDOMElement(loadMoreBtn);
    }
  } catch (error) {
    iziToast.show(getIziToastOptions({
      message: 'Failed to load more images.',
      color: '#EF4040',
      icon: 'fa-solid fa-circle-exclamation',
    }));
  } finally {
    hideDOMElement(loader);
  }
});
