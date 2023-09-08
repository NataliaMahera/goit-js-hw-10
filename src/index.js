import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import '../css/styles.css';
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

// let arrBreedsId = [];

fetchBreeds()
  .then(data => {
    select.innerHTML = data
      .map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      })
      .join('');

    new SlimSelect({
      select: select,
      settings: {
        placeholderText: 'Search',
      },
      //
    });
  })
  .catch(onFetchError);
// .finally(() => {
//   Loading.remove();
// });

// fetchBreeds()
//   .then(data => {
//     data.forEach(breed => {
//       arrBreedsId.push({ text: breed.name, value: breed.id });
//     });
//     new SlimSelect({
//       settings: {
//         placeholderText: 'Search',
//       },
//       select: select,
//       data: arrBreedsId,
//     });
//   })
//   .catch(onFetchError)
//   .finally(() => {
//     Loading.remove();
//   });

select.addEventListener('change', debounce(onSearchBreed, 1000));

function onSearchBreed(evt) {
  addClassHidden();
  Loading.standard('Loading data, please wait...', {
    clickToClose: true,
    svgSize: '19px',
  });

  const breedId = evt.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      catInfoContainer.innerHTML = renderCatMarkup(data);
      removeClassHidden();
      Loading.remove();
    })
    .catch(onFetchError);
}

function renderCatMarkup(result) {
  return result
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
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-top',
  });
}

function addClassHidden() {
  select.classList.add('is-hidden');
  catInfoContainer.classList.add('is-hidden');
}

function removeClassHidden() {
  select.classList.remove('is-hidden');
  catInfoContainer.classList.remove('is-hidden');
}
