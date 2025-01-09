import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Accueil de la Plateforme de Trading Crypto</h1>
      <p>Bienvenue sur votre plateforme de trading crypto similaire à Binance. Ici, vous pouvez trader des cryptos, voir des statistiques en temps réel, et participer à des discussions communautaires.</p>


      <section>
        <h2>Crypto-Monnaies Populaires</h2>
        <ul>
          <li>
          Bitcoin (BTC)
          <Link to="/crypto/bitcoin">Voir Détails</Link>
          </li>
          <li>
          Ethereum (ETH)
          <Link to="/crypto/ethereum">Voir Détails</Link>
          </li>
          <li>
            Dogecoin (DOGE)
            <Link to="/crypto/doge">Voir Détails</Link>
          </li>
          <li>
            Tether (USDT)
            <Link to="/crypto/usdt">Voir Détails</Link>
          </li>
          <li>
            Ripple (XRP) 
            <Link to="/crypto/xrp">Voir Détails</Link>
          </li>
          <li>
            Solana (SOL)
            <Link to="/crypto/sol">Voir Détails</Link>
          </li>
          <li>
            Cardano (ADA)
            <Link to="/crypto/ada">Voir Détails</Link>
          </li>
          <li>
            Avalanche (AVAX)
            <Link to="/crypto/avax">Voir Détails</Link>
          </li>
        </ul>
      </section>

      <section>
        <h2>Trading Rapide</h2>
        <p>Placez des ordres de marché rapidement pour vos crypto-monnaies préférées.</p>
        <Link to="/trade">Accéder au Trading</Link>
      </section>

      <section>
        <h2>Discussions Communautaires</h2>
        <p>Participez à des discussions sur vos crypto-monnaies préférées et partagez votre opinion.</p>
        <Link to="/discussions">Voir Discussions</Link>
      </section>
    </div>
  );
}

export default Home;
