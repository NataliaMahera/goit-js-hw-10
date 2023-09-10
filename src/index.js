import { getBreeds, getCatByBreed } from './js/cat-api.js';
import debounce from 'lodash.debounce';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const select = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.add('is-hidden');
error.classList.add('is-hidden');
catInfoContainer.classList.add('is-hidden');

getBreeds()
  .then(data => {
    select.innerHTML = renderSelectValue(data);
    new SlimSelect({
      select: select,
    });
    select.classList.remove('is-hidden');
  })
  .catch(onFetchError);

select.addEventListener('change', debounce(onSearchBreed, 1000));

function onSearchBreed(evt) {
  addClassHidden();
  Loading.standard('Loading data, please wait...', {
    clickToClose: true,
    svgSize: '19px',
  });

  const breedId = evt.target.value;

  getCatByBreed(breedId)
    .then(data => {
      catInfoContainer.innerHTML = renderCatMarkup(data);
      removeClassHidden();
    })
    .catch(onFetchError)
    .finally(() => {
      Loading.remove();
      select.classList.remove('is-hidden');
    });
}

function renderSelectValue(breed) {
  return breed
    .map(({ id, name }) => {
      return `<option value='${id}'>${name}</option>`;
    })
    .join('');
}

function renderCatMarkup(card) {
  return card
    .map(({ breeds, url }) => {
      return `<div class="box-img">
      <img src="${url}" alt="${breeds.name}" width="500"/></div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p>
      </div>`;
    })
    .join('');
}

function onFetchError() {
  addClassHidden();
  Loading.remove();
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function addClassHidden() {
  select.classList.add('is-hidden');
  catInfoContainer.classList.add('is-hidden');
  loader.classList.add('is-hidden');
}

function removeClassHidden() {
  select.classList.remove('is-hidden');
  catInfoContainer.classList.remove('is-hidden');
}
