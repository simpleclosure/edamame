const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    res.redirect('/protected');
});

app.get('/protected', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'protected.html'));
});

app.get('/logout', (req, res) => {});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
