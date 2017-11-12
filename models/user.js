const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dbconfig = require('../config/db')

//schema
const UserSchema = mongoose.Schema({
    name : {
        type: String
    },
    email : {
        type: String,
        require: true
    },
    username : {
        type: String,
        require: true   
    },
    password : {
        type: String,
        require: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema)

//get user by id
module.exports.getUserByID = function(id, callback){
    User.findById(id, callback);
}

//getuser by name
module.exports.getUserByUsername = function(username, callback){
    let query = { username: username }
    User.findOne(query, callback)
} 

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(enteredPassword, hash, callback){
    bcrypt.compare(enteredPassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}
