const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000' // Allow only this origin
}));

// Initialize Sequelize to use SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Define the Account model
const Account = sequelize.define('Account', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
});

// Sync the database
sequelize.sync();

// Routes
app.post('/accounts', async (req, res) => {
    try {
        const account = await Account.create(req.body);
        res.status(201).send(account);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/accounts', async (req, res) => {
    const accounts = await Account.findAll();
    res.send(accounts);
});

app.get('/accounts/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).send('Account not found');
    res.send(account);
});

app.put('/accounts/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).send('Account not found');
    try {
        await account.update(req.body);
        res.send(account);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/accounts/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).send('Account not found');
    await account.destroy();
    res.send(account);
});

app.post('/accounts/:id/deposit', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).send('Account not found');
    const amount = req.body.amount;
    if (amount <= 0) return res.status(400).send('Invalid deposit amount');
    account.balance += amount;
    await account.save();
    res.send(account);
});

app.post('/accounts/:id/withdraw', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (!account) return res.status(404).send('Account not found');
    const amount = req.body.amount;
    if (amount <= 0) return res.status(400).send('Invalid withdraw amount');
    if (account.balance < amount) return res.status(400).send('Insufficient funds');
    account.balance -= amount;
    await account.save();
    res.send(account);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
