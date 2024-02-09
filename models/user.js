const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config= require('config')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 55,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        username: this.username,
        password: this.password,
        isAdmin: this.isAdmin
    }, config.get("providersPrivateKey"));
    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(55).required(),
        password: Joi.string().min(5).max(1024),
        isAdmin: Joi.boolean().required()
    })
    return schema.validate(user);
}



module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;