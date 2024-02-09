const {Product, validateProduct} = require('../models/product')


module.exports = {
    // POST to Products
    async postProduct(req, res) {
        const { error } = validateProduct(req.body)
        if (error) return res.status(400).send(error.details)
        try {
            // The data that can be updated
            let product = new Product({
                productName: req.body.productName,
                developer: req.body.developer,
                verification: req.body.verification,
                features: req.body.features,
                detectionHistory: req.body.detectionHistory,
                isDetected: req.body.isDetected,
                isUpdating: req.body.isUpdating,
                isUpdated: req.body.isUpdated,
            })
            product = await product.save()
            res.send(product);
        } catch (error) {
            console.log(error)
        }
    },

    // GET all Products
    async getAllProducts (req, res) {
        const products = await Product.find().sort('productName')
        res.send(products)
    },

    // GET Product by ID
    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id)
            if(!product) return res.status(404).send("The Product with the given ID was not found.")
            res.send(product);
        } catch (error) {
            console.log(error)
        }
    },

    // PUT Product by ID
    async putProductById(req, res){
        const { error } = validateProduct(req.body)
        if (error) return res.status(400).send(error.details)

        try {
            let product = await Product.findByIdAndUpdate(req.params.id,   {productName: req.body.productName},
                 {features: req.body.features}, 
                 {detectionHistory: req.body.detectionHistory},
                 {isDetected: req.body.isDetected}, 
                 {isUpdated: req.body.isUpdated}, 
                 {isUpdating: req.body.isUpdating},
                 {new: true})
                 if(!product) return res.status(404).send("The Product with the given ID was not found.")
                 res.send(product)
        } catch (error) {
            console.log(error)
        }
    },

    // DELETE Product by ID
    async deleteProductById(req, res){
        try {
            const product = await Product.findByIdAndRemove(req.params.id)
            if (!product) res.status(404).send('The Provider with the given ID was not found')
            res.send(product);
        } catch (error) {
            console.log(error)
        }
    }

}