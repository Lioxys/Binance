import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    {user && <li><Link to="/wallet">Portefeuille</Link></li>}
                    {user ? (
                        <li>
                            <button onClick={onLogout}>Déconnexion</button>
                        </li>
                    ) : (
                        <li><Link to="/login">Connexion</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
