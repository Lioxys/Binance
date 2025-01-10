const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoById(coinId) {
    const response = await fetch(`${COINGECKO_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

export async function fetchCryptoHistory(coinId, days = 30) {
    const response = await fetch(`${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! status: ${response.status}`);
    }
    const data = await response.json();
    return data.prices.map(item => ({
      date: new Date(item[0]).toLocaleDateString(),
      price: item[1],
    }));
  }