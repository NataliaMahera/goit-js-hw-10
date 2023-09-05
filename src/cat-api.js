// const BASE_URL = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_JE40ZWz5TtBLr6X14F0x62Pn0qcsiG8Yd6dKhBir3RMHNQulDfrQKZVDqj58eqQk';

// export function fetchBreeds() {
//   return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
//   // .then(data => console.log(data));
// }

// export function fetchCatByBreed(breedId) {
//   return fetch(
//     `${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${breedId}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }
const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_JE40ZWz5TtBLr6X14F0x62Pn0qcsiG8Yd6dKhBir3RMHNQulDfrQKZVDqj58eqQk';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => console.log(data));
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
