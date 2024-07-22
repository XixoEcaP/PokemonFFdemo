import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import AccountForm from './AccountForm';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transactionAction, setTransactionAction] = useState('');
    const [isFormVisible, setFormVisible] = useState(false);
    const [isTransactionFormVisible, setTransactionFormVisible] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = () => {
        axios.get('http://localhost:3001/accounts')
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accounts!', error);
            });
    };

    const handleSave = (account) => {
        if (selectedAccount) {
            setAccounts(accounts.map(acc => acc.id === account.id ? account : acc));
        } else {
            setAccounts([...accounts, account]);
        }
        setFormVisible(false);
        setTransactionFormVisible(false);
        setSelectedAccount(null);
    };

    const handleTransaction = (account, action) => {
        setSelectedAccount(account);
        setTransactionAction(action);
        setTransactionFormVisible(true);
        setFormVisible(false);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/accounts/${id}`)
            .then(() => {
                setAccounts(accounts.filter(acc => acc.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the account!', error);
            });
    };

    const handleCancel = () => {
        setFormVisible(false);
        setTransactionFormVisible(false);
        setSelectedAccount(null);
    };

    return (
        <div>
            <h1>Accounts</h1>
            {isFormVisible && (
                <AccountForm
                    selectedAccount={selectedAccount}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            {isTransactionFormVisible && (
                <TransactionForm
                    account={selectedAccount}
                    action={transactionAction}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            <ul>
                {accounts.map(account => (
                    <li key={account.id}>
                        <div>
                            {account.name} - {account.email} - ${account.balance}
                        </div>
                        <div>
                            <button onClick={() => handleTransaction(account, 'deposit')}>Deposit</button>
                            <button onClick={() => handleTransaction(account, 'withdraw')}>Withdraw</button>
                            <button onClick={() => handleDelete(account.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="create-button-container">
                <button onClick={() => setFormVisible(true)}>Create Account</button>
            </div>
        </div>
    );
};

export default Accounts;




