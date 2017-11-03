const express = require('express')
const router = express.Router()


// Register
router.get('/register', (req, res, next) => {
    res.send('REGISTER PAGE');
})

// Authenticate
router.get('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATION PAGE')
})

module.exports = router