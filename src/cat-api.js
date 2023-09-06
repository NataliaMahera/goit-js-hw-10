import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_JE40ZWz5TtBLr6X14F0x62Pn0qcsiG8Yd6dKhBir3RMHNQulDfrQKZVDqj58eqQk';

const url = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(url + '/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(url + '/images/search?breed_ids=' + breedId)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}

// const url = 'https://api.thecatapi.com/v1';
// const api_key =
//   'live_JE40ZWz5TtBLr6X14F0x62Pn0qcsiG8Yd6dKhBir3RMHNQulDfrQKZVDqj58eqQk';

// export function fetchBreeds() {
//   return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return fetch(
//     `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }

fetchCatByBreed('crex')
  .then(data => console.log(data))
  .catch(err => console.log(err));
