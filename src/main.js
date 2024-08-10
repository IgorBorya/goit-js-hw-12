import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('#load-more');
let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  currentQuery = event.currentTarget.elements.searchQuery.value.trim();
  currentPage = 1;
  clearGallery();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  try {
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Please try again.',
      });
      return;
    }

    renderGallery(data.hits);
    toggleLoadMoreButton(data.totalHits > currentPage * data.hits.length);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits);
    toggleLoadMoreButton(data.totalHits > currentPage * data.hits.length);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
}

function clearGallery() {
  const galleryContainer = document.querySelector('#gallery');
  galleryContainer.innerHTML = '';
}

function toggleLoadMoreButton(show) {
  loadMoreButton.style.display = show ? 'block' : 'none';
}
