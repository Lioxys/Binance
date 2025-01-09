import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCryptoById } from '../services/api'; 

const symbolToId = {
  bitcoin: 90,
  ethereum: 80,
  usdt: 518,
  xrp: 58,
  sol: 48543,
  doge: 2,
  ada: 257,
  avax: 44883 
};



function CryptoDetail() {
  const { symbol } = useParams();
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const cryptoId = symbolToId[symbol];  
    if (!cryptoId) {
      console.error(`Aucun ID trouvé pour symbol = ${symbol}`);
      return;
    }
    fetchCryptoById(cryptoId).then((data) => {
      setCryptoData(data);
      console.log(data);
    });
  }, [symbol]);

  if (!cryptoData) {
    return <div>Chargement de {symbol}...</div>;
  }

  return (
    <>
    <div>
      <p></p>
      <h1>{cryptoData.name} - {cryptoData.symbol}</h1>
      <p>Prix : {cryptoData.price_usd} USD </p>
      <p>Volume 24h : {cryptoData.volume_24h_usd} USD</p>
      <p>Variation des dernières 24 heures : {cryptoData.percent_change_24h} % / des dernières 7 jours : {cryptoData.percent_change_7d} %</p>
    </div>
    </>
  );
}

export default CryptoDetail;
