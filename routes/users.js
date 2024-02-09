const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.post('/', usersController.postUser);
router.get('/me', auth, usersController.getUserTokenId);

module.exports = router;