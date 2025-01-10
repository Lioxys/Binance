import React, { useState, useEffect } from 'react';
import '../styles/Wallet.css'; 

function Wallet() {
    const [wallet, setWallet] = useState({
        currencies: {
            'BTC': { amount: 0.5, currentPrice: 30000 },
            'ETH': { amount: 2, currentPrice: 2000 }
        },
        transactions: [],
        iban: '',
        totalValue: 0,
        transactionAmount: '',  // Gérer le montant de la transaction
        users: [
            { id: 1, name: 'Utilisateur 1', iban: 'FR123456789' },
            { id: 2, name: 'Utilisateur 2', iban: 'FR987654321' }
        ],
        selectedUser: null,
        selectedCrypto: 'BTC',
        transferAmount: ''  // Montant à transférer
    });

    useEffect(() => {
        fetchPrices().then(prices => {
            updatePrices(prices);
        });
    }, []);

    const fetchPrices = async () => {
        return { 'BTC': 31000, 'ETH': 2100 };
    };

    const updatePrices = (prices) => {
        setWallet(prevWallet => {
            const updatedCurrencies = { ...prevWallet.currencies };
            let newTotalValue = 0;
            Object.entries(updatedCurrencies).forEach(([key, value]) => {
                if (prices[key]) {
                    updatedCurrencies[key].currentPrice = prices[key];
                    newTotalValue += value.amount * prices[key];
                }
            });
            return {
                ...prevWallet,
                currencies: updatedCurrencies,
                totalValue: newTotalValue
            };
        });
    };

    const handleTransaction = (type, amount, iban) => {
        if (!amount || amount <= 0) return;  // Vérification de la validité du montant
        const transaction = {
            type, 
            amount: parseFloat(amount), 
            iban, 
            date: new Date().toLocaleDateString('fr-FR')
        };
        setWallet(prevWallet => ({
            ...prevWallet,
            transactions: [...prevWallet.transactions, transaction],
            totalValue: type === 'dépot' ? prevWallet.totalValue + parseFloat(amount) : prevWallet.totalValue - parseFloat(amount),
            transactionAmount: ''  // Réinitialiser le montant après la transaction
        }));
    };

    const handleTransfer = () => {
        const { selectedUser, selectedCrypto, transferAmount } = wallet;

        // Validation : vérifier si l'utilisateur possède assez de tokens
        if (!selectedUser) {
            alert('Destinataire non trouvé');
            return;
        }

        const cryptoAmount = wallet.currencies[selectedCrypto].amount;
        if (parseFloat(transferAmount) > cryptoAmount) {
            alert('Montant insuffisant de tokens');
            return;
        }

        // Si toutes les validations passent, procéder au virement
        const transaction = {
            type: 'virement',
            amount: parseFloat(transferAmount),
            iban: selectedUser.iban,
            date: new Date().toLocaleDateString('fr-FR'),
            to: selectedUser.name
        };

        setWallet(prevWallet => {
            const updatedCurrencies = { ...prevWallet.currencies };
            updatedCurrencies[selectedCrypto].amount -= parseFloat(transferAmount);  // Déduire les tokens envoyés

            // Recalculer la valeur totale du portefeuille après le virement
            let newTotalValue = 0;
            Object.entries(updatedCurrencies).forEach(([key, value]) => {
                newTotalValue += value.amount * value.currentPrice;
            });

            return {
                ...prevWallet,
                currencies: updatedCurrencies,
                transactions: [...prevWallet.transactions, transaction],
                totalValue: newTotalValue,  // Mise à jour de la valeur totale
                transferAmount: ''  // Réinitialiser le montant après virement
            };
        });
    };

    return (
        <div className="wallet-container">
            <h2 className="wallet-header">Mon Portefeuille</h2>
            <div className="wallet-section">
                <h3>Transactions</h3>
                <div className="transaction-inputs">
                    <input type="text" value={wallet.iban} onChange={e => setWallet({ ...wallet, iban: e.target.value })} placeholder="Entrer l'IBAN" />
                    <input type="number" value={wallet.transactionAmount} onChange={e => setWallet({ ...wallet, transactionAmount: e.target.value })} placeholder="Entrer le montant" />
                    <button className="transaction-button" onClick={() => handleTransaction('dépot', wallet.transactionAmount, wallet.iban)}>Déposer</button>
                    <button className="transaction-button" onClick={() => handleTransaction('retrait', wallet.transactionAmount, wallet.iban)}>Retirer</button>
                </div>
                {wallet.transactions.map((tx, index) => (
                    <p key={index}>{tx.type} de {tx.amount}€ le {tx.date} via IBAN {tx.iban}</p>
                ))}
            </div>

            <div className="wallet-section">
                <h3>Crypto-Monnaies</h3>
                <ul className="crypto-list">
                    {Object.entries(wallet.currencies).map(([key, value]) => (
                        <li className="crypto-item" key={key}>
                            <span className="crypto-details">{key}: {value.amount} unités @ {value.currentPrice}€ chacune</span>
                            <span className="total-value">(Total: {(value.amount * value.currentPrice).toFixed(2)}€)</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="wallet-section">
                <h3>Virement Interne</h3>
                <div className="transaction-inputs">
                    <select 
                        value={wallet.selectedUser?.id || ''} 
                        onChange={e => {
                            const selectedUser = wallet.users.find(user => user.id === parseInt(e.target.value));
                            setWallet({ ...wallet, selectedUser });
                        }}
                    >
                        <option value="">Sélectionner un destinataire</option>
                        {wallet.users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <select 
                        value={wallet.selectedCrypto} 
                        onChange={e => setWallet({ ...wallet, selectedCrypto: e.target.value })}
                    >
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                    </select>
                    <input 
                        type="number" 
                        value={wallet.transferAmount} 
                        onChange={e => setWallet({ ...wallet, transferAmount: e.target.value })}
                        placeholder="Montant à transférer"
                    />
                    <button className="transaction-button" onClick={handleTransfer}>Envoyer</button>
                </div>
            </div>

            <p className="total-value">Valeur totale du Portefeuille: {wallet.totalValue?.toFixed(2)}€</p>
        </div>
    );
}

export default Wallet;