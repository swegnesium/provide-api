const express = require('express')
const router = express.Router()

//  (only 1 item from Products array showing)

// Import Controller
const providersController = require('../controllers/provider')

// Any Endpoint with Auth, requires a TOKEN to hit.
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// Initial Provider endpoint
//  GET all Providers
router.get('/', providersController.getAllProviders);

// GET Provider by ID
router.get('/:id', providersController.getProviderById)

// POST to Endpoint
router.post('/', auth, providersController.postProvider)

// PUT Endpoint
router.put('/:id', providersController.putProviderById)

// DELETE Endpoint
router.delete('/:id', auth, providersController.deleteProviderById);


module.exports = router