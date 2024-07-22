import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountForm = ({ selectedAccount, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if (selectedAccount) {
            setName(selectedAccount.name);
            setEmail(selectedAccount.email);
            setBalance(selectedAccount.balance);
        } else {
            setName('');
            setEmail('');
            setBalance('');
        }
    }, [selectedAccount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const account = { name, email, balance: parseFloat(balance) };
        if (selectedAccount) {
            axios.put(`http://localhost:3001/accounts/${selectedAccount.id}`, account)
                .then(response => {
                    onSave(response.data);
                })
                .catch(error => {
                    console.error('There was an error updating the account!', error);
                });
        } else {
            axios.post('http://localhost:3001/accounts', account)
                .then(response => {
                    onSave(response.data);
                })
                .catch(error => {
                    console.error('There was an error creating the account!', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Balance:</label>
                <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} required />
            </div>
            <div>
                <button type="submit">{selectedAccount ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default AccountForm;

