import React, { useState, useEffect } from 'react';
import '../../styles/Orders.css';

function Orders({ currentPrice, cryptoName, symbol }) {
  const [limitOrderPrice, setLimitOrderPrice] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('limitOrders')) || [];
    setOrders(savedOrders);
  }, []);

  const saveOrders = (updatedOrders) => {
    localStorage.setItem('limitOrders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const executedOrders = orders.filter(order => {
        if (order.type === 'buy' && currentPrice <= order.price) {
          alert(`Ordre d'achat exécuté pour ${cryptoName} à ${order.price} USD`);
          return false;
        }
        if (order.type === 'sell' && currentPrice >= order.price) {
          alert(`Ordre de vente exécuté pour ${cryptoName} à ${order.price} USD`);
          return false;
        }
        return true;
      });

      if (executedOrders.length !== orders.length) {
        saveOrders(executedOrders);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPrice, orders, cryptoName]);

  const handleMarketOrder = (type) => {
    alert(`Ordre de ${type === 'buy' ? 'achat' : 'vente'} exécuté à ${currentPrice} USD`);
  };

  const handleLimitOrder = (type) => {
    const price = parseFloat(limitOrderPrice);
    if (isNaN(price) || price <= 0) {
      alert('Veuillez entrer un prix valide.');
      return;
    }

    const newOrder = { type, price };
    const updatedOrders = [...orders, newOrder];
    saveOrders(updatedOrders);

    alert(`Ordre de ${type === 'buy' ? 'achat' : 'vente'} à ${price} USD ajouté.`);
    setLimitOrderPrice('');
  };

  return (
    <div className="container">
      <h2>Ordres de Trading :</h2>

      <div className="section">
        <h3>Ordres de Marché :</h3>
        <div className="buttons">
          <button className="button" onClick={() => handleMarketOrder('buy')}>
            Ordre Marché - Achat
          </button>
          <button className="button" onClick={() => handleMarketOrder('sell')}>
            Ordre Marché - Vente
          </button>
        </div>
      </div>

      <div className="section">
        <h3>Ordres Limités :</h3>
        <div className="input-group">
          <input 
            type="number" 
            placeholder="Prix cible en USD" 
            value={limitOrderPrice} 
            onChange={(e) => setLimitOrderPrice(e.target.value)} 
            className="input"
          />
          <div className="buttons">
            <button className="button" onClick={() => handleLimitOrder('buy')}>
              Ajouter Ordre Achat Limité
            </button>
            <button className="button" onClick={() => handleLimitOrder('sell')}>
              Ajouter Ordre Vente Limité
            </button>
          </div>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="section">
          <h3>Ordres Limités en Attente :</h3>
          <ul className="order-list">
            {orders.map((order, index) => (
              <li 
                key={index} 
                className={`order-item ${order.type === 'buy' ? 'buy' : 'sell'}`}
              >
                {order.type === 'buy' ? 'Achat' : 'Vente'} à {order.price} USD
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Orders;
