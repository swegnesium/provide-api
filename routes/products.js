const express = require('express');
const router = express.Router();

//  (only 1 item from Features array showing)

const productsController = require('../controllers/products');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// POST to Products - working
router.post('/', [auth], productsController.postProduct);

// GET all Products - working
router.get('/', productsController.getAllProducts);

// GET Product by ID - working
router.get('/:id', productsController.getProductById);

// PUT Product by ID - working
router.put('/:id', [auth], productsController.putProductById);

// DELETE Product by ID - working
router.delete('/:id', [auth], productsController.deleteProductById);

module.exports = router;