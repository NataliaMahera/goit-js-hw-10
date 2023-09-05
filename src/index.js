import { fetchBreeds, fetchCatByBreed } from './cat-api';
import debounce from 'lodash.debounce';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.style.visibility = 'hidden';
error.style.visibility = 'hidden';

new SlimSelect({
  select: 'select',
});

let arrBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: select,
      data: arrBreedsId,
    });
  })
  .catch(onFetchError);

select.addEventListener('input', debounce(onSearchBreed, 1000));

function onSearchBreed(evt) {
  const breedId = evt.target.value;

  fetchCatByBreed(breedId).then(showProfile).catch(onFetchError);
}

function showProfile({ image, name, description, temperament }) {
  catInfoContainer.innerHTML = `<div class="box-img"><img src="${image}" alt="${name}" width="400"/></div><div class="box"><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;
}

function onFetchError(error) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
