import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='container'>
      <h1>Plateforme de Trading Crypto</h1>
      <p>Bienvenue sur votre plateforme de trading crypto. Ici, vous pouvez trader des cryptos, voir des statistiques en temps réel, et participer à des discussions communautaires.</p>

      <section className='section'>
        <h2>Crypto-Monnaies Populaires</h2>
        <div className="crypto-list">
          <div className="crypto-item"><span>Bitcoin (BTC) -</span> <Link to="/crypto/bitcoin" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Ethereum (ETH) -</span> <Link to="/crypto/ethereum" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Dogecoin (DOGE) -</span> <Link to="/crypto/doge" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Tether (USDT) -</span> <Link to="/crypto/usdt" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Ripple (XRP) -</span> <Link to="/crypto/xrp" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Solana (SOL) -</span> <Link to="/crypto/sol" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Cardano (ADA) -</span> <Link to="/crypto/ada" className="button">Voir Détails</Link></div>
          <div className="crypto-item"><span>Avalanche (AVAX) -</span> <Link to="/crypto/avax" className="button">Voir Détails</Link></div>
        </div>
      </section>

      <section className='section'>
        <h2>Trading Rapide</h2>
        <p>Placez des ordres de marché rapidement pour vos crypto-monnaies préférées.</p>
        <Link to="/trade" className="button">Accéder au Trading</Link>
      </section>

      <section className='section'>
        <h2>Discussions Communautaires</h2>
        <p>Participez à des discussions sur vos crypto-monnaies préférées et partagez votre opinion.</p>
        <Link to="/discussions" className="button">Voir Discussions</Link>
      </section>
    </div>
  );
}

export default Home;
