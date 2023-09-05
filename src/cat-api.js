export const BASE_URL = 'https://api.thecatapi.com/v1';
export const BREEDS_ENDPOINT = '/breeds';
export const API_KEY =
  'live_JE40ZWz5TtBLr6X14F0x62Pn0qcsiG8Yd6dKhBir3RMHNQulDfrQKZVDqj58eqQk';

export function fetchBreeds() {
  fetch(`${BASE_URL}${BREEDS_ENDPOINT}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
