import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../styles/App.css'
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
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
                <Routes>
                    <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />} />
                    <Route path="/" element={<Home user={user} />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
