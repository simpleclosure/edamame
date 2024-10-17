const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    // TODO: Implement login logic
    // For now, we'll assume any username/password is accepted
    req.session.authenticated = true;
    res.redirect('/protected');
});

// Protected page
app.get('/protected', (req, res) => {
    // TODO: Protect this route so only authenticated users can access it
    res.sendFile(path.join(__dirname, 'public', 'protected.html'));
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
