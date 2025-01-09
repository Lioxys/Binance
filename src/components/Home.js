// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Accueil de la Plateforme de Trading Crypto</h1>
      <p>Bienvenue sur votre plateforme de trading crypto similaire à Binance. Ici, vous pouvez trader des cryptos, voir des statistiques en temps réel, et participer à des discussions communautaires.</p>

      {/* Exemple de section pour les crypto-monnaies populaires */}
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
        </ul>
      </section>

      {/* Exemple de section pour le trading rapide */}
      <section>
        <h2>Trading Rapide</h2>
        <p>Placez des ordres de marché rapidement pour vos crypto-monnaies préférées.</p>
        {/* Placeholder pour le composant de trading rapide */}
        <Link to="/trade">Accéder au Trading</Link>
      </section>

      {/* Section pour les discussions communautaires */}
      <section>
        <h2>Discussions Communautaires</h2>
        <p>Participez à des discussions sur vos crypto-monnaies préférées et partagez votre opinion.</p>
        {/* Placeholder pour le lien vers les discussions */}
        <Link to="/discussions">Voir Discussions</Link>
      </section>
    </div>
  );
}

export default Home;
