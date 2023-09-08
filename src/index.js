import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import debounce from 'lodash.debounce';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const select = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.style.visibility = 'hidden';
error.style.visibility = 'hidden';
catInfoContainer.style.visibility = 'hidden';

let arrBreedsId = [];

fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      arrBreedsId.push({ text: breed.name, value: breed.id });
    });
    new SlimSelect({
      select: select,
      data: arrBreedsId,
    });
  })
  .catch(onFetchError);

select.addEventListener('change', debounce(onSearchBreed, 1000));

function onSearchBreed(evt) {
  catInfoContainer.style.visibility = 'hidden';
  Loading.standard('Loading data, please wait...', {
    clickToClose: true,
    svgSize: '19px',
  });

  const breedId = evt.target.value;
 
  fetchCatByBreed(breedId)
    .then(data => {
      catInfoContainer.style.visibility = 'visible';
      catInfoContainer.innerHTML = renderCatMarkup(data);
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
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-top',
  });
}
