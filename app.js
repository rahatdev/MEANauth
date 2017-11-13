const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const dbconfig = require('./config/db')

// db connection
mongoose.connect(dbconfig.database)

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' +dbconfig.database)
})
mongoose.connection.on('error', (err) => {
    console.log("Database connection error: " +err)
})


const app = express(); 

const users = require('./routes/users')

// Port number
const port = 3000;

app.use(cors()); // allows access from public endpoints

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.json()) // Parses req body for post (of get) requests, i.e in users.js

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Users routes
app.use('/users', users)

// Index route
app.get('/', (req, res) => {
    console.log("initial get");
    res.send('Invalid Endpoint.')
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));  
})

// Start server
app.listen(port, () => {
    console.log('Listening on port ' +port);
});
 

