const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const config = require('../config/db')

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    //add user
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({ success: false, msg: 'Failed to register user'})
        } else {
            res.json({ success: true, msg: 'User registered succesfully!'}) //username registered succesfully?
        }
    })
})

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            res.send({ success: false, msg: 'User not found.' })
        }

        User.comparePassword(password, user.password, (err, isMatch) => { //todo
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 3600 // 1 hour. 1 week = 604800
                }); //get token
                res.send({
                    success: true, 
                    msg: 'Login successful',
                    token: 'JWT ' +token, //todo
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                res.send({ success: false, msg: 'Password did not match.'})
            }
        })
    });

})

// Profile - protected with auth token
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
})

module.exports = router