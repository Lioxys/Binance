import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

function LoginForm({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('user', JSON.stringify({ username, password }));
        setUser({ username, password });  // Met à jour l'état de l'utilisateur dans App
        navigate('/');  // Rediriger vers la page d'accueil
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Identifiant:</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Mot de passe:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Connexion</button>
        </form>
    );
}

export default LoginForm;
