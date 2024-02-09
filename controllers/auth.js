const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const Joi = require('joi')

module.exports = {
    async postLogin(req, res){
        const {error} = validateAuth(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({username: req.body.username})
        if (!user) return req.status(400).send('Invalid email or password')

        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        if (!user) return req.status(400).send('Invalid email or password')

        const token = user.generateAuthToken()
        res.header("x-auth-token", token)
        res.status(200).send(token)

    },

}

function validateAuth(auth) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(55).required(),
        password: Joi.string().min(5).max(1024)
    });
    return schema.validate(auth);
}