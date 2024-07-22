import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ account, action, onSave, onCancel }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:3001/accounts/${account.id}/${action}`;
        axios.post(url, { amount: parseFloat(amount) })
            .then(response => {
                onSave(response.data);
            })
            .catch(error => {
                console.error(`There was an error with the ${action} transaction!`, error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <button type="submit">{action.charAt(0).toUpperCase() + action.slice(1)}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default TransactionForm;
