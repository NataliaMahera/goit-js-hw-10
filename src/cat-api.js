const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_JE40ZWz5TtBLr6X14F0x62Pn0qcsiG8Yd6dKhBir3RMHNQulDfrQKZVDqj58eqQk';

export function fetchBreeds() {
  fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(resp => console.log(resp));
}

export function fetchCatByBreed(breedId) {
  fetch(`${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(resp => console.log(resp));
}
