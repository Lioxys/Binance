import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/App.css'
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import LoginForm from './Login';
import CryptoDetail from './cryptoDetails/cryptoDetail';
import Wallet from './Wallet';
import Formulaire from './Formulaire';
import ListePost from './ListePost';

function App() {
    const [user, setUser] = useState(null);
    const [posts, setPost] = useState([]);

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
              <Route path="/" element={<Home />} />
              
              <Route path="/crypto/:symbol" element={<CryptoDetail />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/formulaire" element={<Formulaire posts={posts} setPost={setPost} />} />
              <Route path="/discussions" element={<ListePost posts={posts} setPost={setPost}/>} />
              {!user && (
                <Route path="/login" element={<LoginForm setUser={setUser} />} />
              )}
            </Routes>
          </div>
          <Footer />
        </Router>
      );
      
}

export default App;