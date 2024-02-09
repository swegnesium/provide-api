const bcrypt = require('bcrypt');
const _ = require('lodash');

const { User, validateUser } = require('../models/user');

module.exports = {
	async postUser(req, res) {
		//Validate user data with JOI
		let error = validateUser(req.body)
		if (error.error) return res.status(400).send("validation joi" + error.error)
		//Check email is not registered
		let user = await User.findOne({ username: req.body.username })
		if (user) return res.status(400).send('User already registered')

		user = new User(
			_.pick(req.body, ["username", "password"])
		)
		//Hash & Salt password
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)

		//Validate user data with JOI
		let newUser = new User({ // Creating a new user object with all the necessary fields
            username: user.username,
			password: user.password,
			isAdmin: user.isAdmin
		})
		await newUser.save()

		const token = newUser.generateAuthToken()
		res.header("x-auth-token", token)
		let userData = _.pick(newUser, ["username", "password", "isAdmin"])
		userData.token = token
		res.status(200).send(userData)
	},
	async getUserTokenId(req, res){
		const user = await User.findById(req.user_id).select("-password")
		res.send(user)
	}
}