import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCryptoById, fetchCryptoHistory } from '../services/api'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Orders from './Orders';
import Formulaire from './Formulaire';
import ListePost from './ListePost';

const symbolToId = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    usdt: 'tether',
    xrp: 'ripple',
    sol: 'solana',
    doge: 'dogecoin',
    ada: 'cardano',
    avax: 'avalanche-2',
  };

function CryptoDetail() {
  const { symbol } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [posts, setPost] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    const cryptoId = symbolToId[symbol.toLowerCase()];
    if (!cryptoId) {
      console.error(`Aucun ID trouvé pour symbol = ${symbol}`);
      setError(`Cryptomonnaie non trouvée: ${symbol}`);
      setLoading(false);
      return;
    } 

    fetchCryptoById(cryptoId).then((data) => {
      setCryptoData(data);
      console.log(data);
    });
  
    fetchCryptoHistory(cryptoId, 30).then((history) => {
        setHistoryData(history);
        console.log(history);
        setLoading(false);
    })
    .catch(err => {
        console.error(err);
        setError('Erreur lors de la récupération de l\'historique des prix.');
        setLoading(false);
    });
    
  }, [symbol]);

  if (loading) {
    return <div>Chargement de {symbol}...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cryptoData) {
    return <div>Aucune donnée disponible pour {symbol}.</div>;
  }

  return (
    <>
      <div style={styles.info}>
        <p></p>
        <div style={styles.header}>
        <img 
          src={cryptoData.image.small} 
          alt={`${cryptoData.name} logo`} 
          style={styles.image} 
        />
        <h1 style={styles.title}>{cryptoData.name} - {cryptoData.symbol.toUpperCase()}</h1>
        </div>
        <p>Prix actuel : ${cryptoData.market_data.current_price.usd.toLocaleString()} USD</p>
        <p>Volume 24h : ${cryptoData.market_data.total_volume.usd.toLocaleString()} USD</p>
        <p>
          Variation des dernières 24 heures : {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}% / 
          des dernières 7 jours : {cryptoData.market_data.price_change_percentage_7d.toFixed(2)}%
        </p>
        <p>{cryptoData.description.en}</p>
      </div>
    <div style={{ width: ' 80%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
    </div>
    <Orders 
        currentPrice={cryptoData.market_data.current_price.usd} 
        cryptoName={cryptoData.name} 
        symbol={cryptoData.symbol.toUpperCase()} 
    />
    <Formulaire 
        posts={posts} 
        setPost={setPost} 
        postToEdit={postToEdit} 
        setPostToEdit={setPostToEdit} 
      />
    <ListePost posts={posts} setPost={setPost}/>
    </>
  );
}

const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      justifyContent: 'center',
    },
    image: {
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
    title: {
      fontSize: '2em',
      margin: 0,
    },
    info: {
      marginBottom: '20px',
    },
  };

export default CryptoDetail;
