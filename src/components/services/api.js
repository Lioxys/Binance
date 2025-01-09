const BASE_URL = 'https://api.coinlore.net/api';

export async function fetchCryptoById(coinId) {
  const response = await fetch(`${BASE_URL}/ticker/?id=${coinId}`);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! status: ${response.status}`);
  }
  const data = await response.json();
  return data[0];
}
