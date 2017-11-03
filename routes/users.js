const express = require('express')
const router = express.Router()


// Register
router.get('/register', (req, res, next) => {
    res.send('REGISTER PAGE');
})

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATION PAGE')
})

// Profile - protected with auth token
router.get('/profile', (req, res, next) => {
    res.send('PROFILE PAGE')
})

// Validate
router.get('/validate', (req, res, next) => {
    res.send('VALIDATION PAGE')
})

module.exports = router