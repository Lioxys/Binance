import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/App.css'
import Header from './Header';  // Importation depuis le même dossier
import Footer from './Footer';
import Home from './Home';  // Importation de Home.js
import LoginForm from './Login';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <Router>
            <Header user={user} onLogout={handleLogout} />
            <div>
                {user ? (
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/login" element={<LoginForm setUser={setUser} />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                )}
            </div>
            <Footer />
        </Router>
    );
}

export default App;
